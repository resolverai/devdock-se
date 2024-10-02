'use client'
import * as fcl from '@onflow/fcl';
import { FC, MouseEvent } from 'react';
import { getMagic } from './../utils/magic';

const magic = getMagic()

// Define the type for the provider
type Provider = 'github' | 'google' | 'facebook' | 'apple'; // Add other providers as needed

const Login: FC = () => {
  const handleSocialLogin = async (provider: Provider) => {
    console.log("Inside Hanlde social login")
    try {
      //@ts-ignore
      await magic?.oauth2.loginWithRedirect({
        provider,
        redirectURI: new URL("/dashboard", window.location.origin).href,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = (provider: Provider) => (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleSocialLogin(provider);
  };

  return (
    <div className="container">
      <h1>Testing Magic</h1>
      <button onClick={handleClick('github')}>
        Log in with GitHub
      </button>
    </div>
  );
};

export default Login;