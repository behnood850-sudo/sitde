import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ConfigList from "./pages/ConfigList";
import BuyConfig from "./pages/BuyConfig";
import Charge from "./pages/Charge";
import Search from "./pages/Search";
import RenewConfig from "./pages/RenewConfig";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/configs" element={<ConfigList />} />
          <Route path="/buy" element={<BuyConfig />} />
          <Route path="/charge" element={<Charge />} />
          <Route path="/search" element={<Search />} />
          <Route path="/renew/:id" element={<RenewConfig />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
