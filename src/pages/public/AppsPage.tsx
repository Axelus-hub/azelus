import { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { 
  Search, Grid3X3, List, Star, Download, Crown,
  SlidersHorizontal 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppStore } from '@/store/appStore';
import { formatNumber, formatFileSize, getCategoryIcon } from '@/lib/utils';
import type { AppCategory } from '@/types';

const categories: { value: AppCategory; label: string }[] = [
  { value: 'games', label: 'Games' },
  { value: 'tools', label: 'Tools' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'social', label: 'Social' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'education', label: 'Education' },
  { value: 'finance', label: 'Finance' },
  { value: 'health', label: 'Health' },
  { value: 'lifestyle', label: 'Lifestyle' },
];

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
  { value: 'name', label: 'Name (A-Z)' },
];

export default function AppsPage() {
  const { category } = useParams<{ category?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { 
    filterApps, 
    setFilters, 
    filters 
  } = useAppStore();

  useEffect(() => {
    const categoryParam = searchParams.get('category') as AppCategory | null;
    const searchParam = searchParams.get('search');
    const sortParam = searchParams.get('sort') as typeof filters.sortBy | null;
    const typeParam = searchParams.get('type') as 'free' | 'premium' | 'all' | null;

    setFilters({
      category: category as AppCategory || categoryParam || undefined,
      searchQuery: searchParam || undefined,
      sortBy: sortParam || 'popular',
      type: typeParam || 'all'
    });

    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [category, searchParams, setFilters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery) {
      newParams.set('search', searchQuery);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', value);
    setSearchParams(newParams);
  };

  const handleCategoryChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', value);
    }
    setSearchParams(newParams);
  };

  const handleTypeChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all') {
      newParams.delete('type');
    } else {
      newParams.set('type', value);
    }
    setSearchParams(newParams);
  };

  const filteredApps = filterApps();

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {category ? (
              <span className="flex items-center gap-2">
                <span className="text-2xl">{getCategoryIcon(category)}</span>
                {category.charAt(0).toUpperCase() + category.slice(1)} Apps
              </span>
            ) : (
              'All Apps'
            )}
          </h1>
          <p className="text-muted-foreground">
            {filteredApps.length} apps available
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search apps..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <Select 
              value={filters.category || 'all'} 
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={filters.type || 'all'} 
              onValueChange={handleTypeChange}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>

            <Select 
              value={filters.sortBy} 
              onValueChange={handleSortChange}
            >
              <SelectTrigger className="w-[150px]">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex items-center border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                className="rounded-none"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                className="rounded-none"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Apps Grid/List */}
        {filteredApps.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No apps found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredApps.map((app) => (
              viewMode === 'grid' ? (
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
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {app.category}
                            </Badge>
                          </div>
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
              ) : (
                <Link 
                  key={app.id} 
                  to={`/apps/${app.id}`}
                  className="group"
                >
                  <Card className="transition-all hover:shadow-lg hover:border-primary/50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={app.icon} 
                          alt={app.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                              {app.name}
                            </h3>
                            {app.type === 'premium' && (
                              <Crown className="w-4 h-4 text-yellow-500" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{app.developer}</p>
                          <p className="text-sm text-muted-foreground truncate mt-1">
                            {app.shortDescription}
                          </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-6 text-sm">
                          <div className="text-center">
                            <p className="font-medium flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                              {app.rating}
                            </p>
                            <p className="text-xs text-muted-foreground">Rating</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium">{formatFileSize(app.apkSize)}</p>
                            <p className="text-xs text-muted-foreground">Size</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium">{formatNumber(app.downloads)}</p>
                            <p className="text-xs text-muted-foreground">Downloads</p>
                          </div>
                        </div>
                        <Badge variant="secondary">{app.category}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
