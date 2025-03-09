import axios from "axios";
import useSWR from "swr";
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { debounce } from "lodash";


//means cause i change the state of datadata react re-render every thing again
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

    const handleCheckboxClick = useCallback((item: Item) => {
        setDataData((prevData) => {
            return prevData.map(prev => {
                if (prev.sizeId === item.sizeId) {
                    const isSelected = !prev.selected;
                    setTotalPrice(prevTotal => prevTotal + (isSelected ? item.price * item.quantity : -item.price * item.quantity));
                    return { ...prev, selected: isSelected };
                }
                return prev;
            });
        });
    }, []);

    const updateCartToServer = debounce(async (cartId: number, newQuantity: number, sizeId: number) => {
        try {
            await axios.put(`http://localhost:8080/carts/${userId}`, {
                cartId,
                quantity: newQuantity,
                sizeId
            });
        } catch (error) {
            console.error("Failed to update cart:", error);
        }
    }, 500); 
    // wait 500 sec after last button is hit , if hit = reset 
    
    const updateQuantity = (cartId : number, sizeId: number, increment: number) => {
        setDataData(prevData => {
            return prevData.map(item => {
                if (item.sizeId === sizeId) {
                    const newQuantity = item.quantity + increment;
                    if (newQuantity < 1) return item; 

                    // setTimeout(() => updateCartToServer(cartId, newQuantity, sizeId));
                     updateCartToServer(cartId, newQuantity, sizeId)
                    
                    if (item.selected) {
                        setTotalPrice(prev => prev + item.price * increment);
                    }
                    
                    return { ...item, quantity: newQuantity }; //update to data data afterwards
                }
                return item;
            });
        });
    };
    
    const addQuantity = (cartId : number, sizeId: number ) => updateQuantity(cartId, sizeId, 1);
    const minusQuantity = (cartId : number, sizeId: number) => updateQuantity(cartId,sizeId, -1);
    

 
    const navigate = useNavigate();

        const handleCheckOut = () => {
            navigate(`/checkouts/${userId}`, {
                state: { selectedItems: datadata.filter(prev => prev.selected === true), totalPrice },
            });
        }; 



    return (
        <>

        <button
          className="fixed mt-4 right-4 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600"
          onClick={() => navigate(`/products`)}
        >
          EXIT
        </button>

        {isLoading ? (
        <p>Loading orders...</p>
        ) : error ? (
            <p className="text-red-500"> Please refresh the page or Click exit on top right !</p>
        ) : data && data.length === 0 ? (
            <p className="text-red-500">No orders found. Please Click Exit on top right !</p>
        ) : (

        <div className="flex min-h-screen bg-primary text-primary-foreground overflow-y-scroll">

            {/* column take full screen */}
                     <div className="flex flex-col w-full px-5  sm:px-10 md:px-20">

                    <div className="text-2xl sm:text-4xl md:text-6xl xl:text-8xl font-bold px-2 mb-4 text-center">
                            Carts
                    </div>

                    <div className="flex rounded bg-white text-sm xl:text-2xl mb-6 xl:font-bold items-center">
                        <p className="w-1/6 text-center">Item Name</p>
                        <p className="w-1/6 text-center">Size</p>
                        <p className="w-1/6 text-center">Price</p>
                        <p className="w-1/6 text-center">Quantity</p>
                        <p className="w-1/6 text-center">Total</p>
                        <p className="w-1/6 text-center">Select</p>
                    </div>

              
                {datadata && datadata.map( (item : Item, index : number) => {
                    const isSelected = datadata.find(prev => prev.sizeId === item.sizeId && prev.selected === true);

                    return (
                    
                <div key={index}  className={`flex text-xs md:text-xl xl:font-bold items-center justify-between rounded mb-2 py-2 transition-colors text-white ${
                                isSelected ? "bg-red-300" : "bg-slate-500"
                                }`}>
                                <span className="w-1/6 text-center">{item.itemName}</span>
                                <span className="w-1/6 text-center">{item.size}</span>
                                <span className="w-1/6 text-center"> {item.price}</span>

                                <div className="w-1/6 flex justify-center items-center">
                                    <Button
                                    className=" w-6 h-6 text-xs px-1 py-0.5 sm:w-8 sm:h-8"
                                    onClick={() => {
                                        minusQuantity(item.cartId, item.sizeId)
                                    }}
                                    > - 
                                    </Button>

                                    <h2 className="text-center w-10 ">{item.quantity}</h2>

                                    <Button
                                    className="w-6 h-6 text-xs px-1 py-0.5 sm:w-8 sm:h-8"
                                     onClick={() => addQuantity(item.cartId, item.sizeId)}
                                     > + </Button>
                                </div>

                                <div className="w-1/6 text-center">
                                     {(item.price * item.quantity).toFixed(2)}
                                </div>

                                <div className="w-1/6 flex justify-center">
                                <Checkbox onClick={() => handleCheckboxClick(item)}  />
                                </div>
                    </div>
                    );
                })}
                <span className="mb-24"></span>
                    
                    
            {datadata && datadata.filter(prev =>  prev.selected === true ) .length > 0 && 
                (

                    <div className="fixed bottom-0 rounded` left-1/2 transform -translate-x-1/2 bg-white opacity-80 w-full max-w-7xl p-2 sm:p-4">
                    <div className="flex flex-col">
                        <div className="text-end font-bold text-sm sm:text-2xl p-2">
                            Total Price : RM {totalPrice.toFixed(2)}
                        </div>
                
                       
                            <Button className="bg-blue-500 text-lg hover:bg-red-500"
                            onClick={handleCheckOut}>
                                Check Out
                            </Button>
                        
                    </div>
                </div>
                
                       

                      
                    
                )

            }
           
            </div>
        </div>
            
        )}
        </>
    );
}

export default CartPage;