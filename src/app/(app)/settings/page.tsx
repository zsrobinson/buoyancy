import { getCurrentUser } from "~/lib/auth";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { db } from "~/lib/db";
import { revalidatePath } from "next/cache";

export default async function Page() {
  const user = await getCurrentUser();

  async function updatePreferences(fd: FormData) {
    "use server";
    const nickName = fd.get("nickName") as string;
    await db.user.update({ where: { id: user.id }, data: { nickName } });
    revalidatePath("/settings");
  }

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <h2 className="text-2xl font-semibold">Settings</h2>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">User Preferences</h3>
        <form
          className="flex flex-col items-start gap-4"
          action={updatePreferences}
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="nickName">Nickname</Label>
            <Input
              name="nickName"
              placeholder={user.nickName ?? user.name ?? ""}
            />
          </div>

          <div className="flex gap-4">
            <Button variant="secondary">Submit</Button>
            <Button variant="ghost" type="reset">
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
