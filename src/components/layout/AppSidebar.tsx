import { useNavigate, useLocation } from "react-router-dom";
  import { useAuth } from "@/hooks/useAuth";
  import {
    Home,
    Users,
    CreditCard,
    Clock,
    User,
    LogOut,
    Settings,
    Moon,
  } from "lucide-react";
  import { Avatar, AvatarFallback } from "@/components/ui/avatar";
  import { Button } from "@/components/ui/button";
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  import { cn } from "@/lib/utils";
  import React, { useState } from "react";

  const AppSidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(true); // Simple boolean state

    const isActive = (path: string) => {
      return location.pathname === path;
    };

    const toggleSidebar = () => {
      setOpen(!open); // Directly toggle the state
    };

    const adminMenuItems = [
      { icon: Home, label: "Dashboard", path: "/admin/dashboard" },
      { icon: Users, label: "Users", path: "/admin/users" },
      { icon: CreditCard, label: "Payments", path: "/admin/payments" },
      { icon: Clock, label: "Attendance", path: "/admin/attendance" },
      { icon: Settings, label: "Profile", path: "/admin/profile" },
    ];

    const memberMenuItems = [
      { icon: Home, label: "Dashboard", path: "/user/dashboard" },
      { icon: CreditCard, label: "Payments", path: "/user/payments" },
      { icon: User, label: "Profile", path: "/user/profile" },
    ];

    const menuItems = user?.role === "admin" ? adminMenuItems : memberMenuItems;

    return (
      <TooltipProvider delayDuration={0}>
        <div
          data-testid="sidebar"
          data-state={open ? "expanded" : "collapsed"}
          aria-expanded={open}
          className={cn(
            "group/sidebar relative hidden h-screen w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-linear data-[state=collapsed]:w-[--sidebar-width-icon] md:flex",
            {
              "border-r border-border": !open,
            }
          )}
          style={
            {
              "--sidebar-width": "16rem",
              "--sidebar-width-icon": "3rem",
            } as React.CSSProperties
          }
        >
          <div
            data-testid="sidebar-header"
            className="flex flex-col items-center justify-center p-4 border-b border-white/10"
          >
            <div className="flex items-center space-x-2 py-2">
              <Moon className="h-6 w-6 text-primary" />
              <span
                data-testid="sidebar-header-text"
                className={cn(
                  "text-xl font-bold text-white transition-all duration-200",
                  !open && "invisible h-0 w-0"
                )}
              >
                LaNeenos Daycare
              </span>
            </div>

            <div className="flex flex-col items-center mt-4 mb-2 w-full">
              <Avatar className="h-14 w-14 mb-2">
                <AvatarFallback className="bg-primary/20 text-primary">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p
                  data-testid="sidebar-user-name"
                  className={cn(
                    "text-sm font-medium text-white truncate max-w-full",
                    !open && "invisible h-0 w-0"
                  )}
                >
                  {user?.name || "User"}
                </p>
                <p
                  data-testid="sidebar-user-email"
                  className={cn(
                    "text-xs text-white/60 truncate max-w-full",
                    !open && "invisible h-0 w-0"
                  )}
                >
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>
          </div>

          <div data-testid="sidebar-content" className="flex-1 overflow-auto">
            <div data-sidebar="group">
              <div data-sidebar="group-label">Navigation</div>
              <div data-sidebar="group-content">
                <ul data-sidebar="menu" className="flex w-full min-w-0 flex-col gap-1">
                  {menuItems.map((item) => (
                    <li key={item.path} data-sidebar="menu-item" className="relative">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            data-sidebar="menu-button"
                            data-size="default"
                            data-active={isActive(item.path)}
                            variant="ghost"
                            size="default"
                            onClick={() => navigate(item.path)}
                            className={cn(
                              "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
                              !open && "justify-center p-2", // Center icon when collapsed
                            )}
                          >
                            <item.icon className="h-5 w-5" />
                            <span className={cn(!open && "hidden")}>{item.label}</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          align="center"
                          hidden={open}
                        >
                          {item.label}
                        </TooltipContent>
                      </Tooltip>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div data-testid="sidebar-footer" className="border-t border-white/10 p-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-white/70 hover:text-white"
              onClick={logout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              <span className={cn(!open && "hidden")}>Log out</span>
            </Button>
          </div>
          <button
            data-testid="sidebar-toggle"
            onClick={toggleSidebar}
            className={cn(
              "absolute right-0 top-0 flex h-full items-center justify-center px-2 transition-transform",
              open ? "translate-x-full" : "translate-x-0"
            )}
            aria-label="Toggle Sidebar"
          >
            <PanelLeft
              className={cn(
                "h-6 w-6 text-primary transition-transform",
                open ? "rotate-180" : "rotate-0"
              )}
            />
          </button>
        </div>
      </TooltipProvider>
    );
  };

  export default AppSidebar;
