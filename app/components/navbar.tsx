"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDownIcon, LogInIcon } from "./icons";
import Image from "next/image";
import logo from "../../public/logo.png";

function Navbar() {
  return (
    <header className="bg-[#f1efe7] text-primary-foreground py-2 px-6 flex items-center justify-between shadow-lg pt-3 rounded-lg">
      <span className="mx-5">
        <h1 className="text-4xl font-black font-serif">frontly</h1>
      </span>
      {/* <Image src={logo} alt="logo" width="200" height="150" /> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer text-black">
            <Avatar className="h-8 w-8">
              {" "}
              {/* Adjust avatar size here */}
              <AvatarImage
                src="https://res.cloudinary.com/dzuu1kacl/image/upload/v1722798697/user-icon-front-side-white-background_auazud.jpg"
                alt="Avatar"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="font-medium text-stone-950">Will Jr</span>
            <ChevronDownIcon className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

export default Navbar;
