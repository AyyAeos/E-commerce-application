import axios from "axios";
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

const DeleteItem =({item, variant, onClose} :{item :Item ; variant: Variants; onClose :()=> void} )=> {

    const DeleteSize = async (variant: Variants, item: Item) => {
        const response = await axios.delete(`http://localhost:8080/admins/inventory/${item.itemId}?sizeId=${variant.sizeId}`);

        if(response.data.msg ==='success' && response.data.code == 1) {
            console.log("Deleted data");
            
                 mutate("http://localhost:8080/admins/inventory"); 
                
                onClose()
        }
     }


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Delete Comfirmation</h2>
            <p className="mb-4 flex flex-col">Deleting: 
                <span className="text-cyan-300 py-2">Size id :  {variant.sizeId}</span>
                <span className="text-cyan-300 py-2">Size : {variant.size}</span>
                <div>

                    <label className=""> Item Name : </label>
                </div>
                
                
            </p>


                <div className="flex justify-between">
                    <button
                            className="mt-4 px-8 py-2 bg-red-500 text-white rounded "
                            onClick={onClose}
                        >
                            No
                        </button>
                        <button
                            className="mt-4  px-8 py-2 bg-blue-500 text-white rounded"
                            onClick={() => {DeleteSize (variant, item)}}
                        >
                            Yes
                        </button>
                </div>

            </div>
            
        </div>
    );
}

export default DeleteItem;
    
