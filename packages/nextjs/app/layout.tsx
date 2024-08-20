import React, { ReactNode } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "@rainbow-me/rainbowkit/styles.css";
// import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
// import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";
import { config } from "./config";
import { cookieToInitialState } from "@account-kit/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { Providers } from "./provider"
interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = getMetadata({
  title: "Scaffold-ETH 2 App",
  description: "Built with 🏗 Scaffold-ETH 2",
});

export default function RootLayout({ children }: RootLayoutProps) {
  const initialState = cookieToInitialState(
    config,
    headers().get("cookie") ?? undefined
  );
  return (
    <html lang="en">
      <Providers initialState={initialState}>
      <UserProvider>
        <body>{children}</body>
      </UserProvider>
      </Providers>
    </html>
  );
}
// const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <html suppressHydrationWarning>
//       <body>
//         <ThemeProvider enableSystem>
//           <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// };

// export default ScaffoldEthApp;
