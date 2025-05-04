
    import React, { useState } from 'react';
    import { format } from 'date-fns';
    import { Calendar as CalendarIcon, Clock } from 'lucide-react';
    import { cn } from '@/lib/utils';
    import { Button } from '@/components/ui/button';
    import { Calendar } from '@/components/ui/calendar';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import {
      Popover,
      PopoverContent,
      PopoverTrigger,
    } from '@/components/ui/popover';

    export function DateTimePicker({ date, setDate, className }) {
      const [calendarOpen, setCalendarOpen] = useState(false);
      const [timeValue, setTimeValue] = useState(date ? format(date, 'HH:mm') : '10:00');

      const handleDateSelect = (selectedDay) => {
        if (!selectedDay) return;

        const [hours, minutes] = timeValue.split(':').map(Number);
        const newDate = new Date(selectedDay);
        newDate.setHours(hours, minutes);
        setDate(newDate);
        setCalendarOpen(false); // Close popover after selecting date
      };

      const handleTimeChange = (e) => {
        const newTime = e.target.value;
        setTimeValue(newTime);

        if (!date) return; // Don't update date if it's not set yet

        const [hours, minutes] = newTime.split(':').map(Number);
        const newDate = new Date(date); // Start with existing date
        newDate.setHours(hours || 0, minutes || 0); // Update time, handle potential NaN
        setDate(newDate);
      };

      return (
        <div className={cn("grid gap-2", className)}>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className="relative">
             <Label htmlFor="time" className="sr-only">Time</Label>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 transform pointer-events-none">
                 <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
             <Input
               id="time"
               type="time"
               value={timeValue}
               onChange={handleTimeChange}
               className="pl-10" // Add padding for the icon
             />
           </div>
        </div>
      );
    }
  