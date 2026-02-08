import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Users, Crown, MessageSquare, 
  Server, Settings, FileText, Sparkles, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { name: 'Apps', icon: Package, path: '/admin/apps' },
  { name: 'Users', icon: Users, path: '/admin/users' },
  { name: 'Premium', icon: Crown, path: '/admin/premium' },
  { name: 'Testimonials', icon: MessageSquare, path: '/admin/testimonials' },
  { name: 'Server', icon: Server, path: '/admin/server' },
  { name: 'Settings', icon: Settings, path: '/admin/settings' },
  { name: 'Logs', icon: FileText, path: '/admin/logs' },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-card border-r flex flex-col transition-all duration-300 z-50",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg">AxeLux Admin</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          size="sm"
          className="w-full flex items-center justify-center"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 mr-2" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </Button>
      </div>

      {/* Back to Site */}
      <div className="p-4 border-t">
        <Link 
          to="/"
          className={cn(
            "flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors",
            collapsed && "justify-center"
          )}
        >
          {!collapsed && <span>← Back to Site</span>}
          {collapsed && <span>←</span>}
        </Link>
      </div>
    </aside>
  );
}
