import { PickerButtons } from "./picker-buttons";

type LayoutProps = { children: React.ReactNode };
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex max-w-min flex-col gap-4">
      <PickerButtons />
      {children}
    </div>
  );
}
