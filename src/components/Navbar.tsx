
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Moon, Sun, Bell } from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-2 bg-background border-b md:px-6">
      <div className="flex items-center">
        <SidebarTrigger className="md:hidden mr-2" />
        <h1 className="text-xl font-semibold tracking-tight">FinanceFlow</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme} 
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
