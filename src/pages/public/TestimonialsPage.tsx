import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, Quote, User, ThumbsUp, MessageSquare, 
  ChevronLeft, ChevronRight, Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAdminStore } from '@/store/adminStore';
import { useAuthStore } from '@/store/authStore';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';

export default function TestimonialsPage() {
  const { testimonials } = useAdminStore();
  const { isAuthenticated } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(0);
  
  const approvedTestimonials = testimonials.filter(t => t.isApproved);
  const featuredTestimonials = approvedTestimonials.filter(t => t.isFeatured);
  
  const itemsPerPage = 6;
  const totalPages = Math.ceil(approvedTestimonials.length / itemsPerPage);
  const paginatedTestimonials = approvedTestimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleWriteTestimonial = () => {
    if (!isAuthenticated) {
      toast.error('Please login to write a testimonial');
      return;
    }
    toast.info('Testimonial form coming soon!');
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-4">
            <MessageSquare className="w-3 h-3 mr-1" />
            User Testimonials
          </Badge>
          <h1 className="text-4xl font-bold mb-4">What Our Users Say</h1>
          <p className="text-lg text-muted-foreground">
            Discover why thousands of users trust AxeLux for their Android app needs.
            Read genuine testimonials from our community.
          </p>
        </div>

        {/* Featured Testimonials */}
        {featuredTestimonials.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Featured Reviews</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTestimonials.slice(0, 3).map((testimonial) => (
                <Card key={testimonial.id} className="relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <Quote className="w-8 h-8 text-primary/20" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={testimonial.user.avatar} 
                        alt={testimonial.user.username}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.user.username}</p>
                        {testimonial.user.isPremium && (
                          <Badge variant="secondary" className="text-xs">
                            Premium User
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
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
                    <p className="text-muted-foreground">{testimonial.content}</p>
                    {testimonial.app && (
                      <p className="text-sm text-muted-foreground mt-4">
                        Reviewed: <Link to={`/apps/${testimonial.app.id}`} className="text-primary hover:underline">{testimonial.app.name}</Link>
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: '4.8', label: 'Average Rating', icon: Star },
            { value: '2,500+', label: 'Reviews', icon: MessageSquare },
            { value: '98%', label: 'Satisfaction', icon: ThumbsUp },
            { value: '50K+', label: 'Happy Users', icon: User },
          ].map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* All Testimonials */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">All Testimonials</h2>
            <Button onClick={handleWriteTestimonial}>
              <Sparkles className="w-4 h-4 mr-2" />
              Write a Review
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedTestimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={testimonial.user.avatar} 
                      alt={testimonial.user.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{testimonial.user.username}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(testimonial.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-3 h-3 ${
                          i < testimonial.rating 
                            ? 'fill-yellow-500 text-yellow-500' 
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{testimonial.content}</p>
                  {testimonial.adminReply && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="text-xs font-semibold text-primary mb-1">AxeLux Team</p>
                      <p className="text-sm">{testimonial.adminReply}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                disabled={currentPage === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage + 1} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage === totalPages - 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
              <p className="mb-6 opacity-90">
                Have you used AxeLux? We'd love to hear about your experience!
                Your feedback helps us improve and helps others discover our platform.
              </p>
              <Button 
                variant="secondary" 
                onClick={handleWriteTestimonial}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Write a Testimonial
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
