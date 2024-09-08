"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  HomeIcon,
  LayoutGridIcon,
  CalendarIcon,
  BarChartIcon,
  MenuIcon,
  User,
} from "lucide-react";

export default function Component({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeMenuItem, setActiveMenuItem] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const path = pathname.split("/").pop() || "home";
    setActiveMenuItem(path);
  }, [pathname]);

  const handleMenuItemClick = (menuItem: string) => {
    setActiveMenuItem(menuItem);
    setIsMobileMenuOpen(false);
    router.push(`/dashboard/${menuItem}`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside
        className={`bg-[#ffffff] w-60 flex-col border-r bg-card p-6 sm:flex ${
          isMobileMenuOpen ? "block" : "hidden"
        } sticky top-0 h-screen justify-between`}
      >
        <div>
          <div className="mb-6 flex items-center gap-2">
            <span
              className="text-4xl font-bold pl-5"
              style={{ color: "#2563eb" }}
            >
              <i>frontly</i>
            </span>
          </div>
          <nav className="flex flex-col gap-2">
            <Link
              href="/dashboard/home"
              onClick={() => handleMenuItemClick("home")}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-transform hover:text-lg hover:bg-muted hover:text-foreground ${
                activeMenuItem === "home"
                  ? "bg-gray-200 text-black rounded-md"
                  : "rounded-md"
              }`}
            >
              <HomeIcon className="h-5 w-5" />
              Home
            </Link>
            <Link
              href="/dashboard/todo"
              onClick={() => handleMenuItemClick("todo")}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-transform hover:text-lg hover:bg-muted hover:text-foreground ${
                activeMenuItem === "todo"
                  ? "bg-gray-200 text-black rounded-md"
                  : "rounded-md"
              }`}
            >
              <LayoutGridIcon className="h-5 w-5" />
              Todos
            </Link>
            <Link
              href="/dashboard/notes"
              onClick={() => handleMenuItemClick("notes")}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-transform hover:text-lg hover:bg-muted hover:text-foreground ${
                activeMenuItem === "notes"
                  ? "bg-gray-200 text-black rounded-md"
                  : "rounded-md"
              }`}
            >
              <CalendarIcon className="h-5 w-5" />
              Notes
            </Link>
            <Link
              href="/dashboard/financeTracker"
              onClick={() => handleMenuItemClick("financeTracker")}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-transform hover:text-lg hover:bg-muted hover:text-foreground ${
                activeMenuItem === "financeTracker"
                  ? "bg-gray-200 text-black rounded-md"
                  : "rounded-md"
              }`}
            >
              <BarChartIcon className="h-5 w-5" />
              Finance
            </Link>
          </nav>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-3">
            {" "}
            {/* <img
            src="/placeholder.svg"
            width={36}
            height={36}
            alt="Avatar"
            className="rounded-full"
            style={{ aspectRatio: "36/36", objectFit: "cover" }}
          /> */}
            <User className="h-6 w-6" />
            <p className="text-sm font-medium mt-1">wjr46269@gmail.com</p>
          </div>

          <Button
            variant="destructive"
            className="w-full mt-2 bg-red-600 text-white rounded-md"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        {/* <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-card px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={toggleMobileMenu}
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
        </header> */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
