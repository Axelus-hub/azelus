import { useState } from 'react';
import { 
  Save, Globe, Bell, Shield, Database,
  MessageCircle, Moon, Sun, Monitor 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminStore } from '@/store/adminStore';
import { toast } from 'sonner';

export default function AdminSettings() {
  const { siteConfig, updateSiteConfig } = useAdminStore();
  const [config, setConfig] = useState(siteConfig);

  const handleSave = () => {
    updateSiteConfig(config);
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Configure site settings and preferences
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="general">
            <Globe className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Database className="w-4 h-4 mr-2" />
            Integrations
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={config.siteName}
                  onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Input
                  id="siteDescription"
                  value={config.siteDescription}
                  onChange={(e) => setConfig({ ...config, siteDescription: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Default Theme</Label>
                <div className="flex gap-2">
                  <Button
                    variant={config.defaultTheme === 'light' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setConfig({ ...config, defaultTheme: 'light' })}
                  >
                    <Sun className="w-4 h-4 mr-2" />
                    Light
                  </Button>
                  <Button
                    variant={config.defaultTheme === 'dark' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setConfig({ ...config, defaultTheme: 'dark' })}
                  >
                    <Moon className="w-4 h-4 mr-2" />
                    Dark
                  </Button>
                  <Button
                    variant={config.defaultTheme === 'system' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setConfig({ ...config, defaultTheme: 'system' })}
                  >
                    <Monitor className="w-4 h-4 mr-2" />
                    System
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Allow Registration</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow new users to register on the site
                  </p>
                </div>
                <Switch
                  checked={config.allowRegistration}
                  onCheckedChange={(checked) => 
                    setConfig({ ...config, allowRegistration: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Put the site in maintenance mode
                  </p>
                </div>
                <Switch
                  checked={config.maintenanceMode}
                  onCheckedChange={(checked) => 
                    setConfig({ ...config, maintenanceMode: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="smtpHost">SMTP Host</Label>
                <Input id="smtpHost" placeholder="smtp.example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="smtpPort">SMTP Port</Label>
                <Input id="smtpPort" placeholder="587" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="smtpUser">SMTP Username</Label>
                <Input id="smtpUser" placeholder="user@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="smtpPass">SMTP Password</Label>
                <Input id="smtpPass" type="password" placeholder="••••••••" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                'New user registration',
                'New premium request',
                'App upload pending verification',
                'New testimonial submitted',
                'Server alerts',
              ].map((event) => (
                <div key={event} className="flex items-center justify-between">
                  <Label>{event}</Label>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for admin accounts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Rate Limiting</Label>
                  <p className="text-sm text-muted-foreground">
                    Limit API requests per IP
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Activity Logging</Label>
                  <p className="text-sm text-muted-foreground">
                    Log all admin actions
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Minimum Password Length</Label>
                <Input type="number" defaultValue={8} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Require Special Characters</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label>Require Uppercase Letters</Label>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-500" />
                WhatsApp Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                <Input
                  id="whatsappNumber"
                  value={config.whatsappNumber}
                  onChange={(e) => setConfig({ ...config, whatsappNumber: e.target.value })}
                />
                <p className="text-sm text-muted-foreground">
                  This number will be used for premium purchase requests
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>GitHub Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>GitHub API Token</Label>
                <Input type="password" placeholder="ghp_xxxxxxxxxxxx" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-sync Releases</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically sync app versions from GitHub
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CDN Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>CDN URL</Label>
                <Input placeholder="https://cdn.axelux.id" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable CDN</Label>
                  <p className="text-sm text-muted-foreground">
                    Serve static files from CDN
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
