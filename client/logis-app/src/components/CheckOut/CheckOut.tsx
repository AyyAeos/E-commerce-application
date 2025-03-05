import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import axios from 'axios';


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


const Checkout = () => {

    //receive props
    const location = useLocation();
    const { selectedItems = [], totalPrice = 0 } = location.state || {};
    const userId = localStorage.getItem("userId")
    const navigate = useNavigate()

    //useState for comfirmation message for comfirm button
    const[comfirmationMessage, setComfirmationMessage] = useState<Boolean>(false);
    const[orderPlaced, setOrderPlaced] = useState<Boolean>(false);

    //Go back and Comfirm button
    const placeOrder = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/checkouts/${userId}`
                ,selectedItems
                )
            if(response.data.msg === "success" && response.data.code ===1) {
                setOrderPlaced(true)
                setComfirmationMessage(false)
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <div className='flex justify-center min-h-screen bg-primary text-foreground px-4 overflow-x-hidden '>

            {/* max witdth is 3xl */}
            <div className='w-full max-w-3xl flex flex-col justify-center items-center '>
                <h1 className=' text-4xl m-4 text-center'>Checkout Page</h1>
                <div className='border bg-cyan-500 w-full p-4 rounded-lg '>
                    <ul>
                        {selectedItems.map((item : Item) => (
                            // gap = good for all screen
                            <li key={item.sizeId} className='grid grid-cols-3 gap-4 items-center py-2 border-b'>
                              
                                    <span className='text-2xl font-bold '>{item.itemName}</span>
                                    <span className='text-center'>{item.size}</span>
                                    <span className='text-right'>{item.price} * RM {item.quantity} = RM {item.price * item.quantity}</span>
                              
                            </li>
                        ))}
                    </ul>
                </div>

                
                 <h2 className='border-4 border-black bg-orange-500 w-full text-3xl text-right p-2 mt-4'>Total Price: RM {totalPrice}</h2>

                <div className='flex m-4 px-2 py-2 justify-center gap-4'>
                    <Button className='w-48'
                    onClick={()=> {
                        navigate(`/carts/${userId})`)
                    }}>
                        Go back
                    </Button>

                    <Button className='w-48'
                    onClick={()=> {
                    setComfirmationMessage(true)
                    }}>
                        Comfirm
                    </Button>
                </div>


              {comfirmationMessage && (
                <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center p-4">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <p className="text-2xl text-center">Are you sure to proceed?</p>
                        <div className="flex justify-center gap-4 mt-6">
                            <Button className="w-32 text-lg" onClick={() => setComfirmationMessage(false)}>No</Button>
                            <Button className="w-32 text-lg" onClick={placeOrder}>Yes</Button>
                        </div>
                    </div>
                </div>
            )}
             {orderPlaced && (
                <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center p-4">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md text-center">
                        <p className="text-2xl">Your order has been placed!</p>
                        <Button className="text-xl mt-6 w-full" onClick={() => navigate("/")}>
                            Back to home page
                        </Button>
                    </div>
                </div>
            )}
                
        </div>
    </div>
    );
};

export default Checkout;

// w-full + max-w + px-4