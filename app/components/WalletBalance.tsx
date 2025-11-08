import { RefreshCcw } from "lucide-react";

export default function(){
    return (
      <div className=" outline-1 outline-neutral-200 justify-center items-center rounded-xl p-4 flex gap-5">
       <span className="text-neutral-800 font-semibold">
       0.000 Sol
       </span>
       <RefreshCcw className="size-5" />
      </div>
    );
}