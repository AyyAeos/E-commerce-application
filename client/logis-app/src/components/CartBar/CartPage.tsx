import axios from "axios";
import useSWR from "swr";
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react";


type Item =  {
    cartId  : number,
    itemId : number,
    quantity : number,
    sizeId  : number,
    size : string,
    updatedAt : string,
    itemName : string,
    price : number,
}




const CartPage = () => {

    const userId = localStorage.getItem("userId")

    //Get Cart data
    const fetcher = async(url: string) => {
        try{
            const res = await axios.get(url)
            if(res.data.msg === 'success') {
                return res.data.data
            }
        } catch (error) {
            console.log(error);
            return []
            
        }
      }
      
      const {data, error, isLoading} = useSWR(`http://localhost:8080/carts/${userId}`, fetcher)

      console.log("Fetched data: " ,data);

        //   tick box
        const [selectedItems, setSelectedItems] = useState<number[]>([]);

        const handleCheckboxClick = (sizeId: number) => {
            setSelectedItems((prev) =>
                // return a new array that exclude id
                prev.includes(sizeId) ? prev.filter((id) => id !== sizeId) : [...prev, sizeId]
            );
        };
        
    return (
        <>
        <div className="flex min-h-screen bg-primary text-primary-foreground overflow-y-scroll">

            {/* column take full screen */}
            <div className="flex flex-col w-full">

                <div className="w-full text-center font-bold text-4xl m-4 p-4">
                        Carts
                </div>

                {data && data.map( (item : Item, index : number) => {
                    const isSelected = selectedItems.includes(item.sizeId);

                    return (
                    
                    <div key={index}  className={`flex border border-gray rounded p-4 m-2 transition-colors ${
                        isSelected ? "bg-yellow-300" : "bg-blue-500"
                    }`}>

                        {/* left container  */}
                        <div className="w-1/2">
                            <div className="flex flex-col justify-between h-full">
                                <h2 className=" text-4xl font-bold">{item.itemName}</h2>
                                <p className="">{item.size}</p>
                            </div>
                        </div>

                        {/* right container */}
                        <div className="w-1/2 text-right items-end">
                            <div className="flex flex-col space-y-3">

                                <div>
                                <Checkbox onClick={() => handleCheckboxClick(item.sizeId)}   />
                                </div>
                                
                                <h2 className="opacity-50">{item.updatedAt }</h2>
                                
                            
                                <h2 className="font-bold">RM {item.price}</h2>

                                <div className="flex items-center justify-end">
                                    <Button> - </Button>
                                    <h2 className="text-2xl m-2 px-2 py-2">{item.quantity}</h2>
                                    <Button> + </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                    );
                    })}
                <div className="flex flex-col  sticky bottom-0 w-full mt-auto  p-4  bg-white ">

                </div>
            </div>
        </div>
            
     
        </>
    );
}

export default CartPage;