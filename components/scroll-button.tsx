"use client";

import { IconChevronDown } from "@tabler/icons-react";

export function ScrollButton() {
  return (
    <button
      className="group flex max-w-fit flex-col items-center text-zinc-400 transition-all"
      onClick={() => {
        window.scrollTo({
          top: document.documentElement.clientHeight,
          behavior: "smooth",
        });
      }}
    >
      <span className="transition group-hover:text-zinc-200">Learn More</span>
      <IconChevronDown className="transition-all group-hover:translate-y-1 group-hover:text-zinc-50" />
    </button>
  );
}
