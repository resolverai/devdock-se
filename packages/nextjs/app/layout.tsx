import React, { ReactNode } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

interface RootLayoutProps {
  children: ReactNode;
}

// Metadata configuration for the app
export const metadata = getMetadata({
  title: "Scaffold-ETH 2 App",
  description: "Built with 🏗 Scaffold-ETH 2",
});

// Main layout of the app
const ScaffoldEthApp = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
};

export default ScaffoldEthApp;