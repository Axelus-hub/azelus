import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown, Download, Heart, Settings, 
  Calendar, LogOut, Edit, CheckCircle, Clock,
  Shield, AlertTriangle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { formatDate, formatFileSize } from '@/lib/utils';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const { downloads } = useAppStore();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Not logged in</h2>
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  const userDownloads = downloads.filter(d => d.userId === user.id);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {user.isPremium && (
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-bold mt-4">{user.username}</h2>
                <p className="text-muted-foreground text-sm">{user.email}</p>
                
                {user.isPremium ? (
                  <Badge className="mt-3 bg-yellow-500">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium Member
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="mt-3">
                    Free Member
                  </Badge>
                )}

                <div className="mt-6 space-y-2">
                  <Button variant="outline" className="w-full" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full text-red-500 hover:text-red-600" 
                    size="sm"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-4">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Downloads
                  </span>
                  <span className="font-medium">{user.downloadCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Favorites
                  </span>
                  <span className="font-medium">{user.favorites.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Joined
                  </span>
                  <span className="font-medium">{formatDate(user.createdAt)}</span>
                </div>
                {user.isPremium && user.premiumExpiry && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      Expires
                    </span>
                    <span className="font-medium">{formatDate(user.premiumExpiry)}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="downloads">Downloads</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                {/* Account Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Account Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${user.isBanned ? 'bg-red-500' : 'bg-green-500'}`} />
                      <div>
                        <p className="font-medium">{user.isBanned ? 'Account Suspended' : 'Account Active'}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.isBanned 
                            ? 'Your account has been suspended. Contact support for assistance.' 
                            : 'Your account is in good standing.'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Membership */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Crown className="w-5 h-5" />
                      Membership
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {user.isPremium ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            Premium Active
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Valid until {formatDate(user.premiumExpiry!)}
                          </p>
                        </div>
                        <Button variant="outline" asChild>
                          <Link to="/premium">Extend</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Free Plan</p>
                          <p className="text-sm text-muted-foreground">
                            Upgrade to premium for exclusive access
                          </p>
                        </div>
                        <Button asChild>
                          <Link to="/premium">Upgrade</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userDownloads.length === 0 ? (
                      <p className="text-muted-foreground text-center py-4">
                        No recent activity
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {userDownloads.slice(0, 5).map((download) => (
                          <div 
                            key={download.id} 
                            className="flex items-center justify-between p-3 bg-muted rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <Download className="w-5 h-5 text-primary" />
                              <div>
                                <p className="font-medium">{download.app.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  v{download.version} • {formatFileSize(download.fileSize)}
                                </p>
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {formatDate(download.downloadDate)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="downloads" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Download History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userDownloads.length === 0 ? (
                      <div className="text-center py-8">
                        <Download className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No downloads yet</p>
                        <Button className="mt-4" asChild>
                          <Link to="/apps">Browse Apps</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {userDownloads.map((download) => (
                          <div 
                            key={download.id} 
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <img 
                                src={download.app.icon} 
                                alt={download.app.name}
                                className="w-12 h-12 rounded-lg"
                              />
                              <div>
                                <p className="font-medium">{download.app.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  v{download.version} • {formatFileSize(download.fileSize)}
                                </p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                  <Clock className="w-3 h-3" />
                                  {formatDate(download.downloadDate)}
                                </p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/apps/${download.appId}`}>
                                View App
                              </Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="favorites" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Favorites</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {user.favorites.length === 0 ? (
                      <div className="text-center py-8">
                        <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No favorites yet</p>
                        <Button className="mt-4" asChild>
                          <Link to="/apps">Browse Apps</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {user.favorites.map((appId) => {
                          const app = downloads.find(d => d.appId === appId)?.app;
                          if (!app) return null;
                          return (
                            <Link 
                              key={appId} 
                              to={`/apps/${appId}`}
                              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted transition-colors"
                            >
                              <img 
                                src={app.icon} 
                                alt={app.name}
                                className="w-14 h-14 rounded-lg"
                              />
                              <div className="flex-1">
                                <p className="font-medium">{app.name}</p>
                                <p className="text-sm text-muted-foreground">{app.developer}</p>
                              </div>
                              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Account Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Manage your email notification preferences
                      </p>
                      <div className="space-y-2">
                        {['New app releases', 'Download completions', 'Security alerts', 'Newsletter'].map((item) => (
                          <div key={item} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <span>{item}</span>
                            <Button variant="outline" size="sm">Enabled</Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2 text-red-500">Danger Zone</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Irreversible account actions
                      </p>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
