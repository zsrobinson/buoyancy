import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { dark } from "@clerk/themes";
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
      <ClerkProvider
        appearance={{
          baseTheme: dark,
          variables: {
            colorBackground: "#141418",
          },
        }}
      >
        <body className="bg-zinc-950 text-zinc-50">
          {children}
          <Analytics />
        </body>
      </ClerkProvider>
    </html>
  );
}
