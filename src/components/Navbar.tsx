
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Menu } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/auth');
  };

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex w-full justify-between items-center">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          )}
          <div className="font-semibold text-lg md:text-xl">FinanceFlow</div>
          {user ? (
            <Button variant="outline" onClick={handleSignOut} size={isMobile ? "sm" : "default"}>
              Sign Out
            </Button>
          ) : (
            <Button variant="outline" onClick={() => navigate('/auth')} size={isMobile ? "sm" : "default"}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
