import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertArticleSchema, type Category, type DateFilter, categories, dateFilters } from "@shared/schema";
import { z } from "zod";

// NewsAPI configuration
const NEWS_API_KEY = process.env.NEWS_API_KEY || process.env.NEWSAPI_KEY || "";
const NEWS_API_BASE_URL = "https://newsapi.org/v2";

// Cache for NewsAPI responses (30 minutes)
const CACHE_DURATION = 30 * 60 * 1000;
let lastFetch = 0;

interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
  }[];
}

// Category mapping for NewsAPI
const categoryMapping: Record<Category, string> = {
  technology: "technology",
  politics: "general",
  sports: "sports",
  business: "business",
  health: "health",
  science: "science"
};

async function fetchNewsFromAPI(): Promise<void> {
  if (!NEWS_API_KEY) {
    console.warn("NEWS_API_KEY not provided, using empty article list");
    return;
  }

  const now = Date.now();
  if (now - lastFetch < CACHE_DURATION) {
    return; // Use cached data
  }

  try {
    await storage.clearArticles();
    
    // Fetch articles for each category
    for (const category of categories) {
      const apiCategory = categoryMapping[category];
      const url = `${NEWS_API_BASE_URL}/top-headlines?category=${apiCategory}&country=us&pageSize=20&apiKey=${NEWS_API_KEY}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`NewsAPI error: ${response.status} ${response.statusText}`);
      }

      const data: NewsAPIResponse = await response.json();
      
      if (data.status === "ok" && data.articles) {
        const articles = data.articles
          .filter(article => article.title && article.url && article.publishedAt)
          .map(article => ({
            title: article.title,
            description: article.description || "",
            content: article.content || "",
            url: article.url,
            urlToImage: article.urlToImage || "",
            publishedAt: new Date(article.publishedAt),
            source: article.source,
            category,
            author: article.author || ""
          }));

        await storage.createMultipleArticles(articles);
      }

      // Add delay between requests to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    lastFetch = now;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}

async function addSampleData(): Promise<void> {
  const sampleArticles = [
    {
      title: "Revolutionary AI Breakthrough Transforms Healthcare Diagnostics",
      description: "Scientists develop new machine learning algorithm that can detect diseases with 99% accuracy from simple blood tests.",
      content: "A team of researchers has created an AI system that revolutionizes medical diagnostics...",
      url: "https://example.com/ai-healthcare",
      urlToImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      source: { id: "tech-news", name: "TechNews" },
      category: "technology" as Category,
      author: "Dr. Sarah Johnson"
    },
    {
      title: "Global Climate Summit Reaches Historic Agreement on Carbon Reduction",
      description: "World leaders unite to commit to ambitious carbon reduction targets by 2030.",
      content: "In a landmark decision, representatives from 195 countries have agreed...",
      url: "https://example.com/climate-summit",
      urlToImage: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      source: { id: "global-news", name: "Global News" },
      category: "politics" as Category,
      author: "Michael Chen"
    },
    {
      title: "Championship Finals Break Viewership Records Worldwide",
      description: "The most-watched sporting event in history draws over 3 billion viewers globally.",
      content: "Last night's championship final shattered all previous viewing records...",
      url: "https://example.com/championship-finals",
      urlToImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      source: { id: "sports-central", name: "Sports Central" },
      category: "sports" as Category,
      author: "Alex Rodriguez"
    },
    {
      title: "Stock Markets Rally as Tech Giants Report Record Earnings",
      description: "Major technology companies exceed expectations, driving markets to new highs.",
      content: "Wall Street experienced its best day in months as several tech giants...",
      url: "https://example.com/stock-rally",
      urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      source: { id: "financial-times", name: "Financial Times" },
      category: "business" as Category,
      author: "Jennifer Wang"
    },
    {
      title: "New Study Reveals Breakthrough in Cancer Treatment",
      description: "Researchers discover promising immunotherapy approach with 85% success rate in trials.",
      content: "A groundbreaking study published today shows remarkable results...",
      url: "https://example.com/cancer-breakthrough",
      urlToImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      source: { id: "health-journal", name: "Health Journal" },
      category: "health" as Category,
      author: "Dr. Emily Parker"
    },
    {
      title: "Space Mission Discovers Water on Mars in Underground Reservoirs",
      description: "NASA's latest rover finds evidence of liquid water beneath the Martian surface.",
      content: "In a discovery that could change our understanding of Mars...",
      url: "https://example.com/mars-water",
      urlToImage: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      source: { id: "space-news", name: "Space News" },
      category: "science" as Category,
      author: "Dr. James Mitchell"
    },
    {
      title: "Quantum Computing Achieves Major Milestone in Error Correction",
      description: "Scientists solve decades-old problem that brings quantum computers closer to practical use.",
      content: "Researchers at leading universities have made a breakthrough...",
      url: "https://example.com/quantum-computing",
      urlToImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
      source: { id: "tech-review", name: "Tech Review" },
      category: "technology" as Category,
      author: "Dr. Lisa Chen"
    },
    {
      title: "International Trade Agreement Reshapes Global Economy",
      description: "New multilateral trade pact promises to boost economic growth across participating nations.",
      content: "After months of negotiations, world leaders have signed...",
      url: "https://example.com/trade-agreement",
      urlToImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
      source: { id: "world-economics", name: "World Economics" },
      category: "business" as Category,
      author: "Robert Thompson"
    }
  ];

  await storage.createMultipleArticles(sampleArticles);
  console.log(`Added ${sampleArticles.length} sample articles`);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Fetch initial news data
  try {
    await fetchNewsFromAPI();
  } catch (error) {
    console.error("Failed to fetch initial news data:", error);
    // Add sample data for demonstration
    await addSampleData();
  }

  // Get all articles
  app.get("/api/articles", async (req, res) => {
    try {
      const articles = await storage.getArticles();
      res.json(articles);
    } catch (error) {
      console.error("Error getting articles:", error);
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  // Get filtered articles
  app.get("/api/articles/filter", async (req, res) => {
    try {
      const { category, date } = req.query;
      
      let validCategory: Category | undefined;
      let validDateFilter: DateFilter | undefined;

      if (category && category !== "all" && categories.includes(category as Category)) {
        validCategory = category as Category;
      }

      if (date && dateFilters.includes(date as DateFilter)) {
        validDateFilter = date as DateFilter;
      }

      const articles = await storage.getFilteredArticles(validCategory, validDateFilter);
      res.json(articles);
    } catch (error) {
      console.error("Error filtering articles:", error);
      res.status(500).json({ message: "Failed to filter articles" });
    }
  });

  // Refresh articles from NewsAPI
  app.post("/api/articles/refresh", async (req, res) => {
    try {
      await fetchNewsFromAPI();
      const articles = await storage.getArticles();
      res.json({ message: "Articles refreshed successfully", count: articles.length });
    } catch (error) {
      console.error("Error refreshing articles:", error);
      res.status(500).json({ message: "Failed to refresh articles" });
    }
  });

  // Get categories
  app.get("/api/categories", (req, res) => {
    res.json(categories);
  });

  const httpServer = createServer(app);
  return httpServer;
}
