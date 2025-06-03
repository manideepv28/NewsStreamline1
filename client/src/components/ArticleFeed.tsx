import { useState, useMemo } from "react";
import { RefreshCw, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ArticleCard from "./ArticleCard";
import { type Article, type Category, type DateFilter } from "@/lib/newsApi";
import { mockArticles } from "@/data/mockArticles";

interface ArticleFeedProps {
  selectedCategory: Category | "all";
  selectedDateFilter: DateFilter;
}

export default function ArticleFeed({ selectedCategory, selectedDateFilter }: ArticleFeedProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const articles = useMemo(() => {
    let filteredArticles = mockArticles;

    // Filter by category
    if (selectedCategory !== "all") {
      filteredArticles = filteredArticles.filter(article => article.category === selectedCategory);
    }

    // Filter by date
    if (selectedDateFilter !== "all") {
      const now = new Date();
      let filterDate: Date;

      switch (selectedDateFilter) {
        case "today":
          filterDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case "week":
          filterDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "month":
          filterDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          break;
        default:
          filterDate = new Date(0);
      }

      filteredArticles = filteredArticles.filter(
        article => new Date(article.publishedAt) >= filterDate
      );
    }

    // Sort by published date (newest first)
    return filteredArticles.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [selectedCategory, selectedDateFilter]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  const getLastUpdated = () => {
    if (articles.length > 0) {
      const latest = new Date(Math.max(...articles.map((a: Article) => new Date(a.publishedAt).getTime())));
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - latest.getTime()) / (1000 * 60));
      
      if (diffInMinutes < 60) {
        return `Updated ${diffInMinutes} minutes ago`;
      }
      
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `Updated ${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
    return "No updates available";
  };

  return (
    <div className="space-y-6">
      {/* Article Stats */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-slate-900">
            {`${articles.length} Articles Found`}
          </h3>
          <span className="text-sm text-slate-500">{getLastUpdated()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 text-slate-600 hover:text-blue-600 transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleViewMode}
            className="p-2 text-slate-600 hover:text-blue-600 transition-colors"
            title="Change View"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Articles */}
      {articles.length > 0 && (
        <>
          {/* Featured Article */}
          {articles[0] && (
            <ArticleCard article={articles[0]} featured />
          )}

          {/* Regular Articles */}
          {articles.length > 1 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.slice(1).map((article: Article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {articles.length === 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
          <div className="text-4xl mb-4">📰</div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No Articles Found</h3>
          <p className="text-slate-600 mb-4">
            No articles match your current filters. Try adjusting your category or date filter.
          </p>
          <Button onClick={handleRefresh} variant="outline">
            Refresh Articles
          </Button>
        </div>
      )}
    </div>
  );
}