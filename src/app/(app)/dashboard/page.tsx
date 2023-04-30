import { currentUser } from "@clerk/nextjs/app-beta";

export default async function Page() {
  const user = await currentUser();

  return (
    <div className="flex w-full flex-col gap-2">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <p>
        Hey there {user?.firstName}! Your user id is{" "}
        <span className="rounded-lg bg-zinc-800/75 px-2 py-1 font-mono text-sm text-zinc-300">
          {user?.id}
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
