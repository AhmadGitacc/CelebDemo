
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { format, addMonths } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

interface BookingCalendarProps {
  availableDates?: Date[];
  onSelectDate?: (date: Date | undefined) => void;
  onSelectTime?: (time: string) => void;
  onBook?: (date: Date | undefined, time: string) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  availableDates,
  onSelectDate,
  onSelectTime,
  onBook,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Mock available time slots
  const availableTimeSlots = [
    '09:00 AM', 
    '10:00 AM', 
    '11:00 AM', 
    '01:00 PM', 
    '02:00 PM', 
    '03:00 PM', 
    '04:00 PM',
    '07:00 PM',
    '08:00 PM',
  ];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (onSelectDate) onSelectDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (onSelectTime) onSelectTime(time);
  };

  const handleBookNow = () => {
    if (onBook) onBook(selectedDate, selectedTime);
  };

  // Function to determine if a date should be disabled
  const disabledDays = (date: Date) => {
    // If availableDates is provided, only those dates are enabled
    if (availableDates && availableDates.length > 0) {
      return !availableDates.some(
        (availableDate) =>
          availableDate.getDate() === date.getDate() &&
          availableDate.getMonth() === date.getMonth() &&
          availableDate.getFullYear() === date.getFullYear()
      );
    }
    
    // Disable past dates
    return date < new Date(new Date().setHours(0, 0, 0, 0));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center">
          <CalendarIcon className="h-5 w-5 text-accent mr-2" />
          <Label className="text-base font-medium">Select Date</Label>
        </div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          disabled={disabledDays}
          className="rounded-md border p-3 pointer-events-auto"
          initialFocus
          fromDate={new Date()}
          toDate={addMonths(new Date(), 6)}
        />
      </div>

      {selectedDate && (
        <div className="space-y-2 animate-fade-in">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-accent mr-2" />
            <Label className="text-base font-medium">Select Time</Label>
          </div>
          <Select value={selectedTime} onValueChange={handleTimeSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a time slot" />
            </SelectTrigger>
            <SelectContent>
              {availableTimeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedDate && selectedTime && (
        <div className="pt-2 animate-fade-in">
          <div className="bg-muted p-4 rounded-lg mb-4">
            <h4 className="font-medium mb-2">Booking Summary</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Date:</div>
              <div>{format(selectedDate, 'MMMM d, yyyy')}</div>
              <div className="text-muted-foreground">Time:</div>
              <div>{selectedTime}</div>
            </div>
          </div>
          <Button 
            className="w-full" 
            onClick={handleBookNow}
          >
            Confirm & Proceed
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
