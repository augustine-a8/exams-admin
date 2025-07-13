import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";

interface DatePickerProps {
  onDateRangeChange: (from: Date | null, to: Date | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateRangeChange }) => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [activeInput, setActiveInput] = useState<"from" | "to" | null>(null); // Still useful for internal logic

  const pickerRef = useRef<HTMLDivElement>(null);

  // Helper to format date for display
  const formatDate = (date: Date | null): string => {
    return date
      ? date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";
  };

  // Helper to check if two dates are the same day (ignoring time)
  const isSameDay = useCallback(
    (date1: Date | null, date2: Date | null): boolean => {
      if (!date1 || !date2) return false;
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    },
    []
  );

  // Helper to check if a date is within the selected range
  const isDateInRange = useCallback(
    (date: Date): boolean => {
      if (!fromDate || !toDate) return false;
      const start = new Date(Math.min(fromDate.getTime(), toDate.getTime()));
      const end = new Date(Math.max(fromDate.getTime(), toDate.getTime()));
      return (
        date.getTime() >= start.getTime() && date.getTime() <= end.getTime()
      );
    },
    [fromDate, toDate]
  );

  // Get all days for the current month view (including leading/trailing days from adjacent months)
  const getDaysInMonthView = useCallback((date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const days: Date[] = [];

    // Add days from the previous month to fill the first week
    const startDay = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)
    for (let i = startDay; i > 0; i--) {
      days.push(new Date(year, month, 1 - i));
    }

    // Add days of the current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Add days from the next month to fill the last week
    const totalDays = days.length;
    for (let i = 1; days.length < 42; i++) {
      // Ensure 6 rows (6 * 7 = 42 days)
      days.push(new Date(year, month + 1, i));
    }

    return days;
  }, []);

  // Handle day click
  const handleDayClick = useCallback(
    (day: Date) => {
      if (!fromDate || (fromDate && toDate)) {
        // If no 'from' date or both dates are set, start new selection
        setFromDate(day);
        setToDate(null);
        setActiveInput("to"); // Next click will set 'to' date
      } else if (fromDate && !toDate) {
        // If 'from' date is set, set 'to' date
        if (day.getTime() < fromDate.getTime()) {
          // If clicked day is before 'from' date, swap them
          setToDate(fromDate);
          setFromDate(day);
        } else {
          setToDate(day);
        }
        setShowCalendar(false); // Close calendar after selecting both dates
      }
    },
    [fromDate, toDate]
  );

  // Navigate month
  const changeMonth = useCallback((amount: number) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + amount);
      return newDate;
    });
  }, []);

  // Navigate year
  const changeYear = useCallback((amount: number) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setFullYear(prev.getFullYear() + amount);
      return newDate;
    });
  }, []);

  // Effect to call onDateRangeChange when dates update
  useEffect(() => {
    onDateRangeChange(fromDate, toDate);
  }, [fromDate, toDate, onDateRangeChange]);

  // Click outside to close calendar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
        setActiveInput(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const daysInView = getDaysInMonthView(currentMonth);
  const today = new Date();

  // Determine the text to display on the single button
  const buttonText =
    fromDate && toDate
      ? `${formatDate(fromDate)} - ${formatDate(toDate)}`
      : fromDate
      ? `${formatDate(fromDate)} - Select To Date`
      : "Select Date Range";

  return (
    <div className="relative w-full" ref={pickerRef}>
      <button
        onClick={() => {
          setShowCalendar(true);
          setActiveInput("from");
        }}
        className={cn(
          fromDate === null || toDate === null
            ? "text-[#7f7f7f]"
            : "text-gray-800",
          "w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 transition duration-200 ease-in-out cursor-pointer  placeholder-gray-400 flex flex-row gap-4 items-center justify-between"
        )}
      >
        <span>{buttonText}</span>
        <i className="ri-calendar-2-fill"></i>
      </button>

      {showCalendar && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded-xl shadow-xl mt-2 p-4 w-full sm:w-[300px] md:w-[350px] lg:w-[400px] left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-0">
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 text-gray-700"
              aria-label="Previous Month"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <span className="font-semibold text-lg text-gray-800">
              {currentMonth.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 text-gray-700"
              aria-label="Next Month"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {daysInView.map((day, index) => {
              const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
              const isSelectedFrom = isSameDay(day, fromDate);
              const isSelectedTo = isSameDay(day, toDate);
              const isInRange = isDateInRange(day);
              const isToday = isSameDay(day, today);

              let dayClasses =
                "p-2 rounded-full text-center text-sm cursor-pointer transition-all duration-200 ease-in-out";

              if (!isCurrentMonth) {
                dayClasses += " text-gray-400"; // Days from previous/next month
              } else {
                dayClasses += " text-gray-800 hover:bg-blue-100"; // Days of current month
              }

              if (isToday && !isSelectedFrom && !isSelectedTo) {
                dayClasses += " border-2 border-blue-400 font-bold"; // Today's date
              }

              if (isInRange && !isSelectedFrom && !isSelectedTo) {
                dayClasses += " bg-blue-200"; // Dates within range
              }

              if (isSelectedFrom) {
                dayClasses += " bg-blue-600 text-white font-bold shadow-md"; // From date
                if (
                  isInRange &&
                  toDate &&
                  fromDate &&
                  fromDate.getTime() < toDate.getTime()
                ) {
                  dayClasses += " rounded-r-none"; // For range styling
                }
              }

              if (isSelectedTo) {
                dayClasses += " bg-blue-600 text-white font-bold shadow-md"; // To date
                if (
                  isInRange &&
                  toDate &&
                  fromDate &&
                  fromDate.getTime() < toDate.getTime()
                ) {
                  dayClasses += " rounded-l-none"; // For range styling
                }
              }

              if (
                isSelectedFrom &&
                isSelectedTo &&
                isSameDay(fromDate, toDate)
              ) {
                dayClasses =
                  "p-2 rounded-full text-center text-sm cursor-pointer transition-all duration-200 ease-in-out bg-blue-600 text-white font-bold shadow-md";
              }

              return (
                <div
                  key={index}
                  onClick={() => isCurrentMonth && handleDayClick(day)}
                  className={dayClasses}
                >
                  {day.getDate()}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
