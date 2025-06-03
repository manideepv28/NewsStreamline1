import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories, dateFilters, type Category, type DateFilter } from "@/lib/newsApi";
import { cn } from "@/lib/utils";

interface FilterControlsProps {
  selectedCategory: Category | "all";
  selectedDateFilter: DateFilter;
  onCategoryChange: (category: Category | "all") => void;
  onDateFilterChange: (dateFilter: DateFilter) => void;
}

export default function FilterControls({
  selectedCategory,
  selectedDateFilter,
  onCategoryChange,
  onDateFilterChange
}: FilterControlsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <h2 className="text-lg font-semibold text-slate-900">Filter Articles</h2>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange("all")}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-full transition-colors",
                selectedCategory === "all"
                  ? "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
              )}
            >
              All
            </Button>
            
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(category.value)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-full transition-colors",
                  selectedCategory === category.value
                    ? "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200"
                    : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                )}
              >
                <span className={cn("w-2 h-2 rounded-full inline-block mr-1.5", category.color)}></span>
                {category.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <label htmlFor="date-filter" className="text-sm font-medium text-slate-700">Date:</label>
          <Select value={selectedDateFilter} onValueChange={onDateFilterChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dateFilters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
