"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LocateIcon, MailIcon, PhoneIcon } from "../icons";

export default function Contact() {
  return (
    <div className="container mx-auto my-12 grid grid-cols-1 gap-8 md:grid-cols-2 bg-[#334155]">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-white">Connect with us</h2>
        <p className="text-muted-foreground text-lg text-white">
          We're here to help you with any questions or concerns you may have.
          Don't hesitate to reach out!
        </p>
        <div className="space-y-2 text-white">
          <div className="flex items-center gap-3">
            <PhoneIcon className="h-6 w-6 text-primary" />
            <div>
              <div className="font-medium">Phone</div>
              <div className="text-muted-foreground">(123) 456-7890</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MailIcon className="h-6 w-6 text-primary" />
            <div>
              <div className="font-medium">Email</div>
              <div className="text-muted-foreground">info@example.com</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LocateIcon className="h-6 w-6 text-primary" />
            <div>
              <div className="font-medium">Address</div>
              <div className="text-muted-foreground">
                123 Main St, Anytown USA
              </div>
            </div>
          </div>
        </div>
      </div>
      <Card className="p-6 rounded-xl bg-[#f9fafb] text-black">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Get in Touch</CardTitle>
          <CardDescription>
            Fill out the form below and we'll get back to you as soon as
            possible.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-black">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                className="bg-white border-none"
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                className="bg-white border-none"
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="bg-white border-none"
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Your message..."
              className="min-h-[100px] bg-white border-none"
            />
          </div>
          <Button type="submit" className="w-full bg-[#6366f1] text-white">
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
