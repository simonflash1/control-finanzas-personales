
import { NavLink } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
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
  
  const menuItems = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/expenses", icon: CreditCard, label: "Expenses" },
    { to: "/income", icon: DollarSign, label: "Income" },
    { to: "/accounts", icon: Wallet, label: "Accounts" },
    { to: "/debts", icon: BanknoteIcon, label: "Debts" },
    { to: "/statistics", icon: BarChart3, label: "Statistics" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-lg">FinanceFlow</span>
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
            onClick={signOut}
            className="flex items-center gap-3 w-full text-red-500 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
