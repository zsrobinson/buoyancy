"use client";

import { useQuery } from "@tanstack/react-query";
import { BasicErrorScreen } from "~/components/basic-error-screen";
import { BasicLoadingScreen } from "~/components/basic-loading-screen";
import { getUser } from "~/lib/user";
import { EditUserForm } from "./edit-user-form";
import { ExportDataForm } from "./export-data-form";
import { ImportDataForm } from "./import-data-form";

export default function Page() {
  const user = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (user.isLoading) return <BasicLoadingScreen />;
  if (user.isError) return <BasicErrorScreen />;

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <h2 className="text-2xl font-semibold">Settings</h2>
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">User Preferences</h3>
        <EditUserForm user={user.data} />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Export Data</h3>
        <ExportDataForm />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Import Data</h3>
        <ImportDataForm />
      </div>
    </div>
  );
}
