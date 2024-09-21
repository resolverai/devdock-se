import { Magic as MagicBase } from 'magic-sdk';
import { OAuthExtension } from "@magic-ext/oauth2";
import { FlowExtension } from '@magic-ext/flow';
import { SDKBase, InstanceWithExtensions } from '@magic-sdk/provider';

type MagicSDK = InstanceWithExtensions<
  SDKBase,
  { oauth: OAuthExtension; flow: FlowExtension }
>;

let magic: MagicSDK | null = null;

const createMagic = (key: string): MagicSDK => {
  return new MagicBase(key, {
    extensions: {
      oauth: new OAuthExtension(),
      flow: new FlowExtension({
        rpcUrl: 'https://rest-testnet.onflow.org',
        network: 'testnet'
      }),
    },
  }) as MagicSDK;
};

export const getMagic = (): MagicSDK | null => {
  if (typeof window !== 'undefined' && !magic) {
    magic = createMagic('pk_live_C3F8C5D5B5287599'); // change key
  }
  return magic;
};