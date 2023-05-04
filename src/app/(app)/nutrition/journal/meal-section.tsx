import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  IconCalendarEvent,
  IconDots,
  IconPointFilled,
  IconRotate,
} from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Meal, NutritionJournalEntry } from "~/lib/nutrition-journal";
import { CreateEntryForm } from "./create-entry-form";
import { RemoveEntryButton } from "./remove-entry-button";

export function MealSection({
  meal,
  entries,
}: {
  meal: Meal;
  entries: NutritionJournalEntry[];
}) {
  const calorieSum = entries.reduce((sum, entry) => sum + entry.calories, 0);
  const [animateRef] = useAutoAnimate();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2">
        <div className="flex items-end gap-2">
          <h1 className="text-2xl font-bold">
            {meal.slice(0, 1).toUpperCase() + meal.slice(1).toLowerCase()}
          </h1>
          <span className="pb-0.5 italic text-zinc-500">
            {calorieSum} calories
          </span>
        </div>
        <DotsButton />
      </div>

      <div className="flex flex-col gap-1 pl-4" ref={animateRef}>
        {entries
          .filter((entry) => entry.meal === meal)
          .map((entry) => (
            <div className="flex items-center gap-2" key={entry.id}>
              <IconPointFilled size={12} />

              <span>
                {entry.name}, {entry.calories} calories
              </span>

              <RemoveEntryButton entryId={entry.id} />
            </div>
          ))}
      </div>

      <CreateEntryForm meal={meal} />
    </div>
  );
}

function DotsButton() {
  // there's gotta be a better name for this state
  const [copyToOrFrom, setCopyToOrFrom] = useState<"to" | "from">("to");

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-1">
            <IconDots size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuItem className="cursor-pointer">
            <IconRotate className="mr-2 h-4 w-4 rotate-180" />
            <span>Copy from Yesterday</span>
          </DropdownMenuItem>

          <DialogTrigger asChild>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setCopyToOrFrom("from")}
            >
              <IconCalendarEvent className="mr-2 h-4 w-4" />
              <span>Copy from Date</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DialogTrigger asChild>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setCopyToOrFrom("to")}
            >
              <IconCalendarEvent className="mr-2 h-4 w-4" />
              <span>Copy to Date</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog for copy from date and copy to date option */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Copy {copyToOrFrom} Date</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Meal
            </Label>
            <Input id="name" className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Date
            </Label>
            <Input id="username" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
