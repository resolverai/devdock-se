import React, { ReactNode } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "@rainbow-me/rainbowkit/styles.css";
// import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
// import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = getMetadata({
  title: "Scaffold-ETH 2 App",
  description: "Built with 🏗 Scaffold-ETH 2",
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <UserProvider>
        <body>{children}</body>
      </UserProvider>
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
