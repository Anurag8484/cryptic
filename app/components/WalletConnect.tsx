"use client"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

export default function(){
    return (<div className="flex gap-2 ">
                <WalletMultiButton></WalletMultiButton>
                <WalletDisconnectButton></WalletDisconnectButton>
    </div>
    );
}