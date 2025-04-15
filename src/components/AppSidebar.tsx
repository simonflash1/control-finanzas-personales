
import { NavLink } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Home,
  CreditCard,
  DollarSign,
  Wallet,
  BarChart3,
  Settings,
  LogOut,
  BanknoteIcon,
} from "lucide-react";

const AppSidebar = () => {
  const { theme } = useTheme();
  const { signOut } = useAuth();
  const isMobile = useIsMobile();
  const { setOpenMobile } = useSidebar();
  const { t } = useLanguage();
  
  // Function to close the mobile sidebar
  const handleMenuItemClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };
  
  const menuItems = [
    { to: "/", icon: Home, label: t("nav.dashboard") },
    { to: "/expenses", icon: CreditCard, label: t("nav.expenses") },
    { to: "/income", icon: DollarSign, label: t("nav.income") },
    { to: "/accounts", icon: Wallet, label: t("nav.accounts") },
    { to: "/debts", icon: BanknoteIcon, label: t("nav.debts") },
    { to: "/statistics", icon: BarChart3, label: t("nav.statistics") },
    { to: "/settings", icon: Settings, label: t("nav.settings") },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-lg">{t("app.name")}</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton asChild tooltip={isMobile ? undefined : item.label}>
                <NavLink 
                  to={item.to}
                  className={({ isActive }) => 
                    isActive ? "text-primary flex items-center gap-3 w-full" : "flex items-center gap-3 w-full"
                  }
                  onClick={handleMenuItemClick}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-3">
          <button 
            onClick={() => {
              signOut();
              if (isMobile) {
                setOpenMobile(false);
              }
            }}
            className="flex items-center gap-3 w-full text-red-500 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>{t("logout")}</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
