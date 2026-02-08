import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, X, Star, Download, Crown, Filter,
  ArrowLeft, FileSearch 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/appStore';
import { formatNumber, formatFileSize } from '@/lib/utils';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [isSearching, setIsSearching] = useState(false);
  
  const { searchApps, apps } = useAppStore();
  
  const [results, setResults] = useState(apps);

  useEffect(() => {
    if (query) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const searchResults = searchApps(query);
        setResults(searchResults);
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setResults(apps.filter(app => app.isActive));
    }
  }, [query, apps, searchApps]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  const recentSearches = ['launcher', 'music player', 'game', 'editor'];
  const popularCategories = [
    { name: 'Games', count: 2500 },
    { name: 'Tools', count: 1800 },
    { name: 'Productivity', count: 1200 },
    { name: 'Entertainment', count: 1500 },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Search Apps</h1>
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for apps, developers, or tags..."
              className="w-full pl-12 pr-12 py-6 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </form>
        </div>

        {!query ? (
          /* Default Search Page */
          <div className="max-w-4xl mx-auto">
            {/* Recent Searches */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase mb-3">
                Recent Searches
              </h2>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      setSearchParams({ q: term });
                    }}
                    className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Categories */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase mb-3">
                Popular Categories
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {popularCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={`/categories/${cat.name.toLowerCase()}`}
                    className="p-4 border rounded-lg hover:border-primary transition-colors"
                  >
                    <p className="font-medium">{cat.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {cat.count.toLocaleString()} apps
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Browse All */}
            <div className="text-center">
              <Button variant="outline" asChild>
                <Link to="/apps">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Browse All Apps
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          /* Search Results */
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  Search Results for "{query}"
                </h2>
                <p className="text-muted-foreground">
                  {results.length} app{results.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            {isSearching ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileSearch className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any apps matching "{query}"
                </p>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Try:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Checking your spelling</li>
                    <li>• Using more general keywords</li>
                    <li>• Trying a different category</li>
                  </ul>
                  <Button variant="outline" onClick={clearSearch} className="mt-4">
                    Clear Search
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((app) => (
                  <Link 
                    key={app.id} 
                    to={`/apps/${app.id}`}
                    className="group"
                  >
                    <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <img 
                            src={app.icon} 
                            alt={app.name}
                            className="w-20 h-20 rounded-xl object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                                {app.name}
                              </h3>
                              {app.type === 'premium' && (
                                <Crown className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{app.developer}</p>
                            <Badge variant="secondary" className="mt-2 text-xs">
                              {app.category}
                            </Badge>
                            <div className="flex items-center justify-between mt-3 text-sm">
                              <span className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                {app.rating}
                              </span>
                              <span className="text-muted-foreground">
                                {formatFileSize(app.apkSize)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                              <Download className="w-3 h-3" />
                              {formatNumber(app.downloads)}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
