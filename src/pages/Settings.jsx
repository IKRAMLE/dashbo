import AdminLayout from "@/layouts/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  return (
    <AdminLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-[#0d4071]">Admin Settings</h1>
        <p className="text-[#0070cc]">Manage platform settings and configurations</p>

        <Tabs defaultValue="general" className="w-full ">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="api">API Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure general platform settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform-name">Platform Name</Label>
                    <Input id="platform-name" defaultValue="MedRent" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input id="contact-email" defaultValue="support@medrent.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platform-description">Platform Description</Label>
                  <Input id="platform-description" defaultValue="Medical equipment rental platform connecting providers and patients" />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Temporarily disable the platform for maintenance</p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="user-registration">User Registration</Label>
                    <p className="text-sm text-muted-foreground">Allow new users to register on the platform</p>
                  </div>
                  <Switch id="user-registration" defaultChecked />
                </div>

                <Button className="mt-4 bg-blue-600 text-white">Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Settings</CardTitle>
                <CardDescription>Configure regional and localization settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      className="w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background rounded-md"
                      defaultValue="America/New_York"
                    >
                      <option value="America/New_York">Eastern Time (US & Canada)</option>
                      <option value="America/Chicago">Central Time (US & Canada)</option>
                      <option value="America/Denver">Mountain Time (US & Canada)</option>
                      <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                      <option value="Europe/London">London</option>
                      <option value="Europe/Paris">Paris</option>
                      <option value="Asia/Tokyo">Tokyo</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <select
                      id="date-format"
                      className="w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background rounded-md"
                      defaultValue="MM/DD/YYYY"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <select
                      id="currency"
                      className="w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background rounded-md"
                      defaultValue="USD"
                    >
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                      <option value="GBP">British Pound (GBP)</option>
                      <option value="JPY">Japanese Yen (JPY)</option>
                      <option value="CAD">Canadian Dollar (CAD)</option>
                    </select>
                  </div>
                </div>

                <Button className="mt-4 bg-blue-600 text-white">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Configure email notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">New User Registration</h4>
                      <p className="text-sm text-muted-foreground">Send notification when a new user registers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">New Equipment Listed</h4>
                      <p className="text-sm text-muted-foreground">Send notification when new equipment is listed</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">New Rental Requests</h4>
                      <p className="text-sm text-muted-foreground">Send notification for new rental requests</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Platform Updates</h4>
                      <p className="text-sm text-muted-foreground">Send notification about platform updates</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Button className="mt-4 bg-blue-600 text-white">Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure platform security options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                    </div>
                    <Switch defaultChecked/>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Password Expiration</h4>
                      <p className="text-sm text-muted-foreground">Require password change every 90 days</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Login Attempts</h4>
                      <p className="text-sm text-muted-foreground">Lock account after 5 failed attempts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" />
                </div>

                <Button className="mt-4 bg-blue-600 text-white">Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
                <CardDescription>Manage API access and keys</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex gap-2">
                    <Input id="api-key" value="••••••••••••••••••••••••••••••" readOnly className="flex-1" />
                    <Button variant="outline">Regenerate</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Last generated: April 1, 2023</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="api-access">API Access</Label>
                    <p className="text-sm text-muted-foreground">Enable API access for third-party integrations</p>
                  </div>
                  <Switch id="api-access" defaultChecked />
                </div>

                <div className="space-y-2 pt-4">
                  <Label htmlFor="rate-limit">API Rate Limit (requests per minute)</Label>
                  <Input id="rate-limit" type="number" defaultValue="60" />
                </div>

                <Button className="mt-4 bg-blue-600 text-white">Save API Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;