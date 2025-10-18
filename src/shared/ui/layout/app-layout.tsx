import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, Package, FolderOpen, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
}

const navItems = [
  { to: "/", label: "Analytics", icon: BarChart3 },
  { to: "/products", label: "Products", icon: Package },
  { to: "/categories", label: "Categories", icon: FolderOpen },
  { to: "/sales", label: "Sales", icon: ShoppingCart },
];

export const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 border-r border-border bg-card">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            InventoryPro
          </h1>
        </div>
        <nav className="px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};
