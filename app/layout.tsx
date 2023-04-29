import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata = { title: "Buoyancy" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-50">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
