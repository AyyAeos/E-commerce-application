import { useState } from "react";






const AddButton =({ onClose }: { onClose: () => void }) => {

    
    const[FormData, setFormData] = useState( {
        itemName: "",
        price: 0,
        onSale:0 ,
        description: "",
        stock: 0,
        size: "",
      });

    const [display, setDisplay] = useState(false);
    return(  
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full px-4 sm:w-[500px] ">
            <h2 className="text-2xl font-bold mb-4">Add an item</h2>

               {/* Modify Name */}
               <div className="mb-4 flex">
                <label className=" w-1/2 text-left"> Item Name : </label>
                <input 
                type="text"
                value={FormData.itemName} //current value
                className="border-4 border-slate-500 text-center w-1/2"
                onChange={(e) => setFormData({ ...FormData, itemName: e.target.value})}  //e.target.value = new value
                >
                </input>
            </div>

            {/* Modify Description */}
            <div className="mb-4 flex">
                <label className=" w-1/2 text-left"> Description : </label>
                <textarea 
                    value={FormData.description}
                    className="border-4 border-slate-500 text-center w-1/2 resize-y h-28 p-2"
                    onChange={(e) => setFormData({ ...FormData, description: e.target.value})}
                />
            </div>

            <div className="mb-4 flex">
            <label className=" w-1/2 text-left"> Item Status : </label>
                <select className="border border-gray-300 rounded px-2 py-1 w-1/2">
                    <option value="">Select Status</option>
                    <option value="1">On Sale</option>
                    <option value="0">Not On Sale</option>
                </select>
                </div>


            <div className="flex items-center justify-center ">
                <p className="w-1/2 text-left ">Size : </p>
            
                 {/* Modify Size */}
            <div className="w-1/2 text-center ">
                <label className=""> Size: </label>
                <input 
                type="text"
                value={FormData.size} 
                className="border-4 border-slate-500 text-center  w-1/2"
                onChange={(e) => setFormData({ ...FormData, size: e.target.value})}  
                >
                </input>
            </div>

            {/* Modify Price */}
            <div className="">
                <label className=""> Price : </label>
                <input  // this is string so need change to number
                type="number"
                value={FormData.price} //current value
                className="border-4 border-slate-500 text-center w-1/2"
                onChange={(e) => setFormData({ ...FormData, price: Number(e.target.value)})}  
                >
                </input>
            </div>

            
            {/* Modify Price */}
            <div className="">
                <label className=""> Stock : </label>
                <input 
                type="number"
                value={FormData.stock} 
                className="border-4 border-slate-500 text-center w-1/2"
                onChange={(e) => setFormData({ ...FormData, stock: Number(e.target.value) })} 
                >
                </input>
            </div>

            </div>

           

                    <div className="flex justify-between">
                            <button
                                    className="mt-4 px-8 py-2 bg-red-500 text-white rounded "
                                   onClick={()=> {
                                    onClose()
                                   }}
                                >
                                    No
                                </button>
                                <button
                                    className="mt-4  px-8 py-2 bg-blue-500 text-white rounded"
                                    onClick={() => {
                                        console.log(FormData);
                                        
                                    }}
                                >
                                    Yes
                                </button>
                        </div>


            <div>

            </div>

            </div>

        </div>

    );
    
    
 
}
export default AddButton;