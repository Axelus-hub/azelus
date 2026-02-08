import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, Download, Share2, Heart, Github, Calendar, 
  Smartphone, HardDrive, Shield, ChevronDown, ChevronUp,
  Clock, ArrowLeft, Crown, AlertTriangle, CheckCircle,
  MessageSquare, ThumbsUp 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useAppStore } from '@/store/appStore';
import { useAuthStore } from '@/store/authStore';
import { formatNumber, formatFileSize, formatDate } from '@/lib/utils';

export default function AppDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [showFullChangelog, setShowFullChangelog] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const { apps, setCurrentApp, currentApp, reviews } = useAppStore();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const app = apps.find(a => a.id === id);
    if (app) {
      setCurrentApp(app);
      setSelectedVersion(app.versions[0]?.id || null);
    }
  }, [id, apps, setCurrentApp]);

  if (!currentApp) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">App not found</h2>
          <Button asChild>
            <Link to="/apps">Browse Apps</Link>
          </Button>
        </div>
      </div>
    );
  }

  const appReviews = reviews.filter(r => r.appId === id);
  currentApp.versions.find(v => v.id === selectedVersion);

  const handleDownload = async () => {
    if (currentApp.type === 'premium' && !user?.isPremium) {
      toast.error('Premium membership required for this app');
      return;
    }

    setIsDownloading(true);
    
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Download started!');
    setIsDownloading(false);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleAddToFavorites = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add favorites');
      return;
    }
    toast.success('Added to favorites!');
  };

  const isPremiumLocked = currentApp.type === 'premium' && !user?.isPremium;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button variant="ghost" className="mb-4" asChild>
          <Link to="/apps">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Apps
          </Link>
        </Button>

        {/* App Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - App Info */}
          <div className="lg:col-span-2">
            <div className="flex gap-6">
              <img 
                src={currentApp.icon} 
                alt={currentApp.name}
                className="w-32 h-32 rounded-2xl object-cover shadow-lg"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{currentApp.name}</h1>
                    <p className="text-muted-foreground">{currentApp.developer}</p>
                  </div>
                  {currentApp.type === 'premium' && (
                    <Badge className="bg-yellow-500">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <span className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold">{currentApp.rating}</span>
                    <span className="text-muted-foreground">({formatNumber(currentApp.reviewCount)})</span>
                  </span>
                  <span className="text-muted-foreground">|</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Download className="w-4 h-4" />
                    {formatNumber(currentApp.downloads)}
                  </span>
                  <span className="text-muted-foreground">|</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <HardDrive className="w-4 h-4" />
                    {formatFileSize(currentApp.apkSize)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary">{currentApp.category}</Badge>
                  {currentApp.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Button 
                size="lg" 
                className="flex-1 max-w-xs"
                onClick={handleDownload}
                disabled={isDownloading || isPremiumLocked}
              >
                {isDownloading ? (
                  <>
                    <Clock className="w-5 h-5 mr-2 animate-spin" />
                    Downloading...
                  </>
                ) : isPremiumLocked ? (
                  <>
                    <Crown className="w-5 h-5 mr-2" />
                    Premium Required
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    Download v{currentApp.currentVersion}
                  </>
                )}
              </Button>
              
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="w-5 h-5" />
              </Button>
              
              <Button variant="outline" size="icon" onClick={handleAddToFavorites}>
                <Heart className="w-5 h-5" />
              </Button>
              
              {currentApp.githubRepo && (
                <Button variant="outline" asChild>
                  <a 
                    href={`https://github.com/${currentApp.githubOwner}/${currentApp.githubRepo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    View on GitHub
                  </a>
                </Button>
              )}
            </div>

            {isPremiumLocked && (
              <Card className="mt-4 bg-yellow-500/10 border-yellow-500/30">
                <CardContent className="p-4 flex items-center gap-3">
                  <Crown className="w-6 h-6 text-yellow-500" />
                  <div>
                    <p className="font-medium">Premium App</p>
                    <p className="text-sm text-muted-foreground">
                      Upgrade to premium to download this app.{' '}
                      <Link to="/premium" className="text-primary hover:underline">
                        Learn more
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Quick Stats */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Updated
                  </span>
                  <span className="font-medium">{formatDate(currentApp.lastUpdate)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    Android
                  </span>
                  <span className="font-medium">{currentApp.minAndroidVersion}+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Security
                  </span>
                  <span className="flex items-center gap-1 text-green-500">
                    <CheckCircle className="w-4 h-4" />
                    Verified
                  </span>
                </div>
                {currentApp.virusScanResult && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Virus Scan</span>
                    <span className="flex items-center gap-1 text-green-500">
                      <CheckCircle className="w-4 h-4" />
                      Clean
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Version Selector */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Select Version</h3>
                <div className="space-y-2">
                  {currentApp.versions.map((version) => (
                    <button
                      key={version.id}
                      onClick={() => setSelectedVersion(version.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                        selectedVersion === version.id 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="text-left">
                        <p className="font-medium">v{version.version}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(version.releaseDate)}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatFileSize(version.apkSize)}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="mt-8">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="changelog">Changelog</TabsTrigger>
            <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({appReviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">About this app</h3>
                <div className="prose dark:prose-invert max-w-none">
                  {currentApp.description.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="changelog" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">What's New</h3>
                <div className="space-y-4">
                  {currentApp.versions.slice(0, showFullChangelog ? undefined : 3).map((version) => (
                    <div key={version.id} className="border-l-2 border-primary pl-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">v{version.version}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(version.releaseDate)}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{version.changelog}</p>
                    </div>
                  ))}
                </div>
                {currentApp.versions.length > 3 && (
                  <Button
                    variant="ghost"
                    className="mt-4"
                    onClick={() => setShowFullChangelog(!showFullChangelog)}
                  >
                    {showFullChangelog ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-2" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-2" />
                        Show All Versions
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="screenshots" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Screenshots</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {currentApp.screenshots.map((screenshot, index) => (
                    <div 
                      key={index}
                      className="aspect-[9/16] rounded-lg overflow-hidden bg-muted"
                    >
                      <img 
                        src={screenshot} 
                        alt={`${currentApp.name} screenshot ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">User Reviews</h3>
                  {isAuthenticated && (
                    <Button>Write a Review</Button>
                  )}
                </div>

                {appReviews.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {appReviews.map((review) => (
                      <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
                        <div className="flex items-start gap-4">
                          <img 
                            src={review.user.avatar} 
                            alt={review.user.username}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{review.user.username}</span>
                              {review.isVerified && (
                                <Badge variant="secondary" className="text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating 
                                        ? 'fill-yellow-500 text-yellow-500' 
                                        : 'text-muted-foreground'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {formatDate(review.createdAt)}
                              </span>
                            </div>
                            {review.title && (
                              <h4 className="font-medium mb-1">{review.title}</h4>
                            )}
                            <p className="text-muted-foreground">{review.content}</p>
                            <div className="flex items-center gap-4 mt-3">
                              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                                <ThumbsUp className="w-4 h-4" />
                                Helpful ({review.helpfulCount})
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
