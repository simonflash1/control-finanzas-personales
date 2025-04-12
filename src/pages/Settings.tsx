
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/context/ThemeContext";
import { AlertCircle, Moon, Sun, Bell, Wallet, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();
  
  const handleReset = () => {
    toast({
      title: "Reset Confirmation",
      description: "This would reset all your data. This feature is not implemented in the demo.",
    });
  };
  
  const handleExport = () => {
    toast({
      title: "Export Success",
      description: "Your data would be exported. This feature is not implemented in the demo.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize how FinanceFlow looks on your device.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <Label htmlFor="dark-mode">Dark Mode</Label>
              </div>
              <Switch 
                id="dark-mode" 
                checked={theme === 'dark'} 
                onCheckedChange={toggleTheme}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure how you want to receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <Label htmlFor="expense-alerts">Expense Alerts</Label>
              </div>
              <Switch id="expense-alerts" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wallet className="h-5 w-5" />
                <Label htmlFor="balance-alerts">Low Balance Alerts</Label>
              </div>
              <Switch id="balance-alerts" defaultChecked />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>
              Manage your financial data.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleExport} className="w-full">Export Data</Button>
            <Button variant="outline" className="w-full">Import Data</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>
              Be careful with these actions, they cannot be undone.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleReset} variant="destructive" className="w-full">
              <AlertCircle className="h-4 w-4 mr-2" />
              Reset All Data
            </Button>
            <Button variant="outline" className="w-full text-red-500 hover:text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
