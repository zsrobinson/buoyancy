"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { camelCaseToTitleCase } from "~/lib/utils";

export function ImportDataForm() {
  const [fileKeys, setFileKeys] = useState<string[]>([]);
  const [fileContents, setFileContents] = useState<object | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

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
        } else if (fileContents === null) {
          setErrorMessage("Please upload the file.");
          return;
        }

        for (let key of keys) {
          const data = fileContents[key as keyof typeof fileContents];
          console.log("setting the following key:", key, data);
          localStorage.setItem(key, data);
        }

        window.location.reload();
      }}
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="file">Buoyancy Data File</Label>
        <Input
          id="file"
          type="file"
          onInput={() => {
            const input = document.getElementById("file") as HTMLInputElement;
            if (!input.files) return;

            const file = input.files[0];
            const reader = new FileReader();

            reader.addEventListener("load", () => {
              const data = JSON.parse(reader.result as string);
              setFileContents(data);

              const keys = Object.keys(data);
              setFileKeys(keys);
            });

            reader.readAsText(file);
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Categories</Label>
        {fileKeys.length > 0 ? (
          fileKeys.map((key) => (
            <div className="flex items-center space-x-2" key={key}>
              <Checkbox id={"import-" + key} name={key} defaultChecked={true} />
              <Label htmlFor={"import-" + key} className="font-normal">
                {camelCaseToTitleCase(key)}
              </Label>
            </div>
          ))
        ) : (
          <p className="text-sm italic text-zinc-500">
            Please upload a file to select the categories.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="secondary"
                type="button"
                disabled={fileKeys.length < 1}
              >
                Import
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              </AlertDialogHeader>
              <p className="text-zinc-400">
                This action will replace the existing data in the selected
                categories with the imported information. Please confirm if
                you&apos;d like to proceed.
              </p>
              <AlertDialogFooter>
                <AlertDialogAction
                  onClick={() => formRef.current?.requestSubmit()}
                >
                  Confirm
                </AlertDialogAction>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {errorMessage && (
          <p className="text-sm italic text-red-300">{errorMessage}</p>
        )}
      </div>
    </form>
  );
}
