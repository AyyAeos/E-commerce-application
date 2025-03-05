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
            const response = await axios.post(`localhost:8080/checkout/${userId}`)
            if(response.data.msg === "success" && response.data.code ===1) {
                setOrderPlaced(true)
                setComfirmationMessage(false)
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <div className='min-h-screen bg-primary text-foreground'>
            <div className='flex flex-col'>
                <h1 className='w-full text-4xl flex justify-center items-center m-7'>Checkout Page</h1>

                
                <div className='border border-red-500 bg-cyan-500'>
                    <h3>Selected Items : 4</h3>
                    <ul>
                        {selectedItems.map((item : Item) => (
                            <li key={item.sizeId}>
                                {item.itemName} ({item.quantity} x RM {item.price}) = RM {item.quantity * item.price}
                            </li>
                        ))}
                    </ul>
                </div>

                
                 <h2 className='border-4 border-black bg-orange-500 w-full text-3xl flex justify-end'>Total Price: RM {totalPrice}</h2>

                <div className='flex m-4 px-2 py-2 justify-center space-x-48'>
                    <Button className='w-48'>
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
                    <div className='fixed inset-0 bg-black min-h-screen bg-opacity-20 flex justify-center items-center'>
                        <div className='flex flex-col'>
                            <div className='bg-white w-full p-10 text-4xl'>
                                <p className='flex justify-center'> Are you sure to proceed ? </p>
                                <div className='flex justify-center space-x-48 mt-14'>
                                    <Button className='text-2xl px-4 py-2 w-32'
                                    onClick={() => setComfirmationMessage(false)}>
                                        No
                                    </Button>

                                    <Button className='text-2xl px-4 py-2 w-32' 
                                        onClick={placeOrder}
                                        > 
                                        Yes
                                    </Button>
                                </div>

                            </div>

                        </div>
                    </div>
        )}
        {
            orderPlaced && (
                <div className='fixed inset-0 bg-black min-h-screen bg-opacity-20 flex justify-center items-center'>
               
                    <div className='bg-white p-10 text-4xl'>
                        <div className='flex flex-col justify-center items-center mt-14'>
                            <span>
                                Your order has been placed!
                            </span>
                            <Button className='text-xl px-4 py-2 mt-14'
                            onClick={() => navigate("/")}
                            >
                                Back to home page
                            </Button>
                        </div>
                </div>
            </div>
            )
        }
                
        </div>
    </div>
    );
};

export default Checkout;