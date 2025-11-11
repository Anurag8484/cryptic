import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export async function AirDrop(sol:number){
    const wallet = useWallet()
    if(!sol || sol < 0){
        return("Please enter valid amount")
    };
    try {
        
    } catch (error) {
        
    }
}