import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toTitleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function camelCaseToTitleCase(camelCaseStr: string): string {
  if (!camelCaseStr) return "";
  return camelCaseStr
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (firstChar) => firstChar.toUpperCase());
}

export function downloadJSON(jsonData: object, fileName = "data.json") {
  // Convert the JSON object to a JSON string and create a Blob with the data
  const jsonString = JSON.stringify(jsonData, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });

  // Create a temporary anchor element and set the download attributes
  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(blob);
  anchor.download = fileName;

  // Append the anchor to the document, trigger the download, and remove the anchor
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  // Revoke the object URL to free up memory
  URL.revokeObjectURL(anchor.href);
}
