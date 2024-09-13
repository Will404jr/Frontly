// app/login/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import LoginForm from "./form";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <section className="w-full h-screen flex">
      {/* Left side - Login form */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-[500px] bg-[#dcdcdc] p-5 rounded-xl">
          <LoginForm />
        </div>
      </div>

      {/* Right side - Image */}
      <div className="w-1/2 h-full">
        <img
          src="https://res.cloudinary.com/dzuu1kacl/image/upload/v1726061283/4068218_d2jlpi.jpg" // Replace with the correct image path
          alt="Login Image"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Page;
