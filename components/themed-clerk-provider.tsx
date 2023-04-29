import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { dark } from "@clerk/themes";

type ThemedClerkProviderProps = { children: React.ReactNode };
export function ThemedClerkProvider({ children }: ThemedClerkProviderProps) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorBackground: "#141418",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
