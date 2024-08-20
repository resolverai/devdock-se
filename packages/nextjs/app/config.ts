// @noErrors
import { createConfig, cookieStorage } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";
import { baseSepolia } from "@account-kit/infra";
 
export const config = createConfig(
  {
    // alchemy config
    apiKey: "QHSXhdvHnPMLbRHNHFU7Z0Lsn9nGDyDG", // TODO: add your Alchemy API key - setup your app and embedded account config in the alchemy dashboard (https://dashboard.alchemy.com/accounts)
    chain: baseSepolia, // TODO: specify your preferred chain here and update imports from @account-kit/infra
    ssr: true, // Defers hydration of the account state to the client after the initial mount solving any inconsistencies between server and client state (read more here: https://accountkit.alchemy.com/react/ssr)
    storage: cookieStorage, // persist the account state using cookies (read more here: https://accountkit.alchemy.com/react/ssr#persisting-the-account-state)
  },
  {
    // authentication ui config - your customizations here
    auth: {
      sections: [
        [{ type: "email" }],
        [{ type: "passkey" }, { type: "injected" }],
      ],
      addPasskeyOnSignup: true,
      //@ts-ignore
      showSignInText: true,
    },
  }
);
 
export const queryClient = new QueryClient();