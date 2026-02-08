import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown, Check, Zap, Shield, Star, MessageCircle,
  ArrowRight, Sparkles, Lock 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';

const premiumFeatures = [
  'Access to all Premium APKs',
  'Priority download servers',
  'No advertisements',
  'Early access to new releases',
  'Exclusive beta apps',
  'VIP customer support',
  'Request custom apps',
  'Unlimited downloads',
];

const packages = [
  {
    id: '1',
    name: 'Monthly',
    duration: '1 Month',
    price: 25000,
    originalPrice: 35000,
    popular: false,
    features: premiumFeatures.slice(0, 4),
  },
  {
    id: '2',
    name: 'Quarterly',
    duration: '3 Months',
    price: 65000,
    originalPrice: 90000,
    popular: true,
    features: premiumFeatures.slice(0, 6),
  },
  {
    id: '3',
    name: 'Yearly',
    duration: '1 Year',
    price: 199000,
    originalPrice: 300000,
    popular: false,
    features: premiumFeatures,
    badge: 'Best Value',
  },
];

export default function PremiumPage() {
  const { isAuthenticated, user } = useAuthStore();
  const [showWhatsAppDialog, setShowWhatsAppDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<typeof packages[0] | null>(null);

  const handlePurchase = (pkg: typeof packages[0]) => {
    if (!isAuthenticated) {
      toast.error('Please login to purchase premium');
      return;
    }
    
    setSelectedPackage(pkg);
    setShowWhatsAppDialog(true);
  };

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent(
      `Halo AxeLux! Saya ingin membeli paket Premium:\n\n` +
      `Paket: ${selectedPackage?.name}\n` +
      `Durasi: ${selectedPackage?.duration}\n` +
      `Harga: Rp ${selectedPackage?.price.toLocaleString('id-ID')}\n\n` +
      `Email: ${user?.email}\n` +
      `Username: ${user?.username}\n\n` +
      `Mohon informasi pembayaran. Terima kasih!`
    );
    
    window.open(`https://wa.me/0881010065137?text=${message}`, '_blank');
    setShowWhatsAppDialog(false);
    toast.success('Redirecting to WhatsApp...');
  };

  if (user?.isPremium) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Crown className="w-10 h-10 text-yellow-500" />
            </div>
            <h1 className="text-3xl font-bold mb-4">You're a Premium Member!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for supporting AxeLux. Your premium access is active until{' '}
              <strong>{user.premiumExpiry?.toLocaleDateString()}</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/apps?type=premium">
                  Browse Premium Apps
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/profile">View Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            <Crown className="w-3 h-3 mr-1" />
            Premium Membership
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Unlock{' '}
            <span className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
              Premium Access
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Get unlimited access to our exclusive collection of premium Android apps. 
            Enjoy priority downloads, ad-free experience, and VIP support.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Lock, title: 'Premium Apps', desc: 'Access exclusive premium APKs' },
            { icon: Zap, title: 'Priority Speed', desc: 'Fast download servers' },
            { icon: Shield, title: 'Ad-Free', desc: 'No advertisements ever' },
            { icon: Star, title: 'Early Access', desc: 'Get apps before everyone' },
          ].map((feature) => (
            <Card key={feature.title} className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-yellow-500" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative ${pkg.popular ? 'border-yellow-500 shadow-lg scale-105' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-yellow-500">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              {pkg.badge && !pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge variant="secondary">{pkg.badge}</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground">{pkg.duration}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    Rp {pkg.price.toLocaleString('id-ID')}
                  </span>
                  {pkg.originalPrice > pkg.price && (
                    <p className="text-sm text-muted-foreground line-through">
                      Rp {pkg.originalPrice.toLocaleString('id-ID')}
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${pkg.popular ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
                  onClick={() => handlePurchase(pkg)}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'How do I purchase premium?',
                a: 'Click on any package above and you will be redirected to WhatsApp to complete your purchase. Our team will process your request within 24 hours.'
              },
              {
                q: 'What payment methods are accepted?',
                a: 'We accept bank transfer, e-wallets (OVO, GoPay, DANA), and QRIS. Details will be provided via WhatsApp.'
              },
              {
                q: 'Can I cancel my subscription?',
                a: 'Premium access is a one-time purchase, not a subscription. Once activated, it will remain active until the expiry date.'
              },
              {
                q: 'What happens after I pay?',
                a: 'After payment confirmation, our admin will activate your premium account within 1-24 hours. You will receive a notification once activated.'
              },
            ].map((faq, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Have questions? Contact us directly
          </p>
          <Button variant="outline" asChild>
            <a 
              href="https://wa.me/0881010065137" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </div>

      {/* WhatsApp Dialog */}
      <Dialog open={showWhatsAppDialog} onOpenChange={setShowWhatsAppDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-green-500" />
              Complete Your Purchase
            </DialogTitle>
            <DialogDescription>
              You will be redirected to WhatsApp to complete your premium purchase.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedPackage && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-semibold">{selectedPackage.name} Package</p>
                <p className="text-sm text-muted-foreground">{selectedPackage.duration}</p>
                <p className="text-lg font-bold mt-2">
                  Rp {selectedPackage.price.toLocaleString('id-ID')}
                </p>
              </div>
            )}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowWhatsAppDialog(false)}>
                Cancel
              </Button>
              <Button className="flex-1 bg-green-500 hover:bg-green-600" onClick={handleWhatsAppRedirect}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Continue to WhatsApp
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
