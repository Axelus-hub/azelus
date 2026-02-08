import { useState } from 'react';
import { 
  Crown, MessageCircle, CheckCircle, XCircle, Copy,
  Plus, RefreshCw, Clock 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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

export default function AdminPremium() {
  const { 
    premiumRequests, 
    premiumPackages, 
    vouchers,
    approvePremiumRequest, 
    rejectPremiumRequest,
    createVoucher 
  } = useAdminStore();
  
  const [activeTab, setActiveTab] = useState<'requests' | 'packages' | 'vouchers'>('requests');
  const [rejectDialog, setRejectDialog] = useState<{ open: boolean; requestId: string | null; reason: string }>({
    open: false,
    requestId: null,
    reason: ''
  });

  const pendingRequests = premiumRequests.filter(r => r.status === 'pending');
  const processedRequests = premiumRequests.filter(r => r.status !== 'pending');

  const handleApprove = (requestId: string) => {
    approvePremiumRequest(requestId);
    toast.success('Premium request approved');
  };

  const handleReject = () => {
    if (rejectDialog.requestId) {
      rejectPremiumRequest(rejectDialog.requestId, rejectDialog.reason);
      toast.success('Premium request rejected');
      setRejectDialog({ open: false, requestId: null, reason: '' });
    }
  };

  const handleCreateVoucher = (packageId: string) => {
    const code = createVoucher(packageId);
    toast.success(`Voucher created: ${code}`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Premium Management</h1>
        <p className="text-muted-foreground">
          Manage premium subscriptions, requests, and voucher codes
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending Requests</p>
            <p className="text-2xl font-bold text-yellow-500">{pendingRequests.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Approved Today</p>
            <p className="text-2xl font-bold text-green-500">
              {premiumRequests.filter(r => 
                r.status === 'approved' && 
                r.processedAt && 
                new Date(r.processedAt).toDateString() === new Date().toDateString()
              ).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Active Vouchers</p>
            <p className="text-2xl font-bold">{vouchers.filter(v => !v.isUsed).length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold text-purple-500">Rp 2.5M</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-2">
        <Button
          variant={activeTab === 'requests' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('requests')}
        >
          <Clock className="w-4 h-4 mr-2" />
          Requests
          {pendingRequests.length > 0 && (
            <Badge variant="destructive" className="ml-2">{pendingRequests.length}</Badge>
          )}
        </Button>
        <Button
          variant={activeTab === 'packages' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('packages')}
        >
          <Crown className="w-4 h-4 mr-2" />
          Packages
        </Button>
        <Button
          variant={activeTab === 'vouchers' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('vouchers')}
        >
          <Copy className="w-4 h-4 mr-2" />
          Vouchers
        </Button>
      </div>

      {/* Requests Tab */}
      {activeTab === 'requests' && (
        <div className="space-y-6">
          {/* Pending Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead>Requested</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingRequests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No pending requests
                      </TableCell>
                    </TableRow>
                  ) : (
                    pendingRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img 
                              src={request.user.avatar} 
                              alt={request.user.username}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium">{request.user.username}</p>
                              <p className="text-xs text-muted-foreground">{request.user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{request.package.name}</Badge>
                        </TableCell>
                        <TableCell>
                          <a 
                            href={`https://wa.me/${request.whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-green-500 hover:underline"
                          >
                            <MessageCircle className="w-4 h-4" />
                            {request.whatsappNumber}
                          </a>
                        </TableCell>
                        <TableCell>{formatDate(request.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleApprove(request.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setRejectDialog({ 
                                open: true, 
                                requestId: request.id,
                                reason: '' 
                              })}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Processed Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Processed Requests</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Processed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processedRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img 
                            src={request.user.avatar} 
                            alt={request.user.username}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="font-medium">{request.user.username}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{request.package.name}</Badge>
                      </TableCell>
                      <TableCell>
                        {request.status === 'approved' ? (
                          <Badge className="bg-green-500">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Approved
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <XCircle className="w-3 h-3 mr-1" />
                            Rejected
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {request.processedAt ? formatDate(request.processedAt) : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Packages Tab */}
      {activeTab === 'packages' && (
        <div className="grid md:grid-cols-3 gap-6">
          {premiumPackages.map((pkg) => (
            <Card key={pkg.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{pkg.name}</CardTitle>
                  {pkg.isActive ? (
                    <Badge className="bg-green-500">Active</Badge>
                  ) : (
                    <Badge variant="secondary">Inactive</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-2">
                  Rp {pkg.price.toLocaleString('id-ID')}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {pkg.duration} days
                </p>
                <ul className="space-y-2 mb-4">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full"
                  onClick={() => handleCreateVoucher(pkg.id)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Voucher
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Vouchers Tab */}
      {activeTab === 'vouchers' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Voucher Codes</CardTitle>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vouchers.map((voucher) => (
                  <TableRow key={voucher.id}>
                    <TableCell>
                      <code className="bg-muted px-2 py-1 rounded text-sm">
                        {voucher.code}
                      </code>
                    </TableCell>
                    <TableCell>
                      {premiumPackages.find(p => p.id === voucher.packageId)?.name}
                    </TableCell>
                    <TableCell>
                      {voucher.isUsed ? (
                        <Badge variant="secondary">Used</Badge>
                      ) : (
                        <Badge className="bg-green-500">Active</Badge>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(voucher.createdAt)}</TableCell>
                    <TableCell>{formatDate(voucher.expiryDate)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard(voucher.code)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Reject Dialog */}
      <Dialog open={rejectDialog.open} onOpenChange={(open) => setRejectDialog({ ...rejectDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Premium Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this request.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Reason for rejection..."
            value={rejectDialog.reason}
            onChange={(e) => setRejectDialog({ ...rejectDialog, reason: e.target.value })}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialog({ open: false, requestId: null, reason: '' })}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
