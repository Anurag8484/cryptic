import AirdropCard from "./components/AirdropCard";
import Navbar from "./components/Navbar";
import WalletBalance from "./components/WalletBalance";
import WalletConnectCard from "./components/WalletConnectCard";

export default function Home(){
  return(
<div className="m-6">
  <Navbar/>
  <div className="my-5">
    <div className="flex justify-between">
      <span>Welcome to CryptiC</span>
        <WalletBalance/>
    </div>
      <div className="flex gap-4 my-7">
      <AirdropCard/>
      <div></div>
      <div></div>
      </div>
    </div> 

</div>
  )
}