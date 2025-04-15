
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { AlertCircle, Moon, Sun, Bell, Wallet, LogOut, Globe } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";

const Settings = () => {
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  
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
      <h1 className="text-3xl font-bold tracking-tight">{t("settings.title")}</h1>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("settings.language")}</CardTitle>
            <CardDescription>
              {t("settings.language.desc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <Label htmlFor="language-select">{t("settings.language")}</Label>
              </div>
              <Select 
                value={language} 
                onValueChange={(value) => setLanguage(value as "en" | "es")}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder={t("settings.language")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">{t("settings.language.spanish")}</SelectItem>
                  <SelectItem value="en">{t("settings.language.english")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t("settings.appearance")}</CardTitle>
            <CardDescription>
              {t("settings.appearance.desc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <Label htmlFor="dark-mode">{t("settings.darkMode")}</Label>
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
            <CardTitle>{t("settings.notifications")}</CardTitle>
            <CardDescription>
              {t("settings.notifications.desc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <Label htmlFor="expense-alerts">{t("settings.expenseAlerts")}</Label>
              </div>
              <Switch id="expense-alerts" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wallet className="h-5 w-5" />
                <Label htmlFor="balance-alerts">{t("settings.balanceAlerts")}</Label>
              </div>
              <Switch id="balance-alerts" defaultChecked />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t("settings.dataManagement")}</CardTitle>
            <CardDescription>
              {t("settings.dataManagement.desc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleExport} className="w-full">{t("settings.exportData")}</Button>
            <Button variant="outline" className="w-full">{t("settings.importData")}</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t("settings.dangerZone")}</CardTitle>
            <CardDescription>
              {t("settings.dangerZone.desc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleReset} variant="destructive" className="w-full">
              <AlertCircle className="h-4 w-4 mr-2" />
              {t("settings.resetData")}
            </Button>
            <Button variant="outline" className="w-full text-red-500 hover:text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              {t("logout")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
