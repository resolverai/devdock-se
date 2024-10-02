import * as fcl from '@onflow/fcl';
import { getMagic } from './magic';

const magic = getMagic()
console.log("inside transaction")
console.log({magic})
import { TransactionStatus } from '@onflow/typedefs';
fcl.config().put('accessNode.api', 'https://rest-testnet.onflow.org');

fcl.config().put('challenge.handshake', 'http://access-001.devnet9.nodes.onflow.org:8000');

//@ts-ignore
const AUTHORIZATION_FUNCTION= magic?.flow.authorization()
const getReferenceBlock = async (): Promise<string> => {
    const response = await fcl.send([fcl.getBlock()]);
    const data = await fcl.decode(response);
    return data.id;
};


export async function sendTransaction(): Promise<TransactionStatus | undefined> {
    console.log('SENDING TRANSACTION...');

    try {
        /*
        const response = await fcl.send([
            fcl.transaction`
                transaction {
                    prepare() {
                        log("Transaction prepared")
                    }
                    execute {
                        log("Transaction executed")
                    }
                }
            `,
            fcl.ref(await getReferenceBlock()),
            // fcl.authorizations([AUTHORIZATION_FUNCTION]), // <-- not auth needed for this transaction
            fcl.proposer(AUTHORIZATION_FUNCTION),
            fcl.payer(await AUTHORIZATION_FUNCTION),
        ]);
        console.log('TRANSACTION SENT');
        console.log('TRANSACTION RESPONSE', response);

        console.log('WAITING FOR TRANSACTION TO BE SEALED');
        const data:TransactionStatus = await fcl.tx(response).onceSealed();
        console.log('TRANSACTION SEALED', data);

        if (data.status === 4) {
            console.log('Congrats!!! I Think It Works');
            return data;
        } else {
            console.log(`Oh No: ${data.errorMessage}`);
            return data;
        }
    */} catch (error) {
        console.error('FAILED TRANSACTION', error);
        return undefined;
    }
}