import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/lib/store';
import { Copy, Check, User, Shield, Bell, Settings as SettingsIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const Profile = () => {
  const { user, isWalletConnected } = useAppStore();
  const [copied, setCopied] = useState(false);

  if (!isWalletConnected || !user) {
    return <Navigate to="/connect" replace />;
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(user.address);
    setCopied(true);
    toast.success('Address copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Profile & Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Profile Summary */}
        <Card className="mb-8 shadow-soft">
          <CardContent className="p-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-3xl font-bold text-white">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="mb-1 text-2xl font-bold">{user.name}</h2>
                <p className="mb-2 text-muted-foreground">{user.email}</p>
                <div className="flex items-center gap-2">
                  <code className="rounded bg-muted px-3 py-1 text-sm">
                    {user.address.slice(0, 10)}...{user.address.slice(-8)}
                  </code>
                  <Button variant="ghost" size="sm" onClick={copyAddress}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="rounded-lg bg-primary/10 px-4 py-2 text-center">
                  <div className="text-sm text-muted-foreground">Role</div>
                  <div className="font-semibold text-primary">{user.role}</div>
                </div>
                {user.verified && (
                  <div className="flex items-center gap-2 text-success">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary">{user.stats.totalProducts}</div>
              <div className="text-sm text-muted-foreground">Total Products</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-secondary">{user.stats.totalTransfers}</div>
              <div className="text-sm text-muted-foreground">Total Transfers</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-success">
                {user.stats.avgDeliveryTime} days
              </div>
              <div className="text-sm text-muted-foreground">Avg. Delivery Time</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-warning">{user.stats.trustScore}/100</div>
              <div className="text-sm text-muted-foreground">Trust Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input id="org-name" defaultValue={user.name} />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user.email} />
                </div>
                <div>
                  <Label htmlFor="license">License Number</Label>
                  <Input id="license" defaultValue={user.license} />
                </div>
                <div>
                  <Label htmlFor="wallet">Wallet Address (Read-only)</Label>
                  <Input id="wallet" value={user.address} readOnly />
                </div>
                <Button className="gradient-primary">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive updates via email
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">SMS Alerts</div>
                    <div className="text-sm text-muted-foreground">
                      Get critical alerts via SMS
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Browser Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Real-time browser alerts
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Temperature Alerts</div>
                    <div className="text-sm text-muted-foreground">
                      Notify on temperature deviations
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Transfer Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Alert on custody transfers
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button className="gradient-primary">Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button className="gradient-primary">Change Password</Button>

                <div className="border-t pt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-muted-foreground">
                        Add an extra layer of security
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="mb-4 font-semibold">Connected Devices</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <div className="font-medium">Current Device</div>
                        <div className="text-sm text-muted-foreground">
                          Last active: Just now
                        </div>
                      </div>
                      <span className="text-xs text-success">Active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Connect external services and devices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">IoT Temperature Sensors</div>
                      <div className="text-sm text-muted-foreground">
                        Connect temperature monitoring devices
                      </div>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Third-Party Logistics</div>
                      <div className="text-sm text-muted-foreground">
                        Integrate with shipping providers
                      </div>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">API Access</div>
                      <div className="text-sm text-muted-foreground">
                        Generate API keys for custom integrations
                      </div>
                    </div>
                    <Button variant="outline">Manage Keys</Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Webhook Configuration</div>
                      <div className="text-sm text-muted-foreground">
                        Set up webhooks for event notifications
                      </div>
                    </div>
                    <Button variant="outline">Setup</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
