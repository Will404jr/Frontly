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

function Navbar() {
  return (
    <header className="bg-white text-primary-foreground py-2 px-6 flex items-center justify-between shadow-lg max-w-[1300px] pt-3 mx-20 rounded-lg">
      <span className="text-lg font-semibold text-green-700">
        <i>Frontly</i>
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar className="h-8 w-8">
              {" "}
              {/* Adjust avatar size here */}
              <AvatarImage
                src="https://res.cloudinary.com/dzuu1kacl/image/upload/v1722798697/user-icon-front-side-white-background_auazud.jpg"
                alt="Avatar"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="font-medium">Jinja Road Branch</span>
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
