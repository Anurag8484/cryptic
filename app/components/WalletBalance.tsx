'use client'
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function(){
  const [balance,setBalance] = useState(0);
  const wallet = useWallet();
  const { connection } = useConnection();
  async function getBalanceSol(){
    if (!wallet || !wallet.connected || !wallet.publicKey){
      toast("Wallet not connected");
      return;
    }
    try {
      await connection.getBalance(wallet.publicKey).then((sol)=>(setBalance(sol)))
    } catch (error) {
      console.log(error);
      toast("Error fetching balance");
    }
  }
  useEffect(()=>{
    getBalanceSol();
  },[wallet.connected,wallet.publicKey])
    return (
      <div className=" outline-1 outline-neutral-200 justify-center items-center rounded-xl p-4 flex gap-5">
       <span className="text-neutral-800 font-semibold">
       {(balance/10**9).toFixed(7)} SOL
       </span>
       <RefreshCcw className="size-5" onClick={()=>getBalanceSol()} />
      </div>
    );
}