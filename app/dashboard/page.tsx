import { currentUser } from "@clerk/nextjs/app-beta";

export default async function Page() {
  const user = await currentUser();

  return (
    <main>
      <h2>Dashboard</h2>
      <p>Hello there {user?.firstName}!</p>
    </main>
  );
}
