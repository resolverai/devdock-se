'use client'

import { useEffect, useState } from "react";
// import { getMagic } from './../utils/magic';

import { useRouter,useSearchParams } from "next/navigation";
import { sendTransaction } from "../utils/sendTransaction";
import {MagicUserMetadata} from "magic-sdk"
import { getMagic } from "../utils/magic";

// const magic = getMagic()
// Define types for user and oauth return data
const magic = getMagic()
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
      console.log("inside finishSocialLogin");
      //@ts-ignore
      const result = await magic?.oauth2.getRedirectResult();
      console.log("result:::", result);

      const userInfo = await magic?.user.getInfo();
      console.log("userInfo:::", userInfo);

      setOauthReturnData(result || null);
      setUser(userInfo || null);
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
        </>
      )}
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;