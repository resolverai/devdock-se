"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useSignerStatus, useAuthenticate } from "@account-kit/react";
import Profile from "~~/components/Profile";

const Home: NextPage = () => {
  const { account, address, isLoadingAccount } = useAccount({
    type: "LightAccount",
  });
  const { user, isLoading } = useUser();
  const { authenticate, isPending, error } = useAuthenticate({
    onSuccess: () => {
      console.log(account);
      console.log(address);
      setIsAuthenticated(true);
    },
    onError: (error) => console.error(error),
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const { status } = useSignerStatus();
  const isSignerAvailable = status === "SIGNED_IN";

  const login = (email: string) => {
    if (!emailSent && !isSignerAvailable) {
      authenticate({ type: "email", email:email });
      setEmailSent(true);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000); // Hide popup after 5 seconds
    }
  };

  useEffect(() => {
    if (isSignerAvailable) {
      setIsAuthenticated(true);
    } else if (user?.email && !isAuthenticated && !emailSent && !isLoadingAccount && !isSignerAvailable) {
      login(user.email);
    }
  }, [user, isAuthenticated, emailSent, isLoadingAccount, isSignerAvailable]);

  return (
    <>
      {!user ? (
        <>
          <Link href="/api/auth/login" className="link absolute top-4 right-10">
            Login0
            0.0
          </Link>
          {showPopup && (
            <div className="popup">
              Authentication email sent. Please check your inbox.
            </div>
          )}
        </>
      ) : (
        <Profile />
      )}
    </>
  );
};

export default Home;
