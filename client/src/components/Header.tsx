import { Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Newspaper className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-slate-900">NewsFlow</h1>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <a href="#" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Home</a>
              <a href="#" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Trending</a>
              <a href="#" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Saved</a>
            </nav>
            <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Subscribe
            </Button>
          </div>
          
          <button className="md:hidden p-2 text-slate-600 hover:text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
