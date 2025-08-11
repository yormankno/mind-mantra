import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Users, 
  Bell, 
  ClipboardList, 
  Gamepad2, 
  Menu,
  Heart,
  Sun,
  Moon
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const Layout = ({ children, currentSection, onSectionChange }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Brain,
      color: 'primary'
    },
    {
      id: 'users',
      label: 'Gestión de Usuarios',
      icon: Users,
      color: 'secondary'
    },
    {
      id: 'notifications',
      label: 'Notificaciones de Cuidado',
      icon: Bell,
      color: 'care'
    },
    {
      id: 'evaluations',
      label: 'Evaluaciones',
      icon: ClipboardList,
      color: 'therapeutic'
    },
    {
      id: 'entertainment',
      label: 'Entretenimiento Terapéutico',
      icon: Gamepad2,
      color: 'wellness'
    }
  ];

  return (
    <div className="min-h-screen bg-background transition-gentle">
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-300 bg-sidebar border-r border-sidebar-border shadow-soft",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
            <div className={cn(
              "flex items-center gap-3 transition-all duration-300",
              !sidebarOpen && "justify-center"
            )}>
              <div className="p-2 rounded-xl bg-gradient-hero shadow-soft">
                <Heart className="h-6 w-6 text-white" />
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="text-lg font-semibold text-sidebar-foreground">MentalCare</h1>
                  <p className="text-sm text-sidebar-foreground/60">Plataforma de Bienestar</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 transition-gentle",
                    !sidebarOpen && "justify-center px-2",
                    isActive && "bg-gradient-serenity text-white shadow-soft",
                    !isActive && "text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                  onClick={() => onSectionChange(item.id)}
                >
                  <Icon className={cn(
                    "h-5 w-5 transition-gentle",
                    isActive && "animate-gentle-pulse"
                  )} />
                  {sidebarOpen && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className={cn(
              "flex items-center gap-3",
              !sidebarOpen && "justify-center"
            )}>
              <div className="h-8 w-8 rounded-full bg-gradient-care flex items-center justify-center">
                <span className="text-sm font-medium text-white">U</span>
              </div>
              {sidebarOpen && (
                <div className="flex-1">
                  <p className="text-sm font-medium text-sidebar-foreground">Usuario</p>
                  <p className="text-xs text-sidebar-foreground/60">Terapeuta</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "transition-all duration-300",
        sidebarOpen ? "ml-64" : "ml-16"
      )}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;