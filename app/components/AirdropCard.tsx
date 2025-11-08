import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function(){
    return(
        <div className="outline-1 rounded-xl outline-neutral-200 p-4 flex flex-col gap-5">
                <Input placeholder="Enter Sol needed" type="number"></Input>
                <Button>Request</Button>
        </div>
    )
}