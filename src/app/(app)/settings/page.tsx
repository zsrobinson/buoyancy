"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { BasicErrorScreen } from "~/components/basic-error-screen";
import { BasicLoadingScreen } from "~/components/basic-loading-screen";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { getUser, updateUser } from "~/lib/user";

export default function Page() {
  const queryClient = useQueryClient();

  const formRef = useRef<HTMLFormElement>(null);

  const user = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      formRef.current?.reset();
    },
  });

  if (user.isLoading) return <BasicLoadingScreen />;
  if (user.isError) return <BasicErrorScreen />;

  return (
    <div className="flex flex-col gap-4">
      <form
        className="flex flex-col items-start gap-4"
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const { name } = Object.fromEntries(formData) as {
            name: string;
          };

          mutate({ ...user.data, name });
        }}
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Preferred Name</Label>
          <Input name="name" placeholder={user.data.name} />
        </div>

        <div className="flex gap-4">
          <Button variant="default">Submit</Button>
          <Button variant="secondary" type="reset">
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
