import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import AppLayout from "@/layouts/AppLayout";

// Use hash-based routing
function AppRouter() {
  return (
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/">
           <Home />
        </Route>
        
        {/* Application Routes - All paths starting with /app go to AppLayout */}
        <Route path="/app/:rest*">
          <AppLayout />
        </Route>

        {/* Fallback for Landing Page Anchor Links */}
        <Route path="/:section">
          {(params) => <Home targetSection={params.section} />}
        </Route>
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      {/* Enable switchable themes, default to system or user preference if possible, but here starting with dark as per original design intention but allowing switch */}
      <ThemeProvider defaultTheme="dark" switchable={true}>
        <TooltipProvider>
          <Toaster />
          <AppRouter />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;