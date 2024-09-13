"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          {/* <h1>{JSON.stringify(session)}</h1> */}
          <img
            src={session.user?.image as string}
            className="rounded-full h-20 w-20"
          ></img>
          <h1>Welcome back, {session.user?.name}</h1>
          <button
            onClick={() => signOut()}
            className="border border-black rounded-lg"
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <h1 className="text-3xl text-red-700 font-bold">
            You're not logged in
          </h1>
          <div className="flex space-x-5 py-2">
            <button
              onClick={() => signIn("google")}
              className="border border-black rounded-lg"
            >
              Sign in with Google
            </button>
            <button
              onClick={() => signIn("github")}
              className="border border-black rounded-lg"
            >
              Sign in with Github
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
