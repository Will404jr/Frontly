import Accordian from "./components/accordian";
import { CalendarDemo } from "./components/calender";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { ModeToggle } from "./components/theme-toggle";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#f1efe7]">
      <Navbar />
      {/* Content Area */}
      <div className="flex flex-grow w-full space-x-6 p-5">
        <div className="flex flex-col w-1/4 h-full p-4 shadow-lg">
          {/* Future component will go here */}
        </div>

        {/* Second Column */}
        <div className="flex flex-col items-center flex-grow p-4 shadow-lg">
          <div className="w-full max-w-md h-full">
            <Accordian />
          </div>
        </div>

        {/* Third Column */}
        <div className="flex flex-col w-1/4 h-full p-4 shadow-lg items-center">
          <CalendarDemo />
        </div>
      </div>
      <Footer />
    </main>
  );
}
