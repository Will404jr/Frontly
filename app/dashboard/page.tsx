"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { JSX, SVGProps } from "react";

export default function Component() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden w-64 flex-col border-r bg-card p-6 sm:flex">
        <div className="mb-6 flex items-center gap-2">
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-bold">Dashboard</span>
        </div>
        <nav className="flex flex-col gap-2">
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <HomeIcon className="h-5 w-5" />
            Home
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <LayoutGridIcon className="h-5 w-5" />
            Analytics
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <CalendarIcon className="h-5 w-5" />
            Calendar
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <SettingsIcon className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-card px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="sm:hidden">
              <MenuIcon className="h-6 w-6" />
            </Button>
            <Input
              type="search"
              placeholder="Search..."
              className="w-full max-w-xs rounded-md bg-muted px-4 py-2 text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <BellIcon className="h-6 w-6" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <img
                    src="/placeholder.svg"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="rounded-full"
                    style={{ aspectRatio: "36/36", objectFit: "cover" }}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1 md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>News Feed</CardTitle>
                <CardDescription>
                  Stay up-to-date with the latest news
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Link
                    href="#"
                    className="group flex flex-col items-start gap-2 rounded-md bg-muted p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
                    prefetch={false}
                  >
                    <img
                      src="/placeholder.svg"
                      alt="News image"
                      className="aspect-[4/3] w-full rounded-md object-cover"
                      width="200"
                      height="120"
                    />
                    <div className="grid gap-1">
                      <h3 className="text-sm font-medium group-hover:underline">
                        New Product Launch
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Learn about our latest product release.
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="group flex flex-col items-start gap-2 rounded-md bg-muted p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
                    prefetch={false}
                  >
                    <img
                      src="/placeholder.svg"
                      alt="News image"
                      className="aspect-[4/3] w-full rounded-md object-cover"
                      width="200"
                      height="120"
                    />
                    <div className="grid gap-1">
                      <h3 className="text-sm font-medium group-hover:underline">
                        Company Expansion
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Read about our latest growth milestone.
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="group flex flex-col items-start gap-2 rounded-md bg-muted p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
                    prefetch={false}
                  >
                    <img
                      src="/placeholder.svg"
                      alt="News image"
                      className="aspect-[4/3] w-full rounded-md object-cover"
                      width="200"
                      height="120"
                    />
                    <div className="grid gap-1">
                      <h3 className="text-sm font-medium group-hover:underline">
                        Industry Trends
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Stay informed about the latest industry trends.
                      </p>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>To-Do List</CardTitle>
                <CardDescription>Manage your daily tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <Checkbox />
                    <span>Finish project proposal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Checkbox />
                    <span>Schedule team meeting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Checkbox />
                    <span>Review marketing strategy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Checkbox />
                    <span>Prepare quarterly report</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Checkbox />
                    <span>Follow up with client</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
                <CardDescription>
                  Overview of your business performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-start gap-1">
                    <div className="text-sm font-medium">Revenue</div>
                    <div className="text-2xl font-bold">$125,000</div>
                    <div className="text-xs text-muted-foreground">
                      +12% from last month
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <div className="text-sm font-medium">Customers</div>
                    <div className="text-2xl font-bold">2,450</div>
                    <div className="text-xs text-muted-foreground">
                      +5% from last month
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <div className="text-sm font-medium">Orders</div>
                    <div className="text-2xl font-bold">1,230</div>
                    <div className="text-xs text-muted-foreground">
                      +8% from last month
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <div className="text-sm font-medium">Conversion Rate</div>
                    <div className="text-2xl font-bold">4.2%</div>
                    <div className="text-xs text-muted-foreground">
                      +0.5% from last month
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

function BellIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function CalendarIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function LayoutGridIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function SettingsIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
