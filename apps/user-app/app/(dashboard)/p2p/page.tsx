
import { P2pTransferCard } from "../../../components/P2pTransferCard";
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";


const P2pTransfer = async () => {
   
   
    return ( <div className="flex items-center justify-center h-screen w-screen">
        <P2pTransferCard />
        </div> );
}
 
export default P2pTransfer;