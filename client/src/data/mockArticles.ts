import { type Article } from "@/lib/newsApi";

export const mockArticles: Article[] = [
  {
    id: 1,
    title: "Revolutionary AI Breakthrough Transforms Healthcare Diagnostics",
    description: "Scientists develop new machine learning algorithm that can detect diseases with 99% accuracy from simple blood tests.",
    content: "A team of researchers has created an AI system that revolutionizes medical diagnostics...",
    url: "https://example.com/ai-healthcare",
    urlToImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: { id: "tech-news", name: "TechNews" },
    category: "technology",
    author: "Dr. Sarah Johnson"
  },
  {
    id: 2,
    title: "Global Climate Summit Reaches Historic Agreement on Carbon Reduction",
    description: "World leaders unite to commit to ambitious carbon reduction targets by 2030.",
    content: "In a landmark decision, representatives from 195 countries have agreed...",
    url: "https://example.com/climate-summit",
    urlToImage: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: { id: "global-news", name: "Global News" },
    category: "politics",
    author: "Michael Chen"
  },
  {
    id: 3,
    title: "Championship Finals Break Viewership Records Worldwide",
    description: "The most-watched sporting event in history draws over 3 billion viewers globally.",
    content: "Last night's championship final shattered all previous viewing records...",
    url: "https://example.com/championship-finals",
    urlToImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: { id: "sports-central", name: "Sports Central" },
    category: "sports",
    author: "Alex Rodriguez"
  },
  {
    id: 4,
    title: "Stock Markets Rally as Tech Giants Report Record Earnings",
    description: "Major technology companies exceed expectations, driving markets to new highs.",
    content: "Wall Street experienced its best day in months as several tech giants...",
    url: "https://example.com/stock-rally",
    urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: { id: "financial-times", name: "Financial Times" },
    category: "business",
    author: "Jennifer Wang"
  },
  {
    id: 5,
    title: "New Study Reveals Breakthrough in Cancer Treatment",
    description: "Researchers discover promising immunotherapy approach with 85% success rate in trials.",
    content: "A groundbreaking study published today shows remarkable results...",
    url: "https://example.com/cancer-breakthrough",
    urlToImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: { id: "health-journal", name: "Health Journal" },
    category: "health",
    author: "Dr. Emily Parker"
  },
  {
    id: 6,
    title: "Space Mission Discovers Water on Mars in Underground Reservoirs",
    description: "NASA's latest rover finds evidence of liquid water beneath the Martian surface.",
    content: "In a discovery that could change our understanding of Mars...",
    url: "https://example.com/mars-water",
    urlToImage: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    source: { id: "space-news", name: "Space News" },
    category: "science",
    author: "Dr. James Mitchell"
  },
  {
    id: 7,
    title: "Quantum Computing Achieves Major Milestone in Error Correction",
    description: "Scientists solve decades-old problem that brings quantum computers closer to practical use.",
    content: "Researchers at leading universities have made a breakthrough...",
    url: "https://example.com/quantum-computing",
    urlToImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    source: { id: "tech-review", name: "Tech Review" },
    category: "technology",
    author: "Dr. Lisa Chen"
  },
  {
    id: 8,
    title: "International Trade Agreement Reshapes Global Economy",
    description: "New multilateral trade pact promises to boost economic growth across participating nations.",
    content: "After months of negotiations, world leaders have signed...",
    url: "https://example.com/trade-agreement",
    urlToImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: { id: "world-economics", name: "World Economics" },
    category: "business",
    author: "Robert Thompson"
  },
  {
    id: 9,
    title: "Renewable Energy Costs Drop to Historic Lows Worldwide",
    description: "Solar and wind power become cheaper than fossil fuels in most markets globally.",
    content: "A new report shows that renewable energy has reached unprecedented cost efficiency...",
    url: "https://example.com/renewable-energy",
    urlToImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    source: { id: "energy-today", name: "Energy Today" },
    category: "science",
    author: "Maria Santos"
  },
  {
    id: 10,
    title: "Mental Health Apps Show Promising Results in Clinical Trials",
    description: "Digital therapy platforms demonstrate effectiveness comparable to traditional counseling.",
    content: "Recent studies reveal that mental health applications can provide...",
    url: "https://example.com/mental-health-apps",
    urlToImage: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    source: { id: "health-tech", name: "Health Tech" },
    category: "health",
    author: "Dr. Kevin Liu"
  },
  {
    id: 11,
    title: "European Football Championship Generates Record Revenue",
    description: "Tournament exceeds all previous financial benchmarks with innovative broadcast deals.",
    content: "The latest championship tournament has set new standards...",
    url: "https://example.com/football-championship",
    urlToImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    source: { id: "sports-business", name: "Sports Business" },
    category: "sports",
    author: "David Miller"
  },
  {
    id: 12,
    title: "Cryptocurrency Regulation Framework Approved by Major Economies",
    description: "G20 nations agree on comprehensive guidelines for digital asset oversight.",
    content: "In a coordinated effort, major world economies have established...",
    url: "https://example.com/crypto-regulation",
    urlToImage: "https://images.unsplash.com/photo-1518544866330-4e6d17c81467?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    publishedAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
    source: { id: "finance-wire", name: "Finance Wire" },
    category: "business",
    author: "Sarah Kim"
  }
];