import { ec as EC } from 'elliptic';
import * as fcl from "@onflow/fcl";
import {createAccount,pubFlowKey} from "@onflow/flow-js-testing"
const ec = new EC('p256');
const apiUrl = 'http://localhost:8081/accounts'; 

export const keyGen = () => {
  const keyPair = ec.genKeyPair();
  const privateKey = keyPair.getPrivate('hex');
  const publicKey = keyPair.getPublic('hex').slice(2); 
  return { privateKey, publicKey };
};

export const configFCL_local = () => {
  fcl.config()
    .put("accessNode.api", "http://localhost:8080") 
    .put("app.detail.title", "Devdock Test App Local")
    .put("app.detail.icon", "https://placekitten.com/200/200");
};
export const getAccount = async (address:string) => {
    const account = await fcl.send([fcl.getAccount(address)]).then(fcl.decode);
    return account;
  };
export const configFCL_testnet = () => {
  fcl.config()
    .put("accessNode.api", "https://rest-testnet.onflow.org")
    .put("app.detail.title", "Devdock Test App Testnet")
    .put("app.detail.icon", "https://placekitten.com/200/200");
};

export const configFCL_mainnet = () => {
  fcl.config()
    .put("accessNode.api", "https://rest-mainnet.onflow.org") 
    .put("app.detail.title", "Devdock Test App Mainnet")
    .put("app.detail.icon", "https://placekitten.com/200/200");
};

export const transfer = async () => {
    configFCL_testnet(); 

  const { privateKey, publicKey } = keyGen(); 
  console.log(privateKey)
  console.log({publicKey})
  const KEY_INDEX = 0;
await fetch(`/api/ecdsa?key=${privateKey}`)
//   const data = {
//     publicKey: publicKey,
//     signatureAlgorithm: 'ECDSA_P256',
//     hashAlgorithm: 'SHA3_256',
//   };

//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   };
  
//   const response = await fetch(apiUrl, requestOptions);
//   const responseData = await response.json();
  
//   const ACCOUNT_ADDRESS = responseData.address; 
//   console.log('New Account Address:', ACCOUNT_ADDRESS);
//   const pubKey = await pubFlowKey({
//     privateKey: privateKey,
//     hashAlgorithm:"ECDSA_P256",
//     signatureAlgorithm: 'SHA3_256',

//   })
//   const new_account =await createAccount(pubKey)
//   console.log(new_account)
//   const test_account = await getAccount(new_account.address) 
//   console.log({test_account})
//   async function sendTransaction() {

//     const authorizationFunction = async (account) => {
//       return {
//         addr: ACCOUNT_ADDRESS,
//         keyId: KEY_INDEX,
//         signingFunction: async (signable) => {
//           const keyPair = ec.keyFromPrivate(privateKey, "hex"); 
//           const signature = keyPair.sign(signable.message).toDER("hex");

//           return {
//             addr: ACCOUNT_ADDRESS,
//             keyId: KEY_INDEX,
//             signature: signature,
//           };
//         },
//         roles: {
//           proposer: true,
//           authorizer: true,
//           payer: true,
//         },
//         sequenceNum: account.sequenceNum, // Sequence number is required
//       };
//     };

//     const transactionCode = `
//       transaction {
//         prepare(signer: AuthAccount) {
//           log("Transaction executed!")
//         }
//       }
//     `;

//     console.log(fcl)
//     const txId = await fcl.send([
//       fcl.transaction(transactionCode),
//       fcl.payer(authorizationFunction), // Set the payer using the authorization function
//       fcl.proposer(authorizationFunction), // Set the proposer using the authorization function
//       fcl.authorizations([authorizationFunction]), // Set the authorizers
//       fcl.limit(100), // Set gas limit
//     ]).then(fcl.decode);

//     console.log('Transaction ID:', txId);

//     // Step 7: Check the transaction result
//     const result = await fcl.tx(txId).onceSealed();
//     console.log('Transaction Result:', result);
//   }

//   try {
//     setTimeout(() => {
//        console.log("Waiting done") 
//     }, 120000);
//     sendTransaction(); // Execute the transaction
//   } catch (e) {
//     console.log(e);
//   }
};
