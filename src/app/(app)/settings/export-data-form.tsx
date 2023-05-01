"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
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

      <div className="flex gap-4">
        <Button variant="secondary" type="submit">
          Export
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" type="button">
              Learn More
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>About Exporting Your Data</DialogTitle>
            </DialogHeader>
            <p className="text-zinc-400">
              Your data is securely stored within your browser&apos;s local
              storage, which means it is not saved on any external servers. To
              ensure the safety of your data or transfer it to another device,
              you can export it as a JSON file. Although your data will remain
              in local storage even when you close your browser, we recommend
              creating backups to avoid accidental loss due to clearing the
              browser cache or local storage. Please note that exporting the
              data will not delete it from your current device.
            </p>
          </DialogContent>
        </Dialog>
      </div>
      {errorMessage && <p className="italic text-zinc-500">{errorMessage}</p>}
    </form>
  );
}
