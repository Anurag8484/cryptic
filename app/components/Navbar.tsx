import { Badge } from "@/components/ui/badge";
import WalletConnect from "./WalletConnect";

export default function Navbar(){
    return(
        <div className="flex justify-between items-center p-4 outline-1 outline-neutral-200 rounded-xl">

            <div className="text-2xl text-neutral-600">CryptiC <Badge variant="outline">v1</Badge> </div>
            <WalletConnect/>
        </div>
    )
}