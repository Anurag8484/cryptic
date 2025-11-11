'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useRef } from "react";
import { toast } from "sonner";

export default function(){
    const wallet = useWallet();
    const { connection } = useConnection();
    const solRef = useRef<HTMLInputElement>(null);
    async function requestAirDrop(){
        const amount:number = parseInt(solRef.current?.value || '0');
        console.log(wallet.connected)
        if(!wallet || !wallet.publicKey){
            toast("Unable to fing Pub_Key")
            return;
        }
        try {
            await connection.requestAirdrop(wallet.publicKey, amount * 1000000000).then(
                (signature=>{toast("Requested Succesfully"); toast(signature)})
            );
        } catch (error) {
            console.log(error)
            return;
        }

    }
    return(
        <div className="outline-1 rounded-xl outline-neutral-200 p-4 flex flex-col gap-5">
                <Input placeholder="Enter Sol needed" type="number" ref={solRef}></Input>
                <Button onClick={()=>requestAirDrop()}>Request</Button>
        </div>
    )
}