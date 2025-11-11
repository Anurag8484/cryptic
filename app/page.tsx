import AirdropCard from "./components/AirdropCard";
import Navbar from "./components/Navbar";
import SignCard from "./components/SignCard";
import WalletBalance from "./components/WalletBalance";

export default function Home(){
  return(
<div className="m-6 w-screen">
  <Navbar/>
  <div className="my-5">
    <div className="flex justify-between">
      <span>Welcome to CryptiC</span>
        <WalletBalance/>
    </div>
      <div className="flex justify-between  my-7">
      <AirdropCard/>
      <SignCard/>
      <div></div>
      </div>
    </div> 

</div>
  )
}