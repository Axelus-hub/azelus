import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Plus, MoreHorizontal, 
  CheckCircle, ExternalLink, Github, Star,
  Edit, Trash2, RefreshCw 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useAdminStore } from '@/store/adminStore';
import { formatNumber } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminApps() {
  const { apps, verifyApp, deleteApp } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'verified' | 'pending'>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState<string | null>(null);

  const filteredApps = apps.filter(app => {
    const matchesSearch = 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.packageName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'verified') return matchesSearch && app.isVerified;
    if (filter === 'pending') return matchesSearch && !app.isVerified;
    return matchesSearch;
  });

  const handleVerify = (appId: string) => {
    verifyApp(appId);
    toast.success('App verified successfully');
  };

  const handleDelete = (appId: string) => {
    setAppToDelete(appId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (appToDelete) {
      deleteApp(appToDelete);
      toast.success('App deleted successfully');
      setDeleteDialogOpen(false);
      setAppToDelete(null);
    }
  };

  const handleSyncGitHub = (_appId: string) => {
    toast.info('Syncing with GitHub...');
    setTimeout(() => {
      toast.success('GitHub sync completed');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Apps Management</h1>
          <p className="text-muted-foreground">
            Manage apps, verify uploads, and sync with GitHub
          </p>
        </div>
        <Button asChild>
          <Link to="#">
            <Plus className="w-4 h-4 mr-2" />
            Add App
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Apps</p>
            <p className="text-2xl font-bold">{apps.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Verified</p>
            <p className="text-2xl font-bold text-green-500">
              {apps.filter(a => a.isVerified).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-yellow-500">
              {apps.filter(a => !a.isVerified).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Premium</p>
            <p className="text-2xl font-bold text-purple-500">
              {apps.filter(a => a.type === 'premium').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search apps..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'verified' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('verified')}
          >
            Verified
          </Button>
          <Button 
            variant={filter === 'pending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
        </div>
      </div>

      {/* Apps Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>App</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApps.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img 
                        src={app.icon} 
                        alt={app.name}
                        className="w-10 h-10 rounded-lg"
                      />
                      <div>
                        <p className="font-medium">{app.name}</p>
                        <p className="text-xs text-muted-foreground">{app.developer}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{app.category}</Badge>
                  </TableCell>
                  <TableCell>v{app.currentVersion}</TableCell>
                  <TableCell>{formatNumber(app.downloads)}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      {app.rating}
                    </span>
                  </TableCell>
                  <TableCell>
                    {app.isVerified ? (
                      <Badge className="bg-green-500">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-yellow-500">
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/apps/${app.id}`} target="_blank">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Public
                          </Link>
                        </DropdownMenuItem>
                        {app.githubRepo && (
                          <DropdownMenuItem 
                            onClick={() => handleSyncGitHub(app.id)}
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Sync GitHub
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        {!app.isVerified && (
                          <DropdownMenuItem onClick={() => handleVerify(app.id)}>
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            Verify App
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDelete(app.id)}
                          className="text-red-500"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete App</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this app? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
