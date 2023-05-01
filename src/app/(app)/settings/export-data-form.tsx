"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { camelCaseToTitleCase, downloadJSON } from "~/lib/utils";

export function ExportDataForm() {
  const keys = Object.keys(localStorage).filter(
    (key) => key !== "ally-supports-cache"
  );

  const formRef = useRef<HTMLFormElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <form
      className="flex flex-col items-start gap-4"
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const entries = Object.fromEntries(formData);
        const keys = Object.keys(entries);

        if (keys.length < 1) {
          setErrorMessage("Please select at least one item.");
          return;
        }

        const output: { [k: string]: string } = {};
        for (let key of keys) {
          const item = localStorage.getItem(key);
          if (item) output[key] = item;
        }

        setErrorMessage("");
        downloadJSON(output, `buoyancy-export-${Date.now()}.json`);
      }}
    >
      <div className="flex flex-col gap-2">
        {keys.map((key) => (
          <div className="flex items-center space-x-2" key={key}>
            <Checkbox id={key} name={key} defaultChecked={true} />
            <Label htmlFor={key} className="font-normal">
              {camelCaseToTitleCase(key)}
            </Label>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button variant="secondary">Export</Button>
        {errorMessage && <p className="italic text-zinc-500">{errorMessage}</p>}
      </div>
    </form>
  );
}
