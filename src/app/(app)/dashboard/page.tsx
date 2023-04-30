"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "~/lib/user";

export default function Page() {
  const user = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  if (user.isLoading) return <p>Loading...</p>;
  if (user.isError) return <p>Error</p>;

  return (
    <div className="flex w-full flex-col gap-2">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <p>
        Hey there{user.data.name ? " " + user.data.name : ""}! Your user id is{" "}
        <span className="rounded-lg bg-zinc-800/75 px-2 py-1 font-mono text-sm text-zinc-300">
          {user.data.id}
        </span>{" "}
        .
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est officiis
        sequi architecto, delectus sapiente obcaecati! Pariatur assumenda
        voluptas alias, ad eum nulla dolor facere nam laborum, nihil ex ea
        recusandae.
      </p>
    </div>
  );
}
