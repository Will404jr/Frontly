"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  HomeIcon,
  LayoutGridIcon,
  CalendarIcon,
  BarChartIcon,
  User,
  CheckCircle,
  Bell,
  Menu,
} from "lucide-react";

export default function Component({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [activeMenuItem, setActiveMenuItem] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

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

  if (status === "loading" || !session) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Sidebar */}
      <aside
        className={`bg-[#334155] border-none w-60 flex-col p-6 sm:flex ${
          isMobileMenuOpen ? "block" : "hidden"
        } sticky top-0 h-screen justify-between lg:block`}
      >
        <div className="flex flex-col h-full">
          <div>
            <Link
              className="flex items-center justify-center text-white pb-5"
              href="#"
            >
              <CheckCircle className="h-6 w-6 text-primary" />
              <span className="ml-2 text-3xl font-bold">frontly</span>
            </Link>
            <nav className="flex flex-col gap-2">
              <Link
                href="/dashboard/home"
                onClick={() => handleMenuItemClick("home")}
                className={`flex items-center text-white gap-2 px-3 py-2 text-sm font-medium transition-transform hover:text-lg hover:bg-muted hover:text-black hover:text-foreground ${
                  activeMenuItem === "home"
                    ? "bg-[#6366f1] text-black rounded-xl"
                    : "rounded-md"
                }`}
              >
                <HomeIcon className="h-5 w-5" />
                Home
              </Link>
              <Link
                href="/dashboard/todo"
                onClick={() => handleMenuItemClick("todo")}
                className={`flex items-center text-white gap-2 px-3 py-2 text-sm font-medium transition-transform hover:text-lg hover:bg-muted hover:text-black hover:text-foreground ${
                  activeMenuItem === "todo"
                    ? "bg-[#6366f1] text-black rounded-xl"
                    : "rounded-md"
                }`}
              >
                <LayoutGridIcon className="h-5 w-5" />
                Todos
              </Link>
              <Link
                href="/dashboard/notes"
                onClick={() => handleMenuItemClick("notes")}
                className={`flex items-center text-white gap-2 px-3 py-2 text-sm font-medium transition-transform hover:text-lg hover:bg-muted hover:text-black hover:text-foreground ${
                  activeMenuItem === "notes"
                    ? "bg-[#6366f1] text-black rounded-xl"
                    : "rounded-md"
                }`}
              >
                <CalendarIcon className="h-5 w-5" />
                Sticky wall
              </Link>
              <Link
                href="/dashboard/financeTracker"
                onClick={() => handleMenuItemClick("financeTracker")}
                className={`flex items-center text-white gap-2 px-3 py-2 text-sm font-medium transition-transform hover:text-lg hover:bg-muted hover:text-black hover:text-foreground ${
                  activeMenuItem === "financeTracker"
                    ? "text-black bg-[#6366f1]  rounded-xl"
                    : "rounded-md"
                }`}
              >
                <BarChartIcon className="h-5 w-5" />
                Finance
              </Link>
              <Link
                href="/dashboard/journal"
                onClick={() => handleMenuItemClick("journal")}
                className={`flex items-center text-white gap-2 px-3 py-2 text-sm font-medium transition-transform hover:text-lg hover:bg-muted hover:text-black hover:text-foreground ${
                  activeMenuItem === "journal"
                    ? "bg-[#6366f1] text-black rounded-xl"
                    : "rounded-md"
                }`}
              >
                <CalendarIcon className="h-5 w-5" />
                Journal
              </Link>
            </nav>
          </div>

          {/* User Info and Logout Button */}
          <div className="mt-auto">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-3 text-white">
                <User className="h-6 w-6" />
                <p className="text-sm font-medium mt-1">
                  {session.user?.email}
                </p>
              </div>

              <Button
                variant="destructive"
                className="w-full mt-2 bg-red-600 text-white rounded-md"
                onClick={() => signOut()}
              >
                Logout
              </Button>

              <p className="text-xs text-white">
                © 2023 frontly. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Section */}
      <div className="flex flex-1 flex-col">
        {/* Top Section */}
        <header className="flex justify-between items-center px-4 py-2 bg-[#334155] border-b shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-white p-2"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-white">
              Hi, {session.user?.name || "User"}!
            </h1>
          </div>
          <div>
            <Bell className="h-6 w-6 text-white" />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
