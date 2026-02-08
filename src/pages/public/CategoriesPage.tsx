import { Link } from 'react-router-dom';
import { 
  Gamepad2, Wrench, Zap, MessageCircle, Film, 
  BookOpen, Wallet, Heart, Sparkles, ArrowRight,
  Crown, TrendingUp, Star 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/appStore';
import { formatNumber } from '@/lib/utils';
import type { AppCategory } from '@/types';

const categories: { 
  id: AppCategory; 
  name: string; 
  description: string; 
  icon: React.ElementType;
  color: string;
}[] = [
  { 
    id: 'games', 
    name: 'Games', 
    description: 'Action, adventure, puzzle, and more',
    icon: Gamepad2,
    color: 'bg-purple-500'
  },
  { 
    id: 'tools', 
    name: 'Tools', 
    description: 'Utilities, system tools, and productivity',
    icon: Wrench,
    color: 'bg-blue-500'
  },
  { 
    id: 'productivity', 
    name: 'Productivity', 
    description: 'Office, notes, and task management',
    icon: Zap,
    color: 'bg-green-500'
  },
  { 
    id: 'social', 
    name: 'Social', 
    description: 'Communication and social media',
    icon: MessageCircle,
    color: 'bg-pink-500'
  },
  { 
    id: 'entertainment', 
    name: 'Entertainment', 
    description: 'Music, video, and streaming',
    icon: Film,
    color: 'bg-red-500'
  },
  { 
    id: 'education', 
    name: 'Education', 
    description: 'Learning and educational tools',
    icon: BookOpen,
    color: 'bg-yellow-500'
  },
  { 
    id: 'finance', 
    name: 'Finance', 
    description: 'Banking, investment, and budgeting',
    icon: Wallet,
    color: 'bg-emerald-500'
  },
  { 
    id: 'health', 
    name: 'Health', 
    description: 'Fitness, wellness, and medical',
    icon: Heart,
    color: 'bg-cyan-500'
  },
  { 
    id: 'lifestyle', 
    name: 'Lifestyle', 
    description: 'Fashion, food, and daily life',
    icon: Sparkles,
    color: 'bg-orange-500'
  },
];

export default function CategoriesPage() {
  const { apps, popularApps } = useAppStore();

  const getCategoryStats = (categoryId: AppCategory) => {
    const categoryApps = apps.filter(app => app.category === categoryId && app.isActive);
    return {
      count: categoryApps.length,
      downloads: categoryApps.reduce((sum, app) => sum + app.downloads, 0),
      topApp: categoryApps.sort((a, b) => b.downloads - a.downloads)[0]
    };
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Browse by Category</h1>
          <p className="text-lg text-muted-foreground">
            Explore our extensive collection of Android apps organized by category.
            Find exactly what you need.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((category) => {
            const stats = getCategoryStats(category.id);
            return (
              <Link 
                key={category.id} 
                to={`/categories/${category.id}`}
                className="group"
              >
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center`}>
                        <category.icon className="w-7 h-7 text-white" />
                      </div>
                      <Badge variant="secondary">
                        {stats.count} apps
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {formatNumber(stats.downloads)} downloads
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Premium Category */}
        <div className="mb-16">
          <Link to="/premium" className="group block">
            <Card className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/30">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-20 h-20 bg-yellow-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Crown className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-yellow-500 transition-colors">
                      Premium Apps
                    </h2>
                    <p className="text-muted-foreground">
                      Access exclusive premium and pro versions of popular apps. 
                      Unlock the full potential with AxeLux Premium membership.
                    </p>
                  </div>
                  <Button className="bg-yellow-500 hover:bg-yellow-600">
                    Explore Premium
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Top Apps by Category */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Popular Apps</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularApps.slice(0, 8).map((app) => (
              <Link 
                key={app.id} 
                to={`/apps/${app.id}`}
                className="group"
              >
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={app.icon} 
                        alt={app.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                          {app.name}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">{app.developer}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {app.category}
                          </Badge>
                          <span className="flex items-center gap-1 text-xs">
                            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                            {app.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Trending */}
        <div className="mt-16">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Trending Now</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {apps
              .filter(app => app.isActive)
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 4)
              .map((app) => (
                <Link 
                  key={app.id} 
                  to={`/apps/${app.id}`}
                  className="group"
                >
                  <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                    <CardContent className="p-4">
                      <div className="relative mb-4">
                        <img 
                          src={app.screenshots[0] || app.icon} 
                          alt={app.name}
                          className="w-full aspect-video rounded-lg object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-red-500">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        </div>
                      </div>
                      <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                        {app.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{app.developer}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
