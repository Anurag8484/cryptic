"use client"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

export default function(){
    return (<div className="flex gap-2 ">
      <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/nsie4CkPWDSvgFDKT6Yhg">
        <WalletProvider wallets={[]}>
            <WalletModalProvider>
                <WalletMultiButton></WalletMultiButton>
                <WalletDisconnectButton></WalletDisconnectButton>
            </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
    );
}