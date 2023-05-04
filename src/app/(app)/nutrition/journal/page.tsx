"use client";

import { useQuery } from "@tanstack/react-query";
import { BasicErrorScreen } from "~/components/basic-error-screen";
import { BasicLoadingScreen } from "~/components/basic-loading-screen";
import { getNutritionJournalEntries, meals } from "~/lib/nutrition-journal";
import { MealSection } from "./meal-section";
import { useEffect, useState } from "react";
import { CalendarDatePicker } from "./calendar-date-picker";
import { Button } from "~/components/ui/button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { addDays, isSameDay } from "date-fns";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const entries = useQuery({
    queryKey: ["nutritionJournalEntries"],
    queryFn: getNutritionJournalEntries,
  });

  const [date, setDate] = useState<Date>();
  const [animateRef] = useAutoAnimate();

  useEffect(() => {
    setDate(new Date(Date.now()));
  }, []);

  if (entries.isLoading) return <BasicLoadingScreen />;
  if (entries.isError) return <BasicErrorScreen />;

  return (
    <div className="flex max-w-min flex-col gap-4" ref={animateRef}>
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="p-2"
          onClick={() => {
            setDate((date) => {
              if (date) return addDays(date, -1);
            });
          }}
        >
          <IconChevronLeft size={20} className="mr-0.5" />
        </Button>
        <CalendarDatePicker date={date} setDate={setDate} />
        <Button
          variant="outline"
          className="p-2"
          onClick={() => {
            setDate((date) => {
              if (date) {
                return addDays(date, 1);
              }
            });
          }}
        >
          <IconChevronRight size={20} className="ml-0.5" />
        </Button>
      </div>

      {meals.map((meal) => (
        <MealSection
          key={meal}
          meal={meal}
          entries={entries.data.filter(
            (entry) =>
              entry.meal === meal &&
              date &&
              isSameDay(new Date(entry.date), date)
          )}
        />
      ))}
    </div>
  );
}
