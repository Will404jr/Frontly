// app/login/LoginButtons.tsx
"use client";

import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";

const Socials = () => {
  return (
    <div className="flex space-x-5 py-2">
      <button
        onClick={() => signIn("google")}
        className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
      >
        <FaGoogle className="h-5 w-5" />
        Sign in with Google
      </button>
      <button
        onClick={() => signIn("github")}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-300"
      >
        <FaGithub className="h-5 w-5" />
        Sign in with GitHub
      </button>
    </div>
  );
};

export default Socials;
