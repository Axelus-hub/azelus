import { useState } from 'react';
import { 
  Star, CheckCircle, XCircle,
  Reply, Trash2, Filter, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
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

export default function AdminTestimonials() {
  const { 
    testimonials, 
    approveTestimonial, 
    rejectTestimonial, 
    featureTestimonial,
    replyToTestimonial,
    deleteTestimonial 
  } = useAdminStore();
  
  const [filter, setFilter] = useState<'all' | 'pending' | 'featured'>('all');
  const [replyDialog, setReplyDialog] = useState<{ open: boolean; id: string | null; reply: string }>({
    open: false,
    id: null,
    reply: ''
  });
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null
  });

  const filteredTestimonials = testimonials.filter(t => {
    if (filter === 'pending') return !t.isApproved;
    if (filter === 'featured') return t.isFeatured;
    return true;
  });

  const handleApprove = (id: string) => {
    approveTestimonial(id);
    toast.success('Testimonial approved');
  };

  const handleReject = (id: string) => {
    rejectTestimonial(id);
    toast.success('Testimonial rejected');
  };

  const handleFeature = (id: string) => {
    featureTestimonial(id);
    toast.success('Testimonial featured status updated');
  };

  const handleReply = () => {
    if (replyDialog.id && replyDialog.reply) {
      replyToTestimonial(replyDialog.id, replyDialog.reply);
      toast.success('Reply added');
      setReplyDialog({ open: false, id: null, reply: '' });
    }
  };

  const handleDelete = () => {
    if (deleteDialog.id) {
      deleteTestimonial(deleteDialog.id);
      toast.success('Testimonial deleted');
      setDeleteDialog({ open: false, id: null });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <p className="text-muted-foreground">
          Manage user testimonials and reviews
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold">{testimonials.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-yellow-500">
              {testimonials.filter(t => !t.isApproved).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Approved</p>
            <p className="text-2xl font-bold text-green-500">
              {testimonials.filter(t => t.isApproved).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Featured</p>
            <p className="text-2xl font-bold text-purple-500">
              {testimonials.filter(t => t.isFeatured).length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          <Filter className="w-4 h-4 mr-2" />
          All
        </Button>
        <Button 
          variant={filter === 'pending' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('pending')}
        >
          <Clock className="w-4 h-4 mr-2" />
          Pending
          {testimonials.filter(t => !t.isApproved).length > 0 && (
            <Badge variant="destructive" className="ml-2">
              {testimonials.filter(t => !t.isApproved).length}
            </Badge>
          )}
        </Button>
        <Button 
          variant={filter === 'featured' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('featured')}
        >
          <Star className="w-4 h-4 mr-2" />
          Featured
        </Button>
      </div>

      {/* Testimonials Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTestimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img 
                        src={testimonial.user.avatar} 
                        alt={testimonial.user.username}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="font-medium">{testimonial.user.username}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating 
                              ? 'fill-yellow-500 text-yellow-500' 
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="max-w-xs truncate">{testimonial.content}</p>
                    {testimonial.adminReply && (
                      <p className="text-xs text-primary mt-1">
                        Replied by admin
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    {!testimonial.isApproved ? (
                      <Badge variant="outline" className="text-yellow-500">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    ) : testimonial.isFeatured ? (
                      <Badge className="bg-purple-500">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    ) : (
                      <Badge className="bg-green-500">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approved
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(testimonial.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {!testimonial.isApproved && (
                        <>
                          <Button 
                            size="icon" 
                            variant="ghost"
                            onClick={() => handleApprove(testimonial.id)}
                          >
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost"
                            onClick={() => handleReject(testimonial.id)}
                          >
                            <XCircle className="w-4 h-4 text-red-500" />
                          </Button>
                        </>
                      )}
                      {testimonial.isApproved && (
                        <Button 
                          size="icon" 
                          variant="ghost"
                          onClick={() => handleFeature(testimonial.id)}
                        >
                          <Star className={`w-4 h-4 ${testimonial.isFeatured ? 'fill-purple-500 text-purple-500' : ''}`} />
                        </Button>
                      )}
                      <Button 
                        size="icon" 
                        variant="ghost"
                        onClick={() => setReplyDialog({ 
                          open: true, 
                          id: testimonial.id,
                          reply: testimonial.adminReply || ''
                        })}
                      >
                        <Reply className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost"
                        onClick={() => setDeleteDialog({ open: true, id: testimonial.id })}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Reply Dialog */}
      <Dialog open={replyDialog.open} onOpenChange={(open) => setReplyDialog({ ...replyDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to Testimonial</DialogTitle>
            <DialogDescription>
              Add an admin reply to this testimonial.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Write your reply..."
            value={replyDialog.reply}
            onChange={(e) => setReplyDialog({ ...replyDialog, reply: e.target.value })}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyDialog({ open: false, id: null, reply: '' })}>
              Cancel
            </Button>
            <Button onClick={handleReply}>Send Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Testimonial</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this testimonial? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog({ open: false, id: null })}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
