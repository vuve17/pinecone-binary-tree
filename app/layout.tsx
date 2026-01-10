"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "./store/redux-provider";
import GlobalSnackbar from "./components/common/global-snackbar";
import { HelpInstructionsTooltip } from "./components/tutorial/tutorial-tooltip";
import { useState, useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {
          mounted && (
            <>
              <HelpInstructionsTooltip />
              <ReduxProvider>
                <GlobalSnackbar />
                {children}
              </ReduxProvider>
            </>
          )
        }
      </body>
    </html>
  );
}
