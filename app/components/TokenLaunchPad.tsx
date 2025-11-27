'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createInitializeMetadataPointerInstruction, createInitializeMint2Instruction, createInitializeMintInstruction, ExtensionType, getMinimumBalanceForRentExemptMint, getMintLen, LENGTH_SIZE, MINT_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE } from "@solana/spl-token";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";
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
        
        const metedata = {
          mint: mintKeypair.publicKey,
          name: nameRef.current?.value || "APBC",
          symbol: symbolRef.current?.value || "⥇",
          uri:
          uriRef.current?.value || "https://cdn.100xdevs.com/metadata.json",
          additionalMetadata: [],
        };
        
        const mintLen = getMintLen([ExtensionType.MetadataPointer]);
        const meteDataLen = TYPE_SIZE + LENGTH_SIZE + pack(metedata).length
        const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + meteDataLen);
        const transaction = new Transaction().add(
          SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: mintLen,
            lamports,
            programId: TOKEN_2022_PROGRAM_ID,
          }),
          createInitializeMetadataPointerInstruction(mintKeypair.publicKey,wallet.publicKey,mintKeypair.publicKey,TOKEN_2022_PROGRAM_ID),
          createInitializeMintInstruction(mintKeypair.publicKey,9,wallet.publicKey,null,TOKEN_2022_PROGRAM_ID),
          createInitializeInstruction({
            programId:TOKEN_2022_PROGRAM_ID,
            mint: mintKeypair.publicKey,
            metadata: mintKeypair.publicKey,
            name: metedata.name,
            symbol: metedata.symbol,
            uri: metedata.uri,
            mintAuthority: wallet.publicKey,
            updateAuthority:wallet.publicKey,
            
          }
          )
        );

        transaction.feePayer = wallet.publicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.partialSign(mintKeypair);

        const res = await wallet.sendTransaction(transaction,connection);
        console.log(res)
        toast(`Token Mint created at ${mintKeypair.publicKey.toBase58()}`)
    }
    const nameRef = useRef<HTMLInputElement>(null);
    const symbolRef = useRef<HTMLInputElement>(null);
    const uriRef = useRef<HTMLInputElement>(null);
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
          ref={uriRef}
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