
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { FinanceProvider } from "@/context/FinanceContext";
import { AuthProvider } from "@/hooks/useAuth";
import { SidebarProvider } from "@/components/ui/sidebar";
import Layout from "./components/Layout";
import Auth from "./pages/Auth";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";
import Accounts from "./pages/Accounts";
import Debts from "./pages/Debts";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <FinanceProvider>
          <TooltipProvider>
            <SidebarProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/auth" element={<Auth />} />
                  <Route 
                    path="/" 
                    element={
                      <RequireAuth>
                        <Layout />
                      </RequireAuth>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    <Route path="expenses" element={<Expenses />} />
                    <Route path="income" element={<Income />} />
                    <Route path="accounts" element={<Accounts />} />
                    <Route path="debts" element={<Debts />} />
                    <Route path="statistics" element={<Statistics />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </SidebarProvider>
          </TooltipProvider>
        </FinanceProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
