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
} from "lucide-react";

export default function Component({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession(); // Fetch session data
  const router = useRouter();
  const pathname = usePathname();
  const [activeMenuItem, setActiveMenuItem] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push("/login"); // Redirect if there's no session
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

  // While loading or no session, display nothing
  if (status === "loading" || !session) {
    return null; // Can also render a loading spinner here if desired
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside
        className={`bg-[#ffffff] w-60 flex-col border-r bg-card p-6 sm:flex ${
          isMobileMenuOpen ? "block" : "hidden"
        } sticky top-0 h-screen justify-between`}
      >
        <div>
          <Link
            className="flex items-center justify-center text-[#6366f1] pb-5"
            href="#"
          >
            <CheckCircle className="h-6 w-6 text-primary" />
            <span className="ml-2 text-3xl font-bold">frontly</span>
          </Link>
          <nav className="flex flex-col gap-2">
            <Link
              href="/dashboard/home"
              onClick={() => handleMenuItemClick("home")}
              className={`flex items-center text-black gap-2 px-3 py-2 text-sm font-medium transition-transform hover:text-lg hover:bg-muted hover:text-black hover:text-foreground ${
                activeMenuItem === "home"
                  ? "bg-gray-200 text-black rounded-xl"
                  : "rounded-md"
              }`}
            >
              <HomeIcon className="h-5 w-5" />
              Home
            </Link>
            <Link
              href="/dashboard/todo"
              onClick={() => handleMenuItemClick("todo")}
              className={`flex items-center text-black gap-2 px-3 py-2 text-sm font-medium transition-transform hover:text-lg hover:bg-muted hover:text-black hover:text-foreground ${
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
              className={`flex items-center text-black gap-2 px-3 py-2 text-sm font-medium transition-transform hover:text-lg hover:bg-muted hover:text-black hover:text-foreground ${
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
              className={`flex items-center text-black gap-2 px-3 py-2 text-sm font-medium transition-transform hover:text-lg hover:bg-muted hover:text-black hover:text-foreground ${
                activeMenuItem === "financeTracker"
                  ? "bg-gray-200 text-black rounded-xl"
                  : "rounded-md"
              }`}
            >
              <BarChartIcon className="h-5 w-5" />
              Finance
            </Link>
          </nav>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-3 text-black">
            <User className="h-6 w-6" />
            <p className="text-sm font-medium mt-1">{session.user?.email}</p>
          </div>

          <Button
            variant="destructive"
            className="w-full mt-2 bg-red-600 text-white rounded-md"
            onClick={() => signOut()}
          >
            Logout
          </Button>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <main className="flex-1 overflow-y-auto px-4 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
