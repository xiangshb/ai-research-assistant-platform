import { Link, useLocation, Switch, Route, Redirect } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  Network,
  Lightbulb,
  Settings,
  LogOut,
  Zap,
  Menu,
  X,
  Search,
  Sun,
  Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import ChatPage from "@/pages/app/Chat";
import GraphPage from "@/pages/app/Graph";
import DiscoveryPage from "@/pages/app/Discovery";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/contexts/ThemeContext";

const sidebarItems = [
  { icon: MessageSquare, label: "AI 科研助理", href: "/app/chat" },
  { icon: Network, label: "知识图谱导航", href: "/app/graph" },
  { icon: Lightbulb, label: "创新发现", href: "/app/discovery" },
  { icon: Settings, label: "设置", href: "/app/settings" },
];

export default function AppLayout() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden transition-colors duration-300">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card/50 backdrop-blur-xl">
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50 group-hover:bg-primary/40 transition-colors">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="font-heading font-bold text-lg">SciInsight</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Theme Toggle */}
        <div className="p-4 border-t border-border flex flex-col gap-2">
          <div className="flex items-center justify-between px-2 pb-2">
             <span className="text-xs font-medium text-muted-foreground">Theme</span>
             <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full" 
                onClick={toggleTheme}
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
             </Button>
          </div>
          
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <Avatar className="w-8 h-8 border border-border">
              <AvatarFallback className="bg-primary/20 text-primary text-xs">XS</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">Xiang Shibing</div>
              <div className="text-xs text-muted-foreground truncate">Pro Plan</div>
            </div>
            <LogOut className="w-4 h-4 text-muted-foreground hover:text-destructive" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - Mobile & Search */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-border bg-background/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Global Search */}
            <div className="hidden md:flex items-center relative max-w-md w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="搜索论文、概念或结构洞..." 
                className="pl-9 bg-card/50 border-border focus-visible:ring-primary/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-foreground"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            
            <Button variant="outline" size="sm" className="hidden md:flex border-primary/30 text-primary hover:bg-primary/10 hover:text-primary">
              <Zap className="w-3 h-3 mr-2" />
              Upgrade to Pro
            </Button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl md:hidden flex flex-col">
            <div className="h-16 flex items-center justify-between px-4 border-b border-border">
              <span className="font-heading font-bold text-lg">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="p-4 space-y-2">
              {sidebarItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div 
                    className="flex items-center gap-3 px-4 py-4 rounded-lg text-lg font-medium hover:bg-muted/50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8 relative">
          <Switch>
            <Route path="/app/chat" component={ChatPage} />
            <Route path="/app/graph" component={GraphPage} />
            <Route path="/app/discovery" component={DiscoveryPage} />
            {/* Default redirect to Chat */}
            <Route path="/app/:rest*">
              <Redirect to="/app/chat" />
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
}