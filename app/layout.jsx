import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";

// const inter = Inter({ subsets: ["latin"] });

const nunito_init = Nunito({
  subsets: ["latin"],
  weight: ["200", "700"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <>
        <html lang="en" suppressHydrationWarning>
          <head />
          <body className={nunito_init.variable}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </body>
        </html>
      </>
    </ClerkProvider>
  );
}