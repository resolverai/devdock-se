import { NextRequest, NextResponse } from "next/server";
import {createAccount,pubFlowKey} from "@onflow/flow-js-testing"
import * as fcl from "@onflow/fcl";

export const configFCL_testnet = async() => {
    fcl.config()
      .put("accessNode.api", "https://rest-testnet.onflow.org")
      .put("app.detail.title", "Devdock Test App Testnet")
      .put("app.detail.icon", "https://placekitten.com/200/200");
  };



export const getAccount = async (address:string) => {
    const account = await fcl.send([fcl.getAccount(address)]).then(fcl.decode);
    return account;
  };
export async function GET(req: NextRequest){
    try {
        const { searchParams } = new URL(req.url);
        const privateKey = searchParams.get("key");
        console.log(privateKey)
        await configFCL_testnet()
        console.log("config completed ")
        const pubKey = await pubFlowKey({
            privateKey: privateKey        
          })
          console.log("publickey created", pubKey)
          const new_account =await createAccount({keys:[pubKey]})
          console.log({new_account})
          const test_account = await getAccount(new_account.address) 
          console.log({test_account})
  
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { error: "An unexpected error occurred." },
            { status: 500 }
          );
    }
  }