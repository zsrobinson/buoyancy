import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Providers } from "./providers";

export const metadata = { title: "Buoyancy" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark">
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
