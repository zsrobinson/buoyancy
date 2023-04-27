import { NavbarShell } from "@/components/navbar-shell";
import { ScrollButton } from "@/components/scroll-button";
import { SignedIn, SignedOut } from "@clerk/nextjs/app-beta";
import { IconArrowRight, IconHeart } from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex min-h-screen flex-col border-b border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900">
        <NavbarShell>
          <div className="flex items-center gap-4">
            <SignedIn>
              <Link
                href="/dashboard"
                className="rounded-lg bg-zinc-800 px-2 py-1 text-zinc-300"
              >
                Dashboard
              </Link>
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className="rounded-lg bg-zinc-800 px-2 py-1 text-zinc-300"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="rounded-lg bg-zinc-800 px-2 py-1 text-zinc-300"
              >
                Sign Up
              </Link>
            </SignedOut>
          </div>
        </NavbarShell>

        <div className="mx-auto flex max-w-6xl grow flex-col items-center justify-between gap-8 p-8">
          <div className="flex flex-col items-center gap-12 pt-8 md:flex-row md:pt-24">
            <Description />
            <Definition />
          </div>

          <div className="flex flex-col items-center gap-8">
            <Link
              href="dashboard"
              className="group flex max-w-fit gap-2 rounded-lg bg-zinc-50 px-4 py-2 text-zinc-950 transition hover:bg-zinc-200"
            >
              Visit Your Dashboard
              <IconArrowRight className="transition group-hover:translate-x-1" />
            </Link>
            <ScrollButton />
          </div>
        </div>
      </div>

      {/* Second Page */}
      <div className="flex min-h-screen flex-col">
        <Features />
        <Footer />
      </div>
    </div>
  );
}

function Description() {
  return (
    <section className="flex basis-1/2 flex-col gap-4 text-center md:text-left">
      <span className="text-4xl font-bold">
        Don&apos;t make Self Improvement harder than it has to be.
      </span>
      <span className="text-4xl font-bold">
        Do it with{" "}
        <span className="bg-gradient-to-br from-cyan-500 to-purple-500 bg-clip-text text-transparent shadow-cyan-800 drop-shadow-[0_0_24px_#818cf8] transition hover:drop-shadow-[0_0_26px_#60a5fa]">
          Buoyancy.
        </span>
      </span>
    </section>
  );
}

function Definition() {
  return (
    <section className="flex basis-1/2 flex-col gap-2 rounded-lg border border-zinc-800 bg-zinc-950/50 p-8 transition hover:scale-[1.02]">
      <div className="flex items-end gap-3">
        <a
          href="https://www.merriam-webster.com/dictionary/buoyancy"
          target="_blank"
          rel="noopener"
          className="text-4xl underline decoration-zinc-700 underline-offset-[3px] transition hover:decoration-zinc-600"
        >
          buoy·an·cy
        </a>
        <span className="text-xl italic text-zinc-400">noun</span>
      </div>
      <span>1. the property of maintaining a satisfactorily high level</span>
      <span>
        2. the ability to recover quickly from depression or discouragement
      </span>
    </section>
  );
}

function Features() {
  return (
    <div className="mx-auto flex max-w-6xl grow flex-col items-center justify-center gap-8 p-8">
      <h3 className="text-3xl font-semibold">Why Try Buoyancy?</h3>
      <section className="grid h-full grid-cols-1 gap-8 md:grid-cols-3">
        {Array.from(Array(6)).map((_, i) => (
          <div
            key={i}
            className="flex h-full w-full flex-col gap-2 rounded-lg border border-zinc-800 bg-zinc-950 p-4 transition hover:scale-[1.02] hover:bg-zinc-900/50 hover:shadow-lg hover:shadow-zinc-700/20"
          >
            <h3 className="text-xl">Amazing Feature #{i + 1}</h3>
            <span className="text-zinc-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur perferendis itaque quaerat, qui laborum eius id, quod
              enim aliquam suscipit ducimus porro libero nisi consectetur?
              Placeat enim tempora consectetur ducimus.
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}

function Footer() {
  return (
    <div className="border-t border-zinc-800 bg-zinc-900/75 text-zinc-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 p-4 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center justify-center gap-1 md:justify-normal">
          Made with <IconHeart size={20} /> by{" "}
          <a
            href="https://zsrobinson.com"
            target="_blank"
            rel="noopener"
            className="underline decoration-zinc-500 underline-offset-2 transition-all hover:text-zinc-50 hover:decoration-zinc-400"
          >
            Zachary Robinson
          </a>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <span className="flex items-center gap-1">
            Visit this project on
            <a
              href="https://github.com/zsrobinosn/buoyancy"
              target="_blank"
              rel="noopener"
              className="underline decoration-zinc-500 underline-offset-2 transition-all hover:text-zinc-50 hover:decoration-zinc-400"
            >
              GitHub
            </a>
          </span>

          <span className="text-sm text-zinc-500">
            Feedback and contributions always appreciated!
          </span>
        </div>
      </div>
    </div>
  );
}
