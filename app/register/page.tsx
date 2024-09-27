import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import RegisterForm from "./form";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <section className="w-full h-screen flex">
      {/* Left side - Register form, full screen on small devices */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-white">
        <div className="w-[500px] bg-[#dcdcdc] p-5 rounded-xl">
          <RegisterForm />
        </div>
      </div>

      {/* Right side - Image (hidden on small screens) */}
      <div className="hidden md:block w-1/2 h-full relative">
        <Image
          src="https://res.cloudinary.com/dzuu1kacl/image/upload/v1726061283/4068218_d2jlpi.jpg"
          alt="Register Image"
          fill
          className="object-cover"
          sizes="50vw"
        />
      </div>
    </section>
  );
};

export default Page;
