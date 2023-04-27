import { currentUser } from "@clerk/nextjs/app-beta";

export default async function Page() {
  const user = await currentUser();

  return (
    <div className="flex w-full flex-col gap-2 p-4">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <p>Hey there {user?.firstName}, welcome!</p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est officiis
        sequi architecto, delectus sapiente obcaecati! Pariatur assumenda
        voluptas alias, ad eum nulla dolor facere nam laborum, nihil ex ea
        recusandae.
      </p>
    </div>
  );
}
