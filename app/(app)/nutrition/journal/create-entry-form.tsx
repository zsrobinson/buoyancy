"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useZact } from "zact/client";
import { createEntry } from "./action";

export function CreateEntryForm({ action }: { action: typeof createEntry }) {
  const { mutate, data, isLoading, error } = useZact(action);
  const router = useRouter();

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const { name, calories } = Object.fromEntries(formData) as {
            name: string;
            calories: string;
          };

          await mutate({ name, calories: Number(calories) });
          router.refresh();
        }}
        className="flex gap-4"
      >
        <Input type="text" placeholder="Name" className="w-48" name="name" />
        <Input
          type="number"
          placeholder="Calories"
          className="w-48"
          name="calories"
        />
        <Button type="submit">Create Entry</Button>
      </form>
      {isLoading && <p>Creating entry...</p>}
      {error && <p>Error creating entry: {error.message}</p>}
    </>
  );
}
