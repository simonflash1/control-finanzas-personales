
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import Navbar from "./Navbar";
import AdBanner from "./ads/AdBanner";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Top banner ad - only visible on larger screens */}
          <div className="hidden md:block mb-6">
            <AdBanner 
              adSlot="1234567890" 
              format="horizontal" 
              className="w-full max-w-5xl mx-auto"
            />
          </div>
          
          <Outlet />
          
          {/* Bottom banner ad */}
          <div className="mt-8">
            <AdBanner 
              adSlot="0987654321" 
              format="horizontal" 
              className="w-full max-w-5xl mx-auto"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
