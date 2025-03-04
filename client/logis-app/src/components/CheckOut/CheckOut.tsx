import React from 'react';
import { useLocation } from 'react-router-dom';


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
    const location = useLocation();
    const { selectedItems = [], totalPrice = 0 } = location.state || {};

    return (
        <div>
        <h1>Checkout Page</h1>
        <h2>Total Price: RM {totalPrice}</h2>
        <h3>Selected Items:</h3>
        <ul>
            {selectedItems.map((item : any) => (
                <li key={item.sizeId}>
                    {item.itemName} ({item.quantity} x RM {item.price}) = RM {item.quantity * item.price}
                </li>
            ))}
        </ul>
    </div>
    );
};

export default Checkout;