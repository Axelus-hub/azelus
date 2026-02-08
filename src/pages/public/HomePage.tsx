import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Download, Shield, Zap, Star, ArrowRight,
  TrendingUp, Clock, Crown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/appStore';
import { useAuthStore } from '@/store/authStore';
import { formatNumber, formatFileSize } from '@/lib/utils';
import { toast } from 'sonner';

export default function HomePage() {
  const { 
    featuredApps, 
    recentApps, 
    popularApps, 
    premiumApps,
    setCurrentApp 
  } = useAppStore();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    setCurrentApp(null);
  }, [setCurrentApp]);

  const handlePremiumClick = () => {
    if (!isAuthenticated) {
      toast.info('Please login to access premium apps');
      return;
    }
    if (!user?.isPremium) {
      toast.info('Upgrade to premium to access these apps');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Premium Android App Repository
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover & Download{' '}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Premium Android Apps
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              AxeLux is your trusted source for premium Android applications. 
              With GitHub integration, verified security scans, and instant updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/apps">
                  <Download className="w-5 h-5 mr-2" />
                  Browse Apps
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/premium">
                  <Crown className="w-5 h-5 mr-2" />
                  Go Premium
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div>
                <p className="text-3xl font-bold">10K+</p>
                <p className="text-sm text-muted-foreground">Apps</p>
              </div>
              <div>
                <p className="text-3xl font-bold">1M+</p>
                <p className="text-sm text-muted-foreground">Downloads</p>
              </div>
              <div>
                <p className="text-3xl font-bold">50K+</p>
                <p className="text-sm text-muted-foreground">Users</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose AxeLux?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide a secure and reliable platform for discovering and downloading Android applications.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Downloads</h3>
                <p className="text-muted-foreground">
                  Every app is scanned for malware and viruses before being made available for download.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">GitHub Integration</h3>
                <p className="text-muted-foreground">
                  Direct integration with GitHub repositories ensures you always get the latest versions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Collection</h3>
                <p className="text-muted-foreground">
                  Access exclusive premium apps and cracked versions with our premium membership.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Apps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Apps</h2>
              <p className="text-muted-foreground">Handpicked apps with highest ratings</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/apps">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredApps.slice(0, 6).map((app) => (
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
                        className="w-16 h-16 rounded-xl object-cover"
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
                        <div className="flex items-center gap-3 mt-2 text-sm">
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            {app.rating}
                          </span>
                          <span className="text-muted-foreground">
                            {formatNumber(app.downloads)} downloads
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
      </section>

      {/* Premium Apps Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-6 h-6 text-yellow-500" />
                <h2 className="text-3xl font-bold">Premium Apps</h2>
              </div>
              <p className="text-muted-foreground">Exclusive premium and pro versions</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/premium">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumApps.slice(0, 4).map((app) => (
              <Link 
                key={app.id} 
                to={`/apps/${app.id}`}
                onClick={handlePremiumClick}
                className="group"
              >
                <Card className="h-full transition-all hover:shadow-lg hover:border-yellow-500/50">
                  <CardContent className="p-4">
                    <div className="relative">
                      <img 
                        src={app.icon} 
                        alt={app.name}
                        className="w-full aspect-square rounded-xl object-cover mb-4"
                      />
                      <Badge className="absolute top-2 right-2 bg-yellow-500">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                    <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                      {app.name}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">{app.developer}</p>
                    <div className="flex items-center justify-between mt-2 text-sm">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        {app.rating}
                      </span>
                      <span className="text-muted-foreground">
                        {formatFileSize(app.apkSize)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular & Recent */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Popular Apps */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Most Popular</h2>
              </div>
              <div className="space-y-4">
                {popularApps.slice(0, 5).map((app, index) => (
                  <Link 
                    key={app.id} 
                    to={`/apps/${app.id}`}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <span className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-lg font-bold text-primary">
                      {index + 1}
                    </span>
                    <img 
                      src={app.icon} 
                      alt={app.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                        {app.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{app.developer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatNumber(app.downloads)}</p>
                      <p className="text-xs text-muted-foreground">downloads</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Apps */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Recently Updated</h2>
              </div>
              <div className="space-y-4">
                {recentApps.slice(0, 5).map((app) => (
                  <Link 
                    key={app.id} 
                    to={`/apps/${app.id}`}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <img 
                      src={app.icon} 
                      alt={app.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                        {app.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{app.developer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">v{app.currentVersion}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(app.lastUpdate).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust AxeLux for their Android app needs. 
              Sign up today and get access to our premium collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/register">Create Free Account</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10" asChild>
                    <Link to="/premium">Explore Premium</Link>
                  </Button>
                </>
              ) : (
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/apps">Browse All Apps</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
