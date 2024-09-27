"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "./components/ui/spinner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle,
  Edit3,
  PieChart,
  ArrowRight,
  Check,
  Menu,
  X,
} from "lucide-react";
import Pricing from "./components/marketingPage/pricing";
import Contact from "./components/marketingPage/contact";
import email from "next-auth/providers/email";

// Define the types for the FeatureCard props
interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg"
  >
    <Icon className="h-12 w-12 mb-4 text-primary" />
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

// Define the types for the PricingCard props
interface PricingCardProps {
  title: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  features,
  isPopular = false,
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`flex flex-col p-6 bg-white rounded-xl shadow-lg ${
      isPopular ? "border-2 border-primary" : ""
    }`}
  >
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-3xl font-bold mb-4">
      ${price}
      <span className="text-base font-normal">/month</span>
    </p>
    <ul className="mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center mb-2">
          <Check className="h-5 w-5 mr-2 text-primary" />
          {feature}
        </li>
      ))}
    </ul>
    <Button className={isPopular ? "bg-primary text-primary-foreground" : ""}>
      Choose Plan
    </Button>
  </motion.div>
);

export default function EnhancedMarketingPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For the hamburger menu toggle

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center bg-white shadow-sm relative">
        <Link className="flex items-center text-[#6366f1]" href="#">
          <CheckCircle className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold">frontly</span>
        </Link>

        {/* Hamburger Menu Button (Visible on small screens) */}
        <button
          className="ml-auto block lg:hidden text-primary"
          onClick={toggleMenu}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Navbar Links (responsive) */}
        <nav
          className={`${
            menuOpen
              ? "max-h-[500px] transition-all duration-300 ease-in-out"
              : "max-h-0 overflow-hidden"
          } lg:max-h-none lg:flex lg:ml-auto lg:gap-4 lg:flex-row lg:items-center w-full lg:w-auto absolute lg:relative top-16 left-0 lg:top-0 bg-white lg:bg-transparent z-10 lg:z-auto shadow-lg lg:shadow-none`}
        >
          <ul className="flex flex-col lg:flex-row lg:items-center gap-4 p-4 lg:p-0">
            <li>
              <Link
                className="text-sm font-medium hover:text-primary py-2 lg:py-0"
                href="#features"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                className="text-sm font-medium hover:text-primary py-2 lg:py-0"
                href="#pricing"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                className="text-sm font-medium hover:text-primary py-2 lg:py-0"
                href="#faq"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                className="text-sm font-medium hover:text-primary py-2 lg:py-0"
                href="#contact"
              >
                Contact us
              </Link>
            </li>
            <li className="block lg:hidden">
              <Link
                className="text-white bg-[#6366f1] p-2 pl-3 pr-3 rounded-xl"
                href="/login"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>

        {/* Login Button (Visible on large screens) */}
        <Link
          className="hidden lg:block text-white bg-[#6366f1] p-2 pl-3 pr-3 rounded-xl"
          href="/login"
        >
          Login
        </Link>
      </header>

      <main className="flex-1">
        {/* First Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary to-primary-dark bg-[#334155]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-tight">
                    Your All-in-One Productivity Solution
                  </h1>
                  <p className="text-gray-200 md:text-xl max-w-[600px]">
                    Manage tasks, take notes, and track finances seamlessly with
                    ProductivityPro. Boost your efficiency today!
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-black bg-white border-none hover:bg-grey-200 hover:text-primary rounded-lg"
                  >
                    Get started
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Image is larger on small screens now */}
                  <Image
                    alt="ProductivityPro App"
                    src="https://res.cloudinary.com/dzuu1kacl/image/upload/v1725829250/frontly_and_3_more_pages_-_Personal_-_Microsoft_Edge_08_09_2024_23_53_08_kv4urv.png"
                    width={2000}
                    height={1442}
                    className="w-full max-w-[25rem] sm:max-w-[30rem] md:max-w-[35rem] lg:max-w-[40rem] xl:max-w-[48rem] rounded-xl shadow-xl ring-1 ring-gray-400/10"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-6 md:py-12 lg:py-16 bg-[#334155]"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl text-white font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Powerful Features
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-black">
              <FeatureCard
                icon={CheckCircle}
                title="Smart Todo Management"
                description="Create, prioritize, and track your tasks with our intuitive todo system. Stay organized and never miss a deadline."
              />
              <FeatureCard
                icon={Edit3}
                title="Seamless Note Taking"
                description="Capture your ideas and important information instantly. Our note-taking feature syncs across all your devices."
              />
              <FeatureCard
                icon={PieChart}
                title="Comprehensive Finance Tracking"
                description="Take control of your finances with ease. Track expenses, set budgets, and visualize your spending habits."
              />
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="w-full py-6 md:py-12 lg:py-16 bg-[#334155]"
        >
          <Pricing />
        </section>
        <section
          id="faq"
          className="w-full py-6 md:py-12 lg:py-16 bg-[#334155]"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl text-white font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full max-w-3xl mx-auto text-white"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Is there a free trial available?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we offer a 14-day free trial for all new users. You can
                  access all features during this period.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Can I sync my data across devices?
                </AccordionTrigger>
                <AccordionContent>
                  ProductivityPro syncs your data across all your devices in
                  real-time, ensuring you have access to your information
                  wherever you go.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is my data secure?</AccordionTrigger>
                <AccordionContent>
                  We take data security very seriously. All your data is
                  encrypted both in transit and at rest, and we employ
                  industry-standard security measures to protect your
                  information.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section
          id="contact"
          className="w-full py-6 md:py-12 lg:py-16 bg-[#334155]"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl text-white font-bold tracking-tighter sm:text-5xl text-center mb-12">
              What's on your mind ?
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col p-6  rounded-xl shadow-md"
            >
              <Contact />
            </motion.div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#334155]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Ready to Supercharge Your Productivity?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-200 md:text-xl">
                  Join thousands of satisfied users and start your journey to
                  enhanced productivity today.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-white text-black border-none"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="bg-white text-black hover:bg-gray-200 rounded-xl border-none"
                  >
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-gray-200">
                  By signing up, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t text-black bg-white">
        <p className="text-xs text-muted-foreground">
          © 2024 frontly. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Cookie Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
