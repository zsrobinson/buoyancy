"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Meal, NutritionJournalEntry } from "@prisma/client";
import {
  IconCalendarEvent,
  IconDots,
  IconPlus,
  IconPointFilled,
  IconRotate,
  IconX,
} from "@tabler/icons-react";
import { useRef, useState } from "react";
import { useZact } from "zact/client";
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
import { createEntry, deleteEntry } from "./actions";

export function MealSection({
  meal,
  entries,
  createEntryAction,
  deleteEntryAction,
}: {
  meal: Meal;
  entries: NutritionJournalEntry[];
  createEntryAction: typeof createEntry;
  deleteEntryAction: typeof deleteEntry;
}) {
  const { mutate: createEntryMutation, isLoading: createEntryIsLoading } =
    useZact(createEntryAction);
  const { mutate: deleteEntryMutation } = useZact(deleteEntryAction);

  const calorieSum = entries.reduce((sum, entry) => sum + entry.calories, 0);
  const formRef = useRef<HTMLFormElement>(null);
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
        {entries.map((entry) => (
          <div className="flex items-center gap-2" key={entry.id}>
            <IconPointFilled size={12} />

            <span>
              {entry.name}, {entry.calories} calories
            </span>

            <IconX
              size={16}
              className="cursor-pointer text-zinc-500 transition hover:text-zinc-300"
              onClick={() => {
                deleteEntryMutation({ id: entry.id });
              }}
            />
          </div>
        ))}
      </div>

      <form
        className="flex items-center gap-2 pl-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const name = fd.get("name") as string;
          const calories = parseInt(fd.get("calories") as string);

          await createEntryMutation({
            name,
            calories,
            meal,
            date: new Date().toISOString(),
          });
          formRef.current?.reset();
        }}
        ref={formRef}
      >
        <IconPlus size={12} stroke={4} />

        <input
          type="text"
          placeholder="Name"
          className="rounded-md bg-zinc-800/40 px-3 py-1 placeholder-zinc-500 transition hover:bg-zinc-800/80 focus:border-zinc-200 focus:bg-zinc-800/90 focus:outline-none"
          name="name"
          disabled={createEntryIsLoading}
        />

        <input
          type="number"
          placeholder="Calories"
          className="rounded-md bg-zinc-800/40 px-3 py-1 placeholder-zinc-500 transition hover:bg-zinc-800/80 focus:border-zinc-200 focus:bg-zinc-800/90 focus:outline-none"
          name="calories"
          disabled={createEntryIsLoading}
        />

        <button
          type="submit"
          className="rounded-md bg-zinc-800/40 px-3 py-1 text-zinc-500 transition hover:bg-zinc-800/80 hover:text-zinc-300 focus:bg-zinc-800/80 focus:outline-none"
          disabled={createEntryIsLoading}
        >
          Add
        </button>
      </form>
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
