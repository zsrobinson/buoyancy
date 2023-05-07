"use client";

import {
  IconCalendarEvent,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { addDays, format, isSameDay, parse } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

export function PickerButtons() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [date, setDate] = useState<Date | undefined>();

  useEffect(() => {
    if (searchParams.has("date")) {
      setDate(
        parse(searchParams.get("date")!.replaceAll("-", "/"), "P", new Date())
      );
    } else {
      setDate(new Date());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("updating date", date);
    if (date) {
      router.push(newPath(date));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <div className="flex gap-4">
      <Button
        variant="outline"
        className="p-2"
        onClick={() =>
          setDate((date) => {
            if (date) return addDays(date, -1);
          })
        }
      >
        <IconChevronLeft size={20} className="mr-0.5" />
      </Button>

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
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Button
        variant="outline"
        className="p-2"
        onClick={() =>
          setDate((date) => {
            if (date) return addDays(date, 1);
          })
        }
      >
        <IconChevronRight size={20} className="ml-0.5" />
      </Button>
    </div>
  );
}

function newPath(date: Date) {
  const isToday = isSameDay(date, new Date());
  if (isToday) {
    return "/nutrition/journal";
  } else {
    return `/nutrition/journal?date=${format(date, "P").replaceAll("/", "-")}`;
  }
}
