import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { RefreshCw, Grid3X3, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { queryClient } from "@/lib/queryClient";
import ArticleCard from "./ArticleCard";
import { type Article, type Category, type DateFilter } from "@/lib/newsApi";

interface ArticleFeedProps {
  selectedCategory: Category | "all";
  selectedDateFilter: DateFilter;
}

export default function ArticleFeed({ selectedCategory, selectedDateFilter }: ArticleFeedProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: articles = [], isLoading, error, refetch } = useQuery<Article[]>({
    queryKey: ["/api/articles/filter", selectedCategory, selectedDateFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory !== "all") {
        params.append("category", selectedCategory);
      }
      if (selectedDateFilter !== "all") {
        params.append("date", selectedDateFilter);
      }
      
      const response = await fetch(`/api/articles/filter?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      return response.json();
    }
  });

  const refreshMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/articles/refresh", { method: "POST" });
      if (!response.ok) {
        throw new Error("Failed to refresh articles");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/articles/filter"] });
    }
  });

  const handleRefresh = () => {
    refreshMutation.mutate();
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  const getLastUpdated = () => {
    if (articles.length > 0) {
      const latest = new Date(Math.max(...articles.map(a => new Date(a.publishedAt).getTime())));
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

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Articles</h3>
        <p className="text-red-600 mb-4">There was a problem fetching the latest news. Please try again.</p>
        <Button 
          onClick={() => refetch()}
          className="bg-red-600 text-white hover:bg-red-700"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Article Stats */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-slate-900">
            {isLoading ? "Loading..." : `${articles.length} Articles Found`}
          </h3>
          <span className="text-sm text-slate-500">{getLastUpdated()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshMutation.isPending}
            className="p-2 text-slate-600 hover:text-blue-600 transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`h-4 w-4 ${refreshMutation.isPending ? "animate-spin" : ""}`} />
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

      {/* Loading State */}
      {isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <Skeleton className="w-full h-48" />
              <div className="p-5 space-y-3">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-16 h-4" />
                  <Skeleton className="w-20 h-4" />
                </div>
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-4/5 h-6" />
                <Skeleton className="w-full h-12" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Articles */}
      {!isLoading && articles.length > 0 && (
        <>
          {/* Featured Article */}
          {articles[0] && (
            <ArticleCard article={articles[0]} featured />
          )}

          {/* Regular Articles */}
          {articles.length > 1 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.slice(1).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!isLoading && articles.length === 0 && (
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
