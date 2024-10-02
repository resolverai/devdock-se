'use client'

import { useEffect, useState } from "react";
import { getMagic } from './../utils/magic';

import { useRouter,useSearchParams } from "next/navigation";
import { sendTransaction } from "../utils/sendTransaction";
import {MagicUserMetadata} from "magic-sdk"

const magic = getMagic()
// Define types for user and oauth return data

type OAuthReturnData = {
  [key: string]: any; // Adjust this based on the actual structure of oauth return data
};

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<MagicUserMetadata | null>(null);
  const [oauthReturnData, setOauthReturnData] = useState<OAuthReturnData | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const finishSocialLogin = async () => {
    try {
        
        // @ts-ignore
      const result = await magic.oauth2.getRedirectResult();
      const userInfo = await magic?.user.getInfo();
      setOauthReturnData(result);
      setUser(userInfo||null);
      console.log("result:::", result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendTransaction = async () => {
    console.clear();
    await sendTransaction();
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
    const queryString = searchParams.toString();
    console.log("Query String:", queryString, queryString ? true : false);

    if (queryString) {
      finishSocialLogin();
    } else if (!user) {
      magic?.user.isLoggedIn().then((isLoggedIn) => {
        if (isLoggedIn) {
          magic.user.getInfo().then(userInfo => setUser(userInfo));
        }
      });
    }
  }, [searchParams, user]);


  return (
    <div className="container">
      {!user && <div className="loading">Loading...</div>}

      {user && (
        <>
          <div>
            {user && <h1>{user.publicAddress}</h1>}
            <h1>Data returned:</h1>
            <pre className="user-info">{JSON.stringify(oauthReturnData || user, null, 3)}</pre>
          </div>

          <button className="logout-button" onClick={handleSendTransaction}>
            Send Trx
          </button>
        </>
      )}
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;