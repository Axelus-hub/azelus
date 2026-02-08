import { useState } from 'react';
import { 
  Search, Crown, Ban, CheckCircle, MoreHorizontal,
  Mail, Calendar, Download 
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
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminUsers() {
  const { users, banUser, unbanUser, upgradeUserToPremium, downgradeUser } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'premium' | 'banned'>('all');
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    type: 'ban' | 'unban' | 'upgrade' | 'downgrade' | null;
    userId: string | null;
    username: string;
  }>({ open: false, type: null, userId: null, username: '' });

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'premium') return matchesSearch && user.isPremium;
    if (filter === 'banned') return matchesSearch && user.isBanned;
    return matchesSearch;
  });

  const handleAction = () => {
    if (!actionDialog.userId || !actionDialog.type) return;

    switch (actionDialog.type) {
      case 'ban':
        banUser(actionDialog.userId);
        toast.success(`User ${actionDialog.username} has been banned`);
        break;
      case 'unban':
        unbanUser(actionDialog.userId);
        toast.success(`User ${actionDialog.username} has been unbanned`);
        break;
      case 'upgrade':
        upgradeUserToPremium(actionDialog.userId, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
        toast.success(`User ${actionDialog.username} upgraded to premium`);
        break;
      case 'downgrade':
        downgradeUser(actionDialog.userId);
        toast.success(`User ${actionDialog.username} downgraded`);
        break;
    }

    setActionDialog({ open: false, type: null, userId: null, username: '' });
  };

  const openActionDialog = (type: 'ban' | 'unban' | 'upgrade' | 'downgrade', user: typeof users[0]) => {
    setActionDialog({
      open: true,
      type,
      userId: user.id,
      username: user.username
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">
          Manage users, ban accounts, and handle premium subscriptions
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Premium</p>
            <p className="text-2xl font-bold text-yellow-500">
              {users.filter(u => u.isPremium).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Active Today</p>
            <p className="text-2xl font-bold text-green-500">
              {users.filter(u => u.lastLogin && new Date(u.lastLogin).toDateString() === new Date().toDateString()).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Banned</p>
            <p className="text-2xl font-bold text-red-500">
              {users.filter(u => u.isBanned).length}
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
            placeholder="Search users..."
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
            variant={filter === 'premium' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('premium')}
          >
            Premium
          </Button>
          <Button 
            variant={filter === 'banned' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('banned')}
          >
            Banned
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className={user.isBanned ? 'opacity-50' : ''}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img 
                        src={user.avatar} 
                        alt={user.username}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{user.username}</p>
                          {user.isPremium && (
                            <Crown className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'superadmin' ? 'destructive' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.isBanned ? (
                      <Badge variant="destructive">
                        <Ban className="w-3 h-3 mr-1" />
                        Banned
                      </Badge>
                    ) : (
                      <Badge className="bg-green-500">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {user.downloadCount}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="w-4 h-4 mr-2" />
                          View Activity
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {!user.isPremium ? (
                          <DropdownMenuItem onClick={() => openActionDialog('upgrade', user)}>
                            <Crown className="w-4 h-4 mr-2 text-yellow-500" />
                            Upgrade to Premium
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => openActionDialog('downgrade', user)}>
                            <Crown className="w-4 h-4 mr-2" />
                            Downgrade
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        {!user.isBanned ? (
                          <DropdownMenuItem 
                            onClick={() => openActionDialog('ban', user)}
                            className="text-red-500"
                          >
                            <Ban className="w-4 h-4 mr-2" />
                            Ban User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => openActionDialog('unban', user)}>
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            Unban User
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Action Dialog */}
      <Dialog open={actionDialog.open} onOpenChange={(open) => setActionDialog({ ...actionDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionDialog.type === 'ban' && 'Ban User'}
              {actionDialog.type === 'unban' && 'Unban User'}
              {actionDialog.type === 'upgrade' && 'Upgrade to Premium'}
              {actionDialog.type === 'downgrade' && 'Downgrade User'}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {actionDialog.type} <strong>{actionDialog.username}</strong>?
              {actionDialog.type === 'ban' && ' This will prevent the user from accessing the platform.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog({ open: false, type: null, userId: null, username: '' })}>
              Cancel
            </Button>
            <Button 
              variant={actionDialog.type === 'ban' || actionDialog.type === 'downgrade' ? 'destructive' : 'default'}
              onClick={handleAction}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
