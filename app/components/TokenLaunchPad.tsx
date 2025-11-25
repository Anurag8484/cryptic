'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useRef } from "react";
import { toast } from "sonner";

export default function(){
    const wallet = useWallet();
    const { connection } = useConnection();

    async function createMint(){
        if(!wallet || !wallet.publicKey){
            toast('Wallet not connected')
            return;
        };
        const mintKeypair = Keypair.generate();
        const lamports = await getMinimumBalanceForRentExemptMint(connection);

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey:mintKeypair.publicKey,
                space:MINT_SIZE,
                lamports,
                programId: TOKEN_PROGRAM_ID,
            }),
            createInitializeMint2Instruction(mintKeypair.publicKey,9,wallet.publicKey,wallet.publicKey,TOKEN_PROGRAM_ID)
        );

        transaction.feePayer = wallet.publicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.partialSign(mintKeypair);

        await wallet.sendTransaction(transaction,connection);
        toast(`Token Mint created at ${mintKeypair.publicKey.toBase58()}`)
    }
    const nameRef = useRef<HTMLInputElement>(null);
    const symbolRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);
    const supplyRef = useRef<HTMLInputElement>(null);

    return (
      <div className="outline-1 rounded-xl outline-neutral-200 p-4 flex flex-col gap-5">
        <span>Launch Token</span>
        <Input
          placeholder="Name"
          type="text"
          ref={nameRef}
        ></Input>
        <Input
          placeholder="Symbol"
          type="text"
          ref={symbolRef}
        ></Input>
        <Input
          placeholder="Image Url"
          type="text"
          ref={imageRef}
        ></Input>
        <Input
          placeholder="Initial Supply"
          type="number"
          ref={supplyRef}
        ></Input>
        <Button onClick={() => (createMint())}>Launch</Button>
      </div>
    );
}