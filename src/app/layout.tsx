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
      <body className="dark">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
