import { Button } from "@/components/ui/button";
import { Heart, Share2, ArrowRight } from "lucide-react";
import { type Article, getTimeAgo, getCategoryColor, getCategoryLabel } from "@/lib/newsApi";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        url: article.url
      });
    } else {
      navigator.clipboard.writeText(article.url);
    }
  };

  const handleReadMore = () => {
    window.open(article.url, '_blank', 'noopener,noreferrer');
  };

  if (featured) {
    return (
      <article className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
        <div className="md:flex">
          {article.urlToImage && (
            <div className="md:w-1/3">
              <img 
                src={article.urlToImage} 
                alt={article.title}
                className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
                }}
              />
            </div>
          )}
          <div className="md:w-2/3 p-6">
            <div className="flex items-center space-x-3 mb-3">
              <span className={cn("px-2 py-1 text-xs font-medium text-white rounded", getCategoryColor(article.category))}>
                {getCategoryLabel(article.category)}
              </span>
              <span className="text-sm text-slate-500">{getTimeAgo(article.publishedAt)}</span>
              <span className="text-sm text-slate-500">{article.source.name}</span>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
              {article.title}
            </h2>
            {article.description && (
              <p className="text-slate-600 mb-4 line-clamp-3">
                {article.description}
              </p>
            )}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleReadMore}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1 p-0"
              >
                <span>Read More</span>
                <ArrowRight className="h-3 w-3" />
              </Button>
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSave}
                  className={cn(
                    "p-2 transition-colors",
                    isSaved ? "text-red-500 hover:text-red-600" : "text-slate-400 hover:text-red-500"
                  )}
                >
                  <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="p-2 text-slate-400 hover:text-blue-500 transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {article.urlToImage && (
        <img 
          src={article.urlToImage} 
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
          }}
        />
      )}
      <div className="p-5">
        <div className="flex items-center space-x-3 mb-3">
          <span className={cn("px-2 py-1 text-xs font-medium text-white rounded", getCategoryColor(article.category))}>
            {getCategoryLabel(article.category)}
          </span>
          <span className="text-sm text-slate-500">{getTimeAgo(article.publishedAt)}</span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        {article.description && (
          <p className="text-slate-600 text-sm mb-4 line-clamp-3">
            {article.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleReadMore}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm p-0"
          >
            Read More
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className={cn(
                "p-2 transition-colors",
                isSaved ? "text-red-500 hover:text-red-600" : "text-slate-400 hover:text-red-500"
              )}
            >
              <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="p-2 text-slate-400 hover:text-blue-500 transition-colors"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
