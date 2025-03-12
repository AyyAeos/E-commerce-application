import axios from "axios";
import { useEffect, useState } from "react";
import { mutate } from "swr";

type Variants = {
    size: string;
    price: number;
    stock: number;
    sizeId: number;
};

type Item = {
    itemId: number
    itemName: string
    onSale : number
    description: string
    variants: Variants[]
  }
  
const EditForm = ( {item, variant, onClose} : {item: Item; variant: Variants; onClose :() => void}) => {
    const[FormData, setFormData] = useState( {
        itemName: "",
        price: 0,
        onSale: 0,
        description: "",
        stock: 0,
        size: "",
        sizeId:0,
      });
  
  useEffect(() => {
    if(item) {
        setFormData({
            itemName: item.itemName,
            price: variant.price,
            onSale: item.onSale,
            description: item.description,
            stock: variant.stock,
            size: variant.size,
            sizeId: variant.sizeId,
    });
  }
}, [item, variant]);

const handleSubmit = async (item :Item) => {
        console.log("Form Submitted", FormData);
        try {
            const response = await axios.put(`http://localhost:8080/admins/inventory/${item.itemId}`, FormData);
            if(response.data.msg === 'success' && response.data.code === 1 ) {
                console.log( "Updated");

                //refresh page
                window.location.reload(); 
                
                onClose()
                
            }
        } catch (error) {
            console.error("Error updating item:", error);
        }
};

    return (                   
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
            <p className="mb-4">Editing: 
                <span className="text-cyan-300 pl-4">{FormData.itemName}</span>
            </p>

               {/* Modify Name */}
               <div className="mb-4 flex">
                <label className="mr-4 w-1/2 text-left"> Item Name: </label>
                <input 
                type="text"
                value={FormData.itemName}
                className="border-4 border-slate-500 text-center w-1/2"
                onChange={(e) => setFormData({ ...FormData, itemName: e.target.value})}
                />
            </div>

            <div className="mb-4 flex">
                <label className="mr-4 w-1/2 text-left"> Item Status: </label>
                <select
                    value={FormData.onSale}
                    className="border-4 border-slate-500 text-center w-1/2"
                    onChange={(e) => setFormData({ ...FormData, onSale: parseInt(e.target.value) })}
                >
                    <option value={1}>On Sale</option>
                    <option value={0}>Not On Sale</option>
                </select>
            </div>

            {/* Modify Description */}
            <div className="mb-4 flex">
                <label className="mr-4 w-1/2 text-left"> Description: </label>
                <textarea 
                    value={FormData.description}
                    className="border-4 border-slate-500 text-center w-1/2 resize-y h-28 p-2"
                    onChange={(e) => setFormData({ ...FormData, description: e.target.value})}
                />
            </div>

            {/* Modify Size */}
            <div className="mb-4 flex">
                <label className="mr-4 w-1/2 text-left"> Size: </label>
                <input 
                type="text"
                value={FormData.size}
                className="border-4 border-slate-500 text-center w-1/2"
                onChange={(e) => setFormData({ ...FormData, size: e.target.value})}
                />
            </div>

            {/* Modify Price */}
            <div className="mb-4 flex">
                <label className="mr-4 w-1/2 text-left"> Price : </label>
                <input 
                type="number"
                value={FormData.price}
                className="border-4 border-slate-500 text-center w-1/2"
                onChange={(e) => setFormData({ ...FormData, price: Number(e.target.value)})}
                />
            </div>
            
            {/* Modify Stock */}
            <div className="mb-4 flex">
                <label className="mr-4 w-1/2 text-left"> Stock : </label>
                <input 
                type="number"
                value={FormData.stock}
                className="border-4 border-slate-500 text-center w-1/2"
                onChange={(e) => setFormData({ ...FormData, stock: Number(e.target.value) })}
                />
            </div>

                 <div className="flex justify-between" >
                    <button
                            className="mt-4 px-8 py-2 bg-red-500 text-white rounded "
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <button
                            className="mt-4  px-8 py-2 bg-blue-500 text-white rounded"
                            onClick={() => {handleSubmit(item)}}
                        >
                            Save Changes
                        </button>
                </div>
    </div>
</div>
)
};

export default EditForm;
