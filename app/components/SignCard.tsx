'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ed25519 } from "@noble/curves/ed25519.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRef } from "react";
import { toast } from "sonner";
import bs58 from "bs58";
export default function(){
  const {publicKey,signMessage} = useWallet();
  const wallet = useWallet();
  const msgRef = useRef<HTMLInputElement>(null);
  async function signMsg(){
    const message = msgRef.current?.value;
    if(!publicKey){
      console.log(wallet)
      toast("Public key not available");
      return;
    }else if(!signMessage){
      toast("Wallet does not support message signing");
      return;
    }else if(!message){
      toast("Please enter valid message");
      return;
    }
    const encodedMsg = new TextEncoder().encode(message);
    try {
      const signature = await signMessage(encodedMsg);
      if(!ed25519.verify(signature,encodedMsg,publicKey.toBytes())) throw new Error("Message Signature Invalid!");
      toast(`Message Signature: ${bs58.encode(signature)}`) ;     
    } catch (error) {
      toast("Message signature invalid!");
      return;
    }


  }
     return (
       <div className="outline-1 rounded-xl outline-neutral-200 p-4 flex flex-col gap-5">
         <span>Sign Message</span>
         <Input
           placeholder="Enter Message"
           type="text"
           ref={msgRef}
         ></Input>
         <Button  onClick={() => signMsg()}>Sign Message</Button>
       </div>
     );
}