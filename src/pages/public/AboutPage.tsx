import { 
  Sparkles, Shield, Zap, Heart, Github, MessageCircle,
  Target, Eye, Users, Code 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const values = [
  {
    icon: Shield,
    title: 'Security First',
    description: 'Every app in our repository undergoes thorough security scanning to ensure it\'s safe for our users.'
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We leverage GitHub integration to provide automatic updates and the latest versions of apps.'
  },
  {
    icon: Heart,
    title: 'User-Centric',
    description: 'Our platform is built with users in mind, focusing on ease of use and accessibility.'
  },
  {
    icon: Code,
    title: 'Transparency',
    description: 'We believe in open communication and provide clear information about every app in our repository.'
  }
];

const stats = [
  { value: '10K+', label: 'Apps Available' },
  { value: '1M+', label: 'Total Downloads' },
  { value: '50K+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">AxeLux</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About AxeLux ID
          </h1>
          <p className="text-lg text-muted-foreground">
            We are dedicated to providing a secure, reliable, and comprehensive platform 
            for Android app distribution with a focus on quality and user experience.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To democratize access to quality Android applications by providing a trusted 
                platform that connects developers with users. We strive to ensure every app 
                in our repository meets the highest standards of security and functionality, 
                while maintaining an exceptional user experience.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become the world's most trusted Android app repository, known for our 
                commitment to security, innovation, and user satisfaction. We envision a 
                platform where users can discover and download apps with complete confidence, 
                supported by seamless GitHub integration and robust verification processes.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-primary-foreground">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Story */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              AxeLux was founded in 2024 with a simple yet ambitious goal: to create a 
              platform where Android users could discover and download applications with 
              complete confidence. In a landscape filled with questionable sources and 
              security risks, we saw the need for a trusted repository that prioritizes 
              user safety above all else.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our unique approach integrates directly with GitHub, allowing us to provide 
              automatic updates and maintain transparent version histories for every app 
              in our collection. This integration ensures that our users always have access 
              to the latest versions while maintaining complete traceability.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, AxeLux serves thousands of users worldwide, offering both free and 
              premium applications that have passed our rigorous security checks. We continue 
              to evolve, adding new features and improving our platform to better serve our 
              growing community of users and developers.
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Behind AxeLux</h2>
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AxeLux ID</h3>
              <p className="text-muted-foreground max-w-xl mx-auto">
                AxeLux is developed and owned by AxeLux ID, a team dedicated to providing 
                quality Android applications and exceptional user experiences. Our team 
                consists of passionate developers, security experts, and user experience 
                specialists working together to build the best app repository platform.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">
            Have questions or suggestions? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <a 
                href="https://wa.me/0881010065137"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Contact via WhatsApp
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a 
                href="mailto:support@axelux.id"
                className="flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                Email Us
              </a>
            </Button>
          </div>
        </div>

        {/* Credit Footer */}
        <div className="mt-20 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 AxeLux - AxeLux ID. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            This website is developed and owned by AxeLux ID.
          </p>
        </div>
      </div>
    </div>
  );
}
