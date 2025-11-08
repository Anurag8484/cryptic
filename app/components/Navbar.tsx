import WalletConnect from "./WalletConnect";

export default function Navbar(){
    return(
        <div className="flex justify-between p-4 outline-1 outline-neutral-200 rounded-xl">
            <span>CryptiC</span>
            <WalletConnect/>
        </div>
    )
}