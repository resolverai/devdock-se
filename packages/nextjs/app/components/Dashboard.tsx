'use client'

import { useEffect, useState } from "react";
// import { getMagic } from './../utils/magic';
import {ethers} from "ethers"
import { useRouter,useSearchParams } from "next/navigation";
import { sendTransaction } from "../utils/sendTransaction";
import {MagicUserMetadata} from "magic-sdk"
import { getMagic } from "../utils/magic";

// const magic = getMagic()
// Define types for user and oauth return data
const magic = getMagic()
// const magic = getMagic_eth()
type OAuthReturnData = {
  [key: string]: any; // Adjust this based on the actual structure of oauth return data
};


const Dashboard: React.FC = () => {
  const [user, setUser] = useState<MagicUserMetadata | null>(null);
  const [oauthReturnData, setOauthReturnData] = useState<OAuthReturnData | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const print_signer=async()=>{
    const provider = new ethers.BrowserProvider(magic?.rpcProvider);
    console.log({provider})
    const signer = await provider.getSigner()
    console.log({signer})
    await fetch("/api/test_signer", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(signer) 
    });
  }
  const finishSocialLogin = async () => {
    try {
      console.log("inside finishSocialLogin");
      //@ts-ignore
      const result = await magic?.oauth2.getRedirectResult();
      console.log("result:::", result);

      const userInfo = await magic?.user.getInfo();
      console.log("userInfo:::", userInfo);
      console.log("after loggin",{magic})

      setOauthReturnData(result || null);
      setUser(userInfo || null);
      await print_signer()
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await magic?.user.logout();
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const queryString = location.search;
    console.log("Query String:", queryString, queryString ? true : false);

    queryString && finishSocialLogin();
  }, [searchParams, user]);

  return (
    <div className="container">
      {!user && <div className="loading">Loading...</div>}

      {user && (
        <>
          <div>
            <h1>Data returned:</h1>
            <pre className="user-info">{JSON.stringify(oauthReturnData, null, 3)}</pre>
          </div>
          {/* <button className="transfer-button" onClick={sendTransaction}>
        send
      </button> */}
        </>
      )}
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;