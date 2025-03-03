import { SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input"; // Ensure you're importing the Input component correctly

type SearchFormDataType = {
    itemName: string
    status: string
    startPrice: string
    endPrice: string
}


const SearchForm = ({ searchFormData, setSearchFormData } : {
    searchFormData: SearchFormDataType
    setSearchFormData: React.Dispatch<SetStateAction<SearchFormDataType>>
}) => {
    const handleSubmit = () => {
        console.log("Submitting Form:", searchFormData);

    };

    return (
        <>
        <div className="flex items-center space-x-4 py-2">
            <Input
                type="text"
                placeholder="Item Name"
                value={searchFormData.itemName}
                onChange={(e) => setSearchFormData({ ...searchFormData, itemName: e.target.value })}
                 className="w-1/4"
            />
            <Input
                type="text"
                placeholder="Status"
                value={searchFormData.status}
                onChange={(e) => setSearchFormData({ ...searchFormData, status: e.target.value })}
                  className="w-1/4"
            />
            <Input
                type="number"
                placeholder="Start Price"
                value={searchFormData.startPrice}
                onChange={(e) => setSearchFormData({ ...searchFormData, startPrice: e.target.value })}
                  className="w-1/4"
            />
            <Input
                type="number"
                placeholder="End Price"
                value={searchFormData.endPrice}
                onChange={(e) => setSearchFormData({ ...searchFormData, endPrice: e.target.value })}
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
