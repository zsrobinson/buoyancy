import { IconCalendarEvent } from "@tabler/icons-react";
import { addDays, format, isSameDay } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

export function CalendarDatePicker({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}) {
  const yesterday = addDays(new Date(Date.now()), -1);
  const today = new Date(Date.now());
  const tomorrow = addDays(new Date(Date.now()), 1);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <IconCalendarEvent className="mr-2 h-4 w-4" />
          {date ? format(date, "PPPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        {/* <div className="flex justify-between gap-1 px-2 pt-2">
          <Button
            variant={date && isSameDay(date, yesterday) ? "default" : "outline"}
            onClick={() => setDate(yesterday)}
            size="sm"
          >
            <span className="text-sm">Yesterday</span>
          </Button>

          <Button
            variant={date && isSameDay(date, today) ? "default" : "outline"}
            onClick={() => setDate(today)}
            size="sm"
          >
            <span className="text-sm">Today</span>
          </Button>

          <Button
            variant={date && isSameDay(date, tomorrow) ? "default" : "outline"}
            onClick={() => setDate(tomorrow)}
            size="sm"
          >
            <span className="text-sm">Tomorrow</span>
          </Button>
        </div> */}

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
