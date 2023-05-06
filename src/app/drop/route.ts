import { NextResponse } from "next/server";
import { db } from "~/lib/db";

export async function GET() {
  const user = await db.user.deleteMany();
  const account = await db.account.deleteMany();
  const session = await db.session.deleteMany();
  return NextResponse.json({ user, account, session });
}
