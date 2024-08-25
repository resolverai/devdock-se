// app/api/wallet/route.ts

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface WalletEntry {
  wallet_address: string;
  email_address: string;
}

const WALLETS_FILE_PATH = path.join(process.cwd(), 'public', 'wallet-address.json');

async function readWalletsFile(): Promise<WalletEntry[]> {
  try {
    const data = await fs.readFile(WALLETS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading wallets file:', error);
    return [];
  }
}

async function writeWalletsFile(wallets: WalletEntry[]): Promise<void> {
  try {
    await fs.writeFile(WALLETS_FILE_PATH, JSON.stringify(wallets, null, 2));
  } catch (error) {
    console.error('Error writing wallets file:', error);
    throw new Error('Failed to write wallets file');
  }
}

export async function POST(request: NextRequest) {
  const { wallet_address, email_address } = await request.json();

  if (!wallet_address || !email_address) {
    return NextResponse.json({ error: 'Wallet address and email address are required' }, { status: 400 });
  }

  try {
    const wallets = await readWalletsFile();
    
    const existingWallet = wallets.find(w => w.wallet_address.toLowerCase() === wallet_address.toLowerCase());
    if (existingWallet) {
      if (existingWallet.email_address.toLowerCase() === email_address.toLowerCase()) {
        return NextResponse.json({ error: 'Wallet address already exists' }, { status: 409 });
      } else {
        return NextResponse.json({ error: 'Wallet address is mapped with a different email' }, { status: 409 });
      }
    }

    const existingEmail = wallets.find(w => w.email_address.toLowerCase() === email_address.toLowerCase());
    if (existingEmail) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }

    wallets.push({ wallet_address, email_address });
    await writeWalletsFile(wallets);

    return NextResponse.json({ message: 'User added' }, { status: 201 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email_address = searchParams.get('email_address');

  if (!email_address) {
    return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
  }

  try {
    const wallets = await readWalletsFile();
    
    const wallet = wallets.find(w => w.email_address.toLowerCase() === email_address.toLowerCase());
    
    if (wallet) {
      return NextResponse.json({ wallet_address: wallet.wallet_address }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Wallet is not yet created' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
