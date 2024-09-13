"use client";

import { useState } from "react";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const schedules = [
    { name: "Leslie Alexander", time: "1:00 PM - 2:30 PM" },
    { name: "Michael Foster", time: "3:00 PM - 4:30 PM" },
    { name: "Dries Vincent", time: "5:00 PM - 6:30 PM" },
    { name: "Lindsay Walton", time: "7:00 PM - 8:30 PM" },
    { name: "Courtney Henry", time: "9:00 PM - 10:30 PM" },
  ];

  const handleDateClick = (day: number) => {
    const today = new Date();
    const date = new Date(today.getFullYear(), today.getMonth(), day);
    setSelectedDate(date);
  };

  return (
    <div className="container mx-auto p-6 flex space-x-6">
      {/* Calendar Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-semibold mb-4">January 2022</h2>
        <div className="grid grid-cols-7 gap-4 text-center">
          {/* Weekdays */}
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <div key={day} className="font-medium text-gray-600">
              {day}
            </div>
          ))}
          {/* Days */}
          {dates.map((day) => (
            <div
              key={day}
              onClick={() => handleDateClick(day)}
              className={`cursor-pointer rounded-full w-10 h-10 flex items-center justify-center
                ${
                  selectedDate?.getDate() === day
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-gray-200"
                }
              `}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-semibold mb-4">
          Schedule for {selectedDate?.toDateString() || "January 21, 2022"}
        </h2>
        <ul className="space-y-4">
          {schedules.map((schedule) => (
            <li key={schedule.name} className="flex items-center space-x-4">
              <img
                src={`https://i.pravatar.cc/40?u=${schedule.name}`}
                alt={schedule.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{schedule.name}</p>
                <p className="text-gray-500 text-sm">{schedule.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;
