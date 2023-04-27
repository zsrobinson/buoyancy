import { ClerkProvider } from "@clerk/nextjs/app-beta";
import "./globals.css";

export const metadata = {
  title: "Buoyancy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className="scroll-smooth bg-zinc-950 text-zinc-50">
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
