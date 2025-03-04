import axios from "axios";
import useSWR from "swr";
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react";
import AddButton from "../Inventory/AddForm";
import { Navigate, useNavigate } from "react-router-dom";


type Item =  {
    cartId  : number,
    itemId : number,
    quantity : number,
    sizeId  : number,
    size : string,
    updatedAt : string,
    itemName : string,
    price : number,
    selected: boolean
}



const CartPage = () => {
    
    const userId = localStorage.getItem("userId")
    //calculate total price
    const [totalPrice, setTotalPrice] = useState<number>(0);

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

      const[datadata, setDataData] = useState<Item[]>([])
      
      const {data, error, isLoading} = useSWR<Item[]>(`http://localhost:8080/carts/${userId}`, fetcher)

      useEffect(() => {
        if (data) {
            setDataData(data);
        }
    }, [data]);
     

      console.log("Fetched data: " ,datadata);

        //   tick box
        // const [selectedItems, setSelectedItems] = useState<Item[]>([]);

        const handleCheckboxClick = (item : Item) => {
            setDataData((prevData) => {
                // return a new array that exclude id
                const isSelected = prevData.find(prev => prev.sizeId === item.sizeId && prev.selected === true)

                if(isSelected) {
                    setTotalPrice(prev => prev - item.price * item.quantity)
                    return prevData.map(prev => {
                        if(prev.sizeId === item.sizeId) {
                            return {...prev, selected: false}
                        }

                        return prev
                    })
                } else {
                    setTotalPrice(prev => prev + item.price * item.quantity)
                    return prevData.map(prev => {
                        if(prev.sizeId === item.sizeId) {
                            return {...prev, selected: true}
                        }
                        return prev
                    })
                } 
            }
        );
    };
   

    const addQuantity = (sizeId: number) => {
        setDataData(prevData => {
            return prevData.map(item => {
                //modify item
                if (item.sizeId === sizeId) {
                    const updatedItem = { ...item, quantity: item.quantity + 1 };
                    if(item.selected) {
                        setTotalPrice(prev => prev + item.price)
                    }
                    return updatedItem;
                }
                return item;
            });
        });
    };
    
    const minusQuantity = (sizeId: number) => {
        setDataData(prevData => {
            return prevData.map(item => {
                if (item.sizeId === sizeId && item.quantity > 1) {
                    const updatedItem = { ...item, quantity: item.quantity - 1 };
                    if(item.selected) {
                        setTotalPrice(prev => prev - item.price)
                    }
                    return updatedItem;
                }
                return item;
            });
        });
    };

    const navigate = useNavigate();

        // useEffect(() => {
        //     const newTotalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        //     setTotalPrice(newTotalPrice);
        // }, [selectedItems]);

        const handleCheckOut = () => {
            navigate(`/checkouts/${userId}`, {
                state: { selectedItems: datadata.filter(prev => prev.selected === true), totalPrice },
            });
        }; 

        
    return (
        <>
        <div className="flex min-h-screen bg-primary text-primary-foreground overflow-y-scroll">

            {/* column take full screen */}
            <div className="flex flex-col w-full">

                <div className="w-full text-center font-bold text-4xl m-4 p-4">
                        Carts
                </div>

                {datadata && datadata.map( (item : Item, index : number) => {
                    const isSelected = datadata.find(prev => prev.sizeId === item.sizeId && prev.selected === true);

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
                                <Checkbox onClick={() => handleCheckboxClick(item)}   />
                                </div>
                                
                                <h2 className="opacity-50">Last Updated Date : {item.updatedAt }</h2>
                                
                            
                                <h2 className="font-bold"> Price per Item : RM {item.price}</h2>

                                <div className="flex items-center justify-end">
                                    <Button
                                    onClick={() => minusQuantity(item.sizeId)}
                                    > - 
                                    </Button>
                                    <h2 className="text-2xl m-2 px-2 py-2">{item.quantity}</h2>
                                    <Button
                                     onClick={() => addQuantity(item.sizeId)}
                                     > + </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                    );
                    })}
                    <span className="mb-16"></span>
                    
                    
            {datadata && datadata.filter(prev => {
                return prev.selected === true;
            }) .length > 0 && 
                (
                         <>
                        <div className="flex flex-col fixed bottom-0 w-full mt-4  p-4  bg-white opacity-40  ">
                            <div className="w-full text-end font-bold text-2xl">
                                Total Price : {totalPrice.toFixed(2)}
                            </div>

                            <div className="w-full mt-2">
                                <Button className="w-full bg-blue-500 text-3xl p-2 hover:bg-red-500"
                                onClick={handleCheckOut}>
                                    Check Out
                                </Button>
                            </div>
                        </div>
                        </>
                )

            }
            </div>
        </div>
            
     
        </>
    );
}

export default CartPage;