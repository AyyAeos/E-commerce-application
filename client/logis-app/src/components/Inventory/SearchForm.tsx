import { SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";


type SearchFormDataType = {
    itemName: string
    status: string
    startPrice: number
    endPrice: number
    totalCounts: number ,
    page: number,
    pageLimits: number,
}


const SearchForm = ({ searchFormData, setSearchFormData, handleSubmit } : {
    searchFormData: SearchFormDataType
    setSearchFormData: React.Dispatch<SetStateAction<SearchFormDataType>>
    handleSubmit: () => void
}) => {



    return (
        <>
            <div className="sm:flex items-center space-x-4 py-2">
                <div className="w-full sm:w-1/4 space-y-2">
                    <Label htmlFor="itemName">Item Name : </Label>
                    <Input
                        id="itemName"
                        type="text"
                        placeholder="Item Name"
                        value={searchFormData.itemName}
                        onChange={(e) => setSearchFormData({ ...searchFormData, itemName: e.target.value })}
                    />
                </div>

                <div className="w-full sm:w-1/4 space-y-2">
                    <Label htmlFor="itemStatus">Item Status : </Label>
                    <Input
                        id="itemStatus"
                        type="text"
                        placeholder="Status"
                        value={searchFormData.status}
                        onChange={(e) => setSearchFormData({ ...searchFormData, status: e.target.value })}
                    />
                </div>

                <div className="w-full sm:w-1/4 space-y-2">
                    <Label htmlFor="startPrice">Start Price : </Label>
                    <Input
                        id="startPrice"
                        type="number"
                        placeholder="Start Price"
                        value={searchFormData.startPrice}
                        onChange={(e) => setSearchFormData({ ...searchFormData, startPrice: Number(e.target.value) < 0 ? 0 : Number(e.target.value) })}
                    />
                </div>

                <div className="w-full sm:w-1/4 space-y-2">
                    <Label htmlFor="endPrice">End Price : </Label>
                    <Input
                        id="endPrice"
                        type="number"
                        placeholder="End Price"
                        value={searchFormData.endPrice}
                        onChange={(e) => setSearchFormData({ ...searchFormData, endPrice: Number(e.target.value) < 0 ? 0 : Number(e.target.value)})}
                    />
                </div>
            </div>

            <div className="sm:flex items-center space-x-4 py-2">
                <div className="w-full sm:w-1/4 space-y-2">
                    <Label htmlFor="totalCounts">Total Counts : </Label>
                    <Input
                        id="totalCounts"
                        type="number"
                        value={searchFormData.totalCounts}
                        onChange={(e) => setSearchFormData({ ...searchFormData, totalCounts: Number(e.target.value) })}
                    />
                </div>

                <div className="w-full sm:w-1/4 space-y-2">
                    <Label htmlFor="page">Page : </Label>
                    <Input
                        id="page"
                        type="number"
                        value={searchFormData.page}
                        onChange={(e) => setSearchFormData({ ...searchFormData, page: Number(e.target.value) })}
                    />
                </div>

                <div className="w-full sm:w-1/4 space-y-2">
                    <Label htmlFor="pageLimits">Page Limits : </Label>
                    <Input
                        id="pageLimits"
                        type="number"
                        value={searchFormData.pageLimits}
                        onChange={(e) => {setSearchFormData({ ...searchFormData, pageLimits: Number(e.target.value) })}}
                    />
                </div>

                <button
                    type="button"
                    className="mt-10 px-4 py-2 bg-blue-500 text-white rounded mb-2 w-full sm:w-1/4"
                    onClick={handleSubmit}
                >
                    Search
                </button>
            </div>
        </>
    );
};

export default SearchForm;
