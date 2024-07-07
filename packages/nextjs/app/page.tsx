"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { rewardABI, rewardAddres } from "./abi/rewardContract";
import { tokenABI, tokenAddres } from "./abi/tokenABI";
import { useUser } from "@auth0/nextjs-auth0/client";
import type { NextPage } from "next";
import { formatEther, formatUnits } from "viem";
import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
// import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Address } from "~~/components/scaffold-eth";
import Profile from "~~/components/Profile";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser();
  // const { address: connectedAddress } = useAccount();

  const [contributionsCount, setContributionsCount] = useState(85);
  const [tokensEarnedCount, setTokensEarnedCount] = useState(17300);
  const [chainsContributed, setchainsContributed] = useState(6);
  const [availableToClaim, setavailableToClaim] = useState(0);
  const [totalPoolBalance, settotalPoolBalance] = useState(0);
  const [tokenCount, setTokenCount] = useState(0);
  const [totalTokens, settotalTokens] = useState(500);
  const [showPopup, setShowPopup] = useState(false);

  const account = privateKeyToAccount("0x63fc625e1c16ac39f1c9601f688f208bc991cc16f2d77b8a22267b8f742a452d");

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  const claimReward = async (claimAmount: number) => {
    const walletClient = createWalletClient({
      account: account,
      chain: sepolia,
      transport: http(),
    });

    const { request } = await publicClient.simulateContract({
      address: rewardAddres,
      abi: rewardABI,
      functionName: "withdraw",
      account: account,
      args: [claimAmount * 10 ** 18],
    });
    await walletClient.writeContract(request);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const getClaimableBalance = async (userAddress: string) => {
    const data = await publicClient.readContract({
      address: rewardAddres,
      abi: rewardABI,
      functionName: "getBalance",
      args: [userAddress],
    });
    return Number(data) * 10 ** -18;
  };

  const getTotalAvailable = async () => {
    const data = await publicClient.readContract({
      address: rewardAddres,
      abi: rewardABI,
      functionName: "getPoolBalance",
    });
    return Number(data) * 10 ** -18;
  };

  const handleClaimTokens = async (tokenCount: number) => {
    await claimReward(tokenCount);
    setTokensEarnedCount(currentCount => currentCount + tokenCount);
    setavailableToClaim(availableToClaim - tokenCount);
  };

  useEffect(() => {
    const set = async () => {
      const totalClaimable = await getClaimableBalance("0x741267166ff2a1721f140B819B6f844F8C7D8d74");
      const totalAvailablePool = await getTotalAvailable();

      if (totalClaimable) setavailableToClaim(Number(totalClaimable));
      if (totalAvailablePool) settotalPoolBalance(Number(totalAvailablePool));
    };
    set();
  }, []);

  return (
    <>
      {!user ? (
        <Link href="/api/auth/login" className="link absolute top-4 right-10">
          Login
        </Link>
      ) : (
        <Profile />
      )}
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <div className="block text-4xl font-bold">
              <div className="inline-block relative w-10 h-10 align-bottom mr-2">
                <Image alt="Base logo" className="cursor-pointer" fill src="/logo.svg" />
              </div>
              Devdock
            </div>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            {/* <Address address={connectedAddress} /> */}
          </div>
        </div>
        <div className="flex flex-col items-center mt-10">
          <input
            type="number"
            value={tokenCount}
            onChange={e => setTokenCount(parseInt(e.target.value, 10))}
            max={totalTokens}
            className="border border-gray-300 rounded px-3 py-2 mb-4 text-black text-right"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 text-black "
            onClick={() => handleClaimTokens(tokenCount)}
          >
            Claim Tokens
          </button>
          <div className="flex justify-around w-full mt-8">
            <div className="bg-blue-200 p-4 rounded-md mx-4">
              <h2 className="text-lg font-semibold text-black text-center">Contracts Deployed</h2>
              <img
                src="/smart-contracts.png"
                alt="Contracts Deployed Image"
                style={{ width: "45px", height: "45px", margin: "0 auto" }}
              />
              <p className="text-xl text-black text-center">{contributionsCount}</p>
            </div>
            <div className="bg-blue-200 p-4 rounded-md mx-4">
              <h2 className="text-lg font-semibold text-black">Tokens Earned</h2>
              <img
                src="/token_logo.png"
                alt="Token Image"
                style={{ width: "40px", height: "40px", margin: "0 auto" }}
              />
              <p className="text-xl text-black text-center">{tokensEarnedCount}</p>
            </div>
            <div className="bg-blue-200 p-4 rounded-md mx-4">
              <h2 className="text-lg font-semibold text-black">Chains Contributed</h2>
              <img
                src="/Chain-logo.png"
                alt="Chains contributed Image"
                style={{ width: "40px", height: "40px", margin: "0 auto" }}
              />
              <p className="text-xl text-black text-center">{chainsContributed}</p>
            </div>
            <div className="bg-blue-200 p-4 rounded-md mx-4">
              <h2 className="text-lg font-semibold text-black">Total claimable</h2>
              <img
                src="/token_logo.png"
                alt="Chains contributed Image"
                style={{ width: "40px", height: "40px", margin: "0 auto" }}
              />
              <p className="text-xl text-black text-center">{availableToClaim | 0}</p>
            </div>
            <div className="bg-blue-200 p-4 rounded-md mx-4">
              <h2 className="text-lg font-semibold text-black">Total pool balance</h2>
              <img
                src="/token_logo.png"
                alt="Chains contributed Image"
                style={{ width: "40px", height: "40px", margin: "0 auto" }}
              />
              <p className="text-xl text-black text-center">{totalPoolBalance | 0}</p>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-green-500 text-white p-4 rounded shadow-lg">
          Claim successful!
        </div>
      )}
    </>
  );
};

export default Home;
