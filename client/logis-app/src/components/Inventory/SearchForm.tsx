import { useState } from "react";
import { Input } from "@/components/ui/input"; // Ensure you're importing the Input component correctly



const SearchForm = () => {
    const [formData, setFormData] = useState({
        itemName: "",
        status: "",
        startPrice: "",
        endPrice: "",
    });



    const handleSubmit = () => {
        console.log("Submitting Form:", formData);
    };

    return (
        <>
        <div className="flex items-center space-x-4 py-2">
            <Input
                type="text"
                placeholder="Item Name"
                value={formData.itemName}
                onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                 className="w-1/4"
            />
            <Input
                type="text"
                placeholder="Status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-1/4"
            />
            <Input
                type="number"
                placeholder="Start Price"
                value={formData.startPrice}
                onChange={(e) => setFormData({ ...formData, startPrice: e.target.value })}
                  className="w-1/4"
            />
            <Input
                type="number"
                placeholder="End Price"
                value={formData.endPrice}
                onChange={(e) => setFormData({ ...formData, endPrice: e.target.value })}
                  className="w-1/4"
            />

            {/* Submit Button */}
            <button
                type="button"
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded mb-2"
                onClick={handleSubmit}
            >
                Search
            </button>
        </div>

      

        </>
        
    );
};

export default SearchForm;
