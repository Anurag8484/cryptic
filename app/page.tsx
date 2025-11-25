import AirdropCard from "./components/AirdropCard";
import Navbar from "./components/Navbar";
import SendToken from "./components/SendToken";
import SignCard from "./components/SignCard";
import TokenLaunchPad from "./components/TokenLaunchPad";
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
      <div className="flex grid-cols-3 justify-around    my-7">
      <AirdropCard/>
      <SignCard/>
      <SendToken/>
      </div>
      <hr />
      <div className="flex grid-cols-3 justify-around    my-7">
      <TokenLaunchPad/>
      <SignCard/>
      <SendToken/>
      </div>
    </div> 

</div>
  )
}