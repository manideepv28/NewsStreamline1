export interface ArticleSource {
  id: string | null;
  name: string;
}

export interface Article {
  id: number;
  title: string;
  description: string | null;
  content: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: ArticleSource;
  category: string;
  author: string | null;
}

export type Category = "technology" | "politics" | "sports" | "business" | "health" | "science";
export type DateFilter = "all" | "today" | "week" | "month";

export const categories: { value: Category; label: string; color: string }[] = [
  { value: "technology", label: "Technology", color: "bg-emerald-500" },
  { value: "politics", label: "Politics", color: "bg-amber-500" },
  { value: "sports", label: "Sports", color: "bg-red-500" },
  { value: "business", label: "Business", color: "bg-violet-500" },
  { value: "health", label: "Health", color: "bg-cyan-500" },
  { value: "science", label: "Science", color: "bg-lime-500" }
];

export const dateFilters: { value: DateFilter; label: string }[] = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" }
];

export function getTimeAgo(dateString: string): string {
  const now = new Date();
  const publishedDate = new Date(dateString);
  const diffInMinutes = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }

  return publishedDate.toLocaleDateString();
}

export function getCategoryColor(category: string): string {
  const categoryData = categories.find(c => c.value === category);
  return categoryData?.color || "bg-slate-500";
}

export function getCategoryLabel(category: string): string {
  const categoryData = categories.find(c => c.value === category);
  return categoryData?.label || category;
}
