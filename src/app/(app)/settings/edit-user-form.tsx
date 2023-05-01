"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { User, updateUser } from "~/lib/user";

export function EditUserForm({ user }: { user: User }) {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      formRef.current?.reset();
    },
  });

  return (
    <form
      className="flex flex-col items-start gap-4"
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { name } = Object.fromEntries(formData) as {
          name: string;
        };

        mutate({ ...user, name });
      }}
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name">Preferred Name</Label>
        <Input name="name" placeholder={user.name} />
      </div>

      <div className="flex gap-4">
        <Button variant="secondary">Submit</Button>
        <Button variant="ghost" type="reset">
          Reset
        </Button>
      </div>
    </form>
  );
}
