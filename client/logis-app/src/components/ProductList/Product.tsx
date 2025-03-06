import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import Cart from "../CartBar/Cart";
import { cn } from "@/lib/utils";


type Variants = {
    size : string,
    stock : number,
    price : number,
    sizeId : number

}

type SelectedProduct = {
    itemId : number 
   itemName : string
    description: string
    variants : Variants[]
}

type AddItemType = {
    itemId: number,
    itemName : string,
    sizeId : number,
    quantity: number,
    userId :string,
    itemPrice : number
}

    



const Product = () =>{

    const { itemId } = useParams();

    const userId = localStorage.getItem("userId") ?? "";
    
    const fetcher = async (url :string) => {
        try {
            const response = await axios.get(url);

            if (response.data.msg === 'success' && response.data.code === 1) {
                console.log(`Fetched data: ${response.data.data}`);
                
                return response.data.data;
            }
        
        }catch (error) {
            console.error("Error fetching data:", error);
        }
        return []
    };

   const { data, error, isLoading } = useSWR<SelectedProduct>(`http://localhost:8080/products/${itemId}`, fetcher)

   

   const [addItem, setAddItem] = useState<AddItemType>({
    itemId: itemId ? parseInt(itemId) : 0,
    itemName : "",
    sizeId : 0,
    quantity: 0,
    userId :userId ?? "",
    itemPrice : 0,
   })

   //Default additem become first
    useEffect(() => {
        if(!isLoading && data) {
            setAddItem((prev) => (
                {
                    ...prev,
                sizeId : data.variants[0].sizeId,
                quantity: 1,
                userId :userId,
                itemPrice : data.variants[0].price
                }
                    )  
                )
        }
    }, [isLoading, data, userId])

    const checkPrice = async (sizeId : number) => {
        try {
            const response = await axios.get(`http://localhost:8080/products/${itemId}/${sizeId}`) ;

            if(response.data.msg === 'success' && response.data.code === 1) {
                console.log("Get Price Successfully . . .");
                setAddItem(prevState => ({
                    ...prevState,
                    itemPrice: response.data.data,
                    quantity : 1,
                }));
               
            }
        } catch (error) {
            console.log(error);
        }
        
    }


     const addButton = () => {
        console.log(addItem.itemPrice);
        console.log("click add button");
        
        setAddItem(prevState => ({
            ...prevState,
            quantity: prevState.quantity + 1,
            itemPrice : prevState.itemPrice + (prevState.itemPrice / prevState.quantity)
        }));

        
    };

     const minusButton = () => {
        console.log("click minus button");
        
        setAddItem(prevState => ({
            ...prevState,
            quantity: Math.max(1, prevState.quantity - 1),
            itemPrice: prevState.quantity > 1 ? prevState.itemPrice - (prevState.itemPrice / prevState.quantity) : prevState.itemPrice
        }));
    };

    const navigate = useNavigate();

    const addToCart = async () => {
        console.log(addItem);

        try {
            const response = await axios.post(`http://localhost:8080/products/${itemId}`, addItem);

            if(response.data.msg === 'success' && response.data.code === 1) {
                console.log("Add To Cart Successfully . . .");
                navigate(`/carts/${userId}`);
            }
        } catch (error) {
            console.log(error);
            
        }
    }
   
   return (
    <>
    <Cart userId= {userId} />
    <button
          className="fixed mt-4 right-20 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600"
          onClick={() => navigate(`/products`)}
        >
          EXIT
        </button>

    {/* Useswr */}
    {isLoading && <p>Loading...</p>}
    {error && <p className="text-red-500">Failed to fetch products</p>}

    <div className="flex flex-col bg-primary text-primary-foreground min-h-screen">
        {/* here wrap will make sure it fit the screen not overflow and cut off */}
        <div className="max-w-7xl mx-auto sm:min-w-[1024px] flex flex-1 flex-wrap min-w-7xl">
            {/* small = w-full  small > = w1/2  */}
            {/* use w-full become even thought now is horizontal but each element takes one row so its vertically */}
            <div className="w-full  sm:w-1/2 bg-red-500 min-h-[200px]">
            </div>

            <div className="w-full bg-white sm:flex-1 p-5">
                {/* && must have div */}
                {data && (
                    <div>
                        <h2 className="m-3 text-4xl font-bold">{data.itemName}</h2>
                        <p className="m-3 max-w-screen-md break-words">{data.description}</p>
                        {/* wrap to the next row if exceed container */}
                        <div className="flex flex-wrap gap-2">
                            {data?.variants && data.variants.map((variant : Variants) => 
                            (
                                // small  and up = w-14 smaller u full
                                <button key={variant.sizeId} className={cn("ronded-lg m-2 p-4 border rounded w-full sm:w-14 min-w-fit", 
                                    addItem.sizeId === variant.sizeId && "border-red-500")}
                                onClick={()=> {
                            
                                    setAddItem( ({
                                    ...addItem,
                                    itemName : data.itemName,
                                    sizeId : variant.sizeId,
                                    quantity : 1,
                                    }));

                                    checkPrice(variant.sizeId)
                                }
                                    }> 
                                    {variant.size}
                                </button>
                        ))}
                        </div>
                        
                    </div>
                )
            
                }

                
            </div>
        </div>


        <div className="flex flex-col  sticky bottom-0 w-full mt-auto  p-4  bg-white">  

            <div className="flex justify-end text-4xl m-4">
                <h2>RM {addItem.itemPrice.toFixed(2)}</h2>
            </div>  
           
            <div className="flex justify-end space-x-4">
                
                <button className="border px-4 mb-2"
                onClick={minusButton}
                disabled={addItem.quantity < 2}>
                    -
                </button>
              
                <p>{addItem.quantity}</p>

                <button className="border px-4 mb-2"
                onClick={addButton}>
                    +
                </button>
            </div>
            <button className="bg-blue-500 hover:bg-red-500 py-4 px-6 text-white text-lg rounded-lg "
            onClick={addToCart}>
                Proceed to Checkout
            </button>
        </div>

    </div>
    </>
   );
}  

export default Product;
