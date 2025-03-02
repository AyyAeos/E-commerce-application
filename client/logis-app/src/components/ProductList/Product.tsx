import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { set } from "zod";
import Cart from "../CartBar/Cart";


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

    



const Product = () =>{
    
 




    const { itemId } = useParams();

    const userId = localStorage.getItem("userId");
    
    const fetcher = async (url :string) => {
        try {
            const response = await axios.get(url);

            if (response.data.msg === 'success' && response.data.code === 1) {
                console.log("Fetched data: response.data.data");
                
                return response.data.data;
            }
        
        }catch (error) {
        
        }
    };

   const { data, error, isLoading } = useSWR(`http://localhost:8080/products/${itemId}`, fetcher)

   

   const [addItem, setAddItem] = useState({
    itemId : itemId,
    itemName : "",
    size : "",
    quantity: 1,
    userId :userId,
    })

    const addButton = () => {
        setAddItem(prevState => ({
            ...prevState,
            quantity: prevState.quantity + 1
        }));

        
    };

    const minusButton = () => {
        setAddItem(prevState => ({
            ...prevState,
            quantity: Math.max(1, prevState.quantity - 1)
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
    <Cart />
    {/* Useswr */}
    {isLoading && <p>Loading...</p>}
    {error && <p className="text-red-500">Failed to fetch products</p>}
    <div className="flex flex-col bg-primary text-primary-foreground min-h-screen ">
        <div className="flex-1 flex">
            <div className=" mt-2 w-1/2 bg-red-500">
            </div>

            <div className="mt-2 flex-1 p-5">
                {/* && must have div */}
                {data && (
                    <div>
                        <h2 className="m-3 text-4xl font-bold">{data.itemName}</h2>
                        <p className="m-3">{data.description}</p>
                        {/* wrap to the next row if exceed container */}
                        <div className="flex flex-wrap gap-2">
                            {data?.variants && data.variants.map((variant : Variants) => (
                                // small  and up = w-14 smaller u full
                                <button key={variant.sizeId} className="m-2 p-4 border rounded w-full sm:w-14"
                                onClick={()=> setAddItem({
                                    ...addItem,
                                    itemName : data.itemName,
                                    size : variant.size,
                                    })}> 
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
            <div className="flex justify-end space-x-4">
                <button className="border px-4 mb-2"
                onClick={()=> {minusButton()}}
                    disabled={addItem.quantity <= 0}>
                    -
                </button>
              
                <p>{addItem.quantity}</p>

                <button className="border px-4 mb-2"
                onClick={()=> {addButton()}}>
                    +
                </button>
            </div>
            <button className="py-4 px-6 bg-blue-500 text-white text-lg rounded-lg"
            onClick={addToCart}>
                Proceed to Checkout
            </button>
        </div>

    </div>
    </>
   );
}  

export default Product;
