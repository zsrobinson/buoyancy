import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession();

  return (
    <div>
      <h1>Server Side Page</h1>
      <p>
        <strong>Note:</strong> Has <code>session</code> prop:
      </p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
