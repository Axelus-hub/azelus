import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Users, Crown, MessageSquare, 
  TrendingUp, Download, AlertTriangle, CheckCircle,
  Clock, ArrowUpRight 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAdminStore } from '@/store/adminStore';
import { useAppStore } from '@/store/appStore';
import { formatNumber, formatDate } from '@/lib/utils';

export default function AdminDashboard() {
  const { 
    users, 
    apps, 
    testimonials, 
    premiumRequests, 
    activityLogs,
    refreshServerStats,
    serverStats 
  } = useAdminStore();
  
  const { downloads } = useAppStore();

  useEffect(() => {
    refreshServerStats();
  }, [refreshServerStats]);

  // Stats
  const stats = {
    totalUsers: users.length,
    totalApps: apps.length,
    premiumUsers: users.filter(u => u.isPremium).length,
    pendingRequests: premiumRequests.filter(r => r.status === 'pending').length,
    pendingTestimonials: testimonials.filter(t => !t.isApproved).length,
    totalDownloads: downloads.length,
    verifiedApps: apps.filter(a => a.isVerified).length,
    unverifiedApps: apps.filter(a => !a.isVerified && a.isActive).length,
  };

  // Recent activity
  const recentActivity = activityLogs.slice(0, 5);
  const recentUsers = users.slice(0, 5);
  const pendingApps = apps.filter(a => !a.isVerified && a.isActive).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Admin</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/admin/server">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Server Status
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="w-3 h-3" />
                {stats.premiumUsers}
              </span>
              <span className="text-muted-foreground">premium</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Apps</p>
                <p className="text-2xl font-bold">{stats.totalApps}</p>
              </div>
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-green-500" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <span className="text-green-500 flex items-center">
                <CheckCircle className="w-3 h-3" />
                {stats.verifiedApps}
              </span>
              <span className="text-muted-foreground">verified</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Downloads</p>
                <p className="text-2xl font-bold">{formatNumber(stats.totalDownloads)}</p>
              </div>
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-purple-500" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <span className="text-green-500 flex items-center">
                <TrendingUp className="w-3 h-3" />
                +12%
              </span>
              <span className="text-muted-foreground">this week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{stats.pendingRequests + stats.pendingTestimonials}</p>
              </div>
              <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <span className="text-yellow-500">{stats.pendingRequests}</span>
              <span className="text-muted-foreground">premium requests</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/logs">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No recent activity</p>
              ) : (
                recentActivity.map((log) => (
                  <div key={log.id} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      log.severity === 'critical' ? 'bg-red-500' :
                      log.severity === 'warning' ? 'bg-yellow-500' :
                      log.severity === 'error' ? 'bg-orange-500' :
                      'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{log.action}</p>
                      <p className="text-sm text-muted-foreground">{log.details}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(log.timestamp)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin/apps">
                <Package className="w-4 h-4 mr-2" />
                Manage Apps
                {stats.unverifiedApps > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {stats.unverifiedApps}
                  </Badge>
                )}
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin/users">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin/premium">
                <Crown className="w-4 h-4 mr-2" />
                Premium Requests
                {stats.pendingRequests > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {stats.pendingRequests}
                  </Badge>
                )}
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin/testimonials">
                <MessageSquare className="w-4 h-4 mr-2" />
                Testimonials
                {stats.pendingTestimonials > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {stats.pendingTestimonials}
                  </Badge>
                )}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* New Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>New Users</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/users">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-4">
                  <img 
                    src={user.avatar} 
                    alt={user.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{user.username}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </p>
                    {user.isPremium && (
                      <Badge variant="secondary" className="text-xs mt-1">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Apps */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pending Verification</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/apps">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApps.length === 0 ? (
                <div className="text-center py-4">
                  <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
                  <p className="text-muted-foreground">All apps verified!</p>
                </div>
              ) : (
                pendingApps.map((app) => (
                  <div key={app.id} className="flex items-center gap-4">
                    <img 
                      src={app.icon} 
                      alt={app.name}
                      className="w-10 h-10 rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{app.name}</p>
                      <p className="text-xs text-muted-foreground">{app.developer}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500">
                        <AlertTriangle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Server Stats */}
      {serverStats && (
        <Card>
          <CardHeader>
            <CardTitle>Server Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">CPU Usage</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${serverStats.cpu.usage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{serverStats.cpu.usage.toFixed(1)}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Memory Usage</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${serverStats.memory.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{serverStats.memory.percentage.toFixed(1)}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Disk Usage</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-500 rounded-full"
                      style={{ width: `${serverStats.disk.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{serverStats.disk.percentage.toFixed(1)}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Connections</p>
                <p className="text-lg font-medium">{serverStats.activeConnections}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
