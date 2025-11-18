"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useRef } from "react";
import { toast } from "sonner";

export default function () {
  const { connection } = useConnection();
  const wallet = useWallet();
  const toRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  async function sendTokens() {
    if (!wallet.publicKey || !wallet.connected) {
      toast("Wallet not connected");
      return;
    }
    console.log(wallet.connected)
    let to = toRef.current?.value || "";
    let amount = LAMPORTS_PER_SOL * parseFloat(amountRef.current?.value ?? "0");
    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(to),
        lamports: amount,
      }) 
    );
    try {
      await wallet
        .sendTransaction(transaction, connection)
        .then((signature) => toast(signature)); 
      toast("✅Payment Done");
    } catch (error) {
      console.log(error);
      toast("❌ Payment Failed");
    }
  }
  return (
    <div className="outline-1 rounded-xl outline-neutral-200 p-4 flex flex-col gap-5">
      <span>Send Tokens</span>
      <Input placeholder="Public key of recepient" type="text" ref={toRef}></Input>
      <Input placeholder="Enter Amount" type="number" ref={amountRef}></Input>
      <Button onClick={() => sendTokens()}>Send</Button>
    </div>
  );
}
