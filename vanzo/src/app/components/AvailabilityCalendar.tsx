import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AvailabilityCalendarProps {
  bookedDates: Date[];
  onDateSelect?: (date: Date) => void;
}

export function AvailabilityCalendar({ bookedDates, onDateSelect }: AvailabilityCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateBooked = (day: number) => {
    return bookedDates.some((bookedDate) => {
      return (
        bookedDate.getDate() === day &&
        bookedDate.getMonth() === currentDate.getMonth() &&
        bookedDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const isDatePast = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDayClick = (day: number) => {
    if (!isDateBooked(day) && !isDatePast(day)) {
      const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      onDateSelect?.(selectedDate);
    }
  };

  const monthNames = [
    "Januari", "Februari", "Maart", "April", "Mei", "Juni",
    "Juli", "Augustus", "September", "Oktober", "November", "December"
  ];

  const dayNames = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  const calendarDays = [];
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-12" />);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const booked = isDateBooked(day);
    const past = isDatePast(day);
    const available = !booked && !past;

    calendarDays.push(
      <button
        key={day}
        onClick={() => handleDayClick(day)}
        disabled={booked || past}
        className={`
          h-12 rounded-lg flex items-center justify-center transition-all
          ${available ? "bg-green-100 hover:bg-green-200 text-green-900 cursor-pointer" : ""}
          ${booked ? "bg-red-100 text-red-900 cursor-not-allowed" : ""}
          ${past ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
        `}
      >
        {day}
      </button>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Beschikbaarheid Kalender</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-lg">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div>
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-sm text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays}
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-4 justify-center pt-4 border-t text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-100 border border-green-300" />
              <span>Beschikbaar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-100 border border-red-300" />
              <span>Bezet</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
