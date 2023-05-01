"use client";

import {
  IconBaguette,
  IconMoon,
  IconRun,
  IconSettings,
  IconTable,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export function Sidebar() {
  const pathname = usePathname();
  const tabGroup = pathname.split("/")[1] as
    | "dashboard"
    | "nutrition"
    | "fitness"
    | "sleep"
    | "settings";

  return (
    <div
      className={`flex max-w-min border-r border-zinc-800 transition duration-500 ease-out ${
        tabGroup === "dashboard"
          ? "bg-sky-950/25"
          : tabGroup === "nutrition"
          ? "bg-emerald-950/20"
          : tabGroup === "fitness"
          ? "bg-red-950/20"
          : tabGroup === "sleep"
          ? "bg-violet-950/10"
          : ""
      }`}
    >
      <div className="flex flex-col gap-2 bg-gradient-to-b from-zinc-900 to-transparent p-4 font-medium">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-950/70 p-2 text-blue-400">
            <IconTable size={20} />
          </div>
          <span
            className={`flex h-full items-center rounded-lg px-2 transition ${
              tabGroup === "dashboard" ? "bg-zinc-800/75" : "-translate-x-2"
            }`}
          >
            Dashboard
          </span>
        </Link>

        <Accordion type="single" collapsible defaultValue={tabGroup}>
          <AccordionItem value="nutrition" className="border-b-0">
            <AccordionTrigger className="py-2">
              <div className="flex items-center gap-3 pr-12">
                <div className="rounded-lg bg-emerald-950/70 p-2 text-emerald-400">
                  <IconBaguette size={20} />
                </div>
                <span className="!no-underline">Nutrition</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1 pl-10">
                <SubItem text="Nutrition Journal" href="/nutrition/journal" />
                {/* <SubItem text="Food Database" href="/nutrition/database" /> */}
                <SubItem text="My Foods" href="/nutrition/foods" />
                {/* <SubItem text="My Recipes" href="/nutrition/recipes" /> */}
                <SubItem text="My Meals" href="/nutrition/meals" />
                <SubItem text="Settings" href="/nutrition/settings" />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="fitness" className="border-b-0">
            <AccordionTrigger className="py-2">
              <div className="flex items-center gap-3 pr-12">
                <div className="rounded-lg bg-red-950/70 p-2 text-red-400">
                  <IconRun size={20} />
                </div>
                <span className="!no-underline">Fitness</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1 pl-10">
                <SubItem text="Fitness Journal" href="/fitness/journal" />
                <SubItem text="Exercises" href="/fitness/exercises" />
                <SubItem text="Routines" href="/fitness/routines" />
                <SubItem text="Settings" href="/fitness/settings" />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sleep" className="border-b-0">
            <AccordionTrigger className="py-2">
              <div className="flex items-center gap-3 pr-12">
                <div className="rounded-lg bg-violet-950/70 p-2 text-violet-400">
                  <IconMoon size={20} />
                </div>
                <span className="!no-underline">Sleep</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1 pl-10">
                <SubItem text="Sleep Journal" href="/sleep/journal" />
                <SubItem text="Settings" href="/sleep/settings" />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Link href="/settings" className="flex items-center gap-3">
          <div className="rounded-lg bg-zinc-700/70 p-2 text-zinc-400">
            <IconSettings size={20} />
          </div>
          <span
            className={`flex h-full items-center rounded-lg px-2 transition ${
              tabGroup === "settings" ? "bg-zinc-800/75" : "-translate-x-2"
            }`}
          >
            Settings
          </span>
        </Link>
      </div>
    </div>
  );
}

function SubItem({ text, href }: { text: string; href: string }) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`rounded-lg px-2 py-1 transition ${
        isActive
          ? "bg-zinc-800/75 text-zinc-100"
          : "text-zinc-400 hover:text-zinc-100"
      }`}
    >
      {text}
    </Link>
  );
}
