"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import { rewardABI, rewardAddres } from "./abi/rewardContract";
import { useAccount,useSignerStatus } from "@account-kit/react";
import Profile from "~~/components/Profile";
import { FormEvent, useCallback } from "react";

import React from "react";
import {
  type UseAuthenticateResult,
  useAuthenticate,
} from "@account-kit/react";



const Home: NextPage = () => {
  const { account, address, isLoadingAccount } = useAccount({
    type: "LightAccount",
  });
  const { user, isLoading } = useUser();
  const { authenticate, authenticateAsync, isPending, error } = useAuthenticate({
    // these are optional
    onSuccess: () => {
    console.log(account)
    console.log(address)
    },
    onError: (error) => console.error(error),
  })
  const [emailSent,setemailSent]=useState(false)
  const [isAuthenticated,setisAuthenticated]=useState(false)
  const [contributionsCount,setcontributionsCount]=useState(0)
  const [tokensEarnedCount,settokensEarnedCount]=useState(0)
  const [chainsContributed,setchainsContributed]=useState(0)
  const [showPopup,setShowPopup]=useState(false)

  const connectedAddress = useAccount({
    type: "LightAccount",
  })
  
  // [!region authenticating]
  const login = (email:string) => {

    authenticate({ type: "email", email });
  };

  const { status } = useSignerStatus();
  const isAwaitingEmail = status === "AWAITING_EMAIL_AUTH";
  // [!endregion authenticating]

  useEffect(() => {
console.log("inside use Effect")
    
    if(connectedAddress.account && connectedAddress.address ){
      console.log(isAuthenticated)
      setisAuthenticated(true)
    }
     
    else if (user?.email && !isAuthenticated) {
      console.log(user.email)
      login(user.email);
    }
  }, [user, connectedAddress.account, isAuthenticated, login]);




  return (
    <>

      {!user ? (
        <>
        <Link href="/api/auth/login" className="link absolute top-4 right-10">
          Login
        </Link>
        {showPopup && (
          <div className="popup">
            Authentication email sent. Please check your inbox.
          </div>
        )}
        </>
      ) : (
        <>
        <Profile />
        </>
      )}
    </>
  );
};

export default Home;

