import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Edit3, PieChart, ArrowRight } from "lucide-react";

export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <CheckCircle className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold">ProductivityPro</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Boost Your Productivity with ProductivityPro
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Manage your todos, take notes, and track your finances - all
                  in one place.
                </p>
              </div>
              <div className="space-x-4">
                <Button variant="secondary" size="lg">
                  Get Started
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Todo Management</h3>
                <p className="text-muted-foreground">
                  Stay organized with our powerful todo list feature. Create,
                  prioritize, and track your tasks effortlessly.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Edit3 className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Note Taking</h3>
                <p className="text-muted-foreground">
                  Capture your ideas and important information with our
                  intuitive note-taking system. Access your notes from anywhere.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <PieChart className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Finance Tracking</h3>
                <p className="text-muted-foreground">
                  Take control of your finances. Track expenses, set budgets,
                  and visualize your spending habits with ease.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Boost Your Productivity?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Join thousands of users who have transformed their daily
                  workflow with ProductivityPro.
                </p>
              </div>
              <Button size="lg" className="mt-4">
                Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2023 ProductivityPro. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
