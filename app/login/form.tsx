"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Socials from "../components/socialAuth";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "This field has to be filled.",
    })
    .email("This is not a valid email")
    .max(300, {
      message: "Password can't be longer than 300 characters.",
    }),
  password: z
    .string()
    .min(6, { message: "Password has to be at least 6 characters long." }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (!response?.error) {
      router.push("/dashboard");
    }

    toast.success("You are now signed in!");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 items-center justify-center"
      >
        <h1 className="text-2xl font-semibold text-black">Login</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  className="bg-white border-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  className="bg-white border-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Socials />
        <Link className="block text-blue-600" href={"/register"}>
          Don't have an account?
        </Link>
        <Button
          type="submit"
          className="bg-[#6366f1] p-5 text-white rounded-xl"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
