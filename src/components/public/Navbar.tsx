import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, Menu, X, User, Download, Crown, Moon, Sun, 
  LogOut, ChevronDown, Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/store/authStore';
import { useTheme } from '@/components/ThemeProvider';
import { toast } from 'sonner';

const categories = [
  { name: 'Games', path: '/categories/games', icon: '🎮' },
  { name: 'Tools', path: '/categories/tools', icon: '🛠️' },
  { name: 'Productivity', path: '/categories/productivity', icon: '⚡' },
  { name: 'Entertainment', path: '/categories/entertainment', icon: '🎬' },
  { name: 'Social', path: '/categories/social', icon: '💬' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              AxeLux
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link 
              to="/apps" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/apps' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              All Apps
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  Categories
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {categories.map((cat) => (
                  <DropdownMenuItem key={cat.path} asChild>
                    <Link to={cat.path} className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      {cat.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link 
              to="/premium" 
              className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/premium' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Crown className="w-4 h-4" />
              Premium
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/about' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              About
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search apps..."
                className="w-full pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hidden sm:flex"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <img 
                      src={user?.avatar} 
                      alt={user?.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="hidden sm:inline">{user?.username}</span>
                    {user?.isPremium && (
                      <Crown className="w-4 h-4 text-yellow-500" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.username}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile?tab=downloads" className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      My Downloads
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-background">
            <div className="py-4 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search apps..."
                    className="w-full pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>

              {/* Mobile Navigation */}
              <nav className="px-4 space-y-2">
                <Link 
                  to="/apps" 
                  className="block py-2 text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All Apps
                </Link>
                <Link 
                  to="/premium" 
                  className="flex items-center gap-2 py-2 text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Crown className="w-4 h-4" />
                  Premium
                </Link>
                <Link 
                  to="/about" 
                  className="block py-2 text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
              </nav>

              {/* Mobile Categories */}
              <div className="px-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Categories</p>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.path}
                      to={cat.path}
                      className="flex items-center gap-2 py-2 text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{cat.icon}</span>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Auth */}
              {!isAuthenticated && (
                <div className="px-4 pt-4 border-t space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
