import Accordian from "./components/accordian";
import { CalendarDemo } from "./components/calender";
import { ModeToggle } from "./components/theme-toggle";

export default function Home() {
  return (
    <main className="flex min-h-[650px] flex-col pt-5">
      {/* Content Area */}
      <div className="flex w-full space-x-6">
        <div className="flex flex-col w-1/4 h-[600px] p-4 shadow-lg">
          {/* Future component will go here */}
        </div>

        <div className="flex flex-col items-center flex-grow h-[600px] p-4 shadow-lg">
          <div className="w-full max-w-md">
            <Accordian />
          </div>
        </div>
        <div className="flex flex-col w-1/4 h-[600px] p-4 shadow-lg items-center">
          <CalendarDemo />
        </div>
      </div>
    </main>
  );
}
