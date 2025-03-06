
import EditForm from "@/components/Inventory/EditForm";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import axios from "axios"
import {  useState } from "react";
import useSWR from "swr"
import DeleteItem from "./DeleteForm";
import { CiSquarePlus } from "react-icons/ci";
import AddButton from "./AddForm";

import SearchForm from "./SearchForm";
  
const Inventory : React.FC =  () => {

    const [searchForm, setSearchForm] = useState({
        itemName: "",
        status: "",
        startPrice: "",
        endPrice: "",
    });

    type Variants = {
        size: string;
        price: number;
        stock: number;
        sizeId: number;
    };

    type Item = {
        itemId: number
        itemName: string
        onSale : boolean
        description: string
        variants: Variants[]
      }
    
      const fetcher = async(url: string) => {
        try{
            const res = await axios.get(url)
            if(res.data.msg === 'success') {
                return res.data.data
            }
        } catch (error) {
            console.log(error);
            return []
            
        }
      }

      const {data, error, isLoading} = useSWR("http://localhost:8080/admins/inventory", fetcher)

      // Display the edit box
      const[EditItem, SetEditItem] = useState< { item: Item; variant: Variants} | null>(null); 

      //Display delete comfirmation box
      const[DeleteComfirmation, SetDeleteComfirmation] = useState<{item : Item ;variant: Variants} | null >(null);

      const[AddPage, SetAddPage] = useState(false);

        return (
            <>
                <div className="pt-8 overflow-y-scroll min-h-screen bg-primary text-primary-foreground">
                <div className="flex justify-center text-2xl font-bold">
                    {/*  let inventory take all space and other pull to right */}
                    <span className="flex-1 text-center">Inventory</span>
                    <CiSquarePlus 
                    className="ml-16 text-5xl "
                    onClick={() =>{
                        console.log("Add button Pressed");
                        SetAddPage(true);
                    } }
                     /> 
                </div>

                {/* Display add form */}
                { AddPage && <AddButton onClose={() => SetAddPage(false)} />}

                <SearchForm  searchFormData={searchForm} setSearchFormData={setSearchForm} />
                
                    {isLoading && <p>Loading...</p>}
                    {error && <p className="text-red-500">Failed to fetch inventory</p>}
                    <Table>
                            <TableCaption>A list of Inventory.</TableCaption>
                           

                            <TableHeader>
                                <TableRow>
                                <TableHead className="w-[100px]">Item Id</TableHead>
                                <TableHead>Item Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="">Description</TableHead>
                                <TableHead className="">Size Id</TableHead>
                                <TableHead className="">Size</TableHead>
                                <TableHead className="">Price</TableHead>
                                <TableHead className="">Stock</TableHead>
                                <TableHead className="">Action</TableHead>
                                </TableRow>
                            </TableHeader>

                           

                        
                            <TableBody>
                            {data &&
                                data.map((item: Item) => 
                                item.variants.map((variant, index) => (
                                    <TableRow key={`${item.itemId}-${variant.sizeId}`}>
                                    {index === 0 && (
                                        <>
                                        <TableCell rowSpan={item.variants.length}>{item.itemId}</TableCell>
                                        <TableCell rowSpan={item.variants.length}>{item.itemName}</TableCell>
                                        <TableCell rowSpan={item.variants.length}>{item.onSale ? "On Sale" : "Not On Sale"}</TableCell>
                                        <TableCell rowSpan={item.variants.length}>{item.description}</TableCell>
                                        </>
                                    )}
                                    {/* Variant-specific columns */}
                                    <TableCell>{variant.sizeId}</TableCell>
                                    <TableCell>{variant.size}</TableCell>
                                    <TableCell>{variant.price}</TableCell>
                                    <TableCell>{variant.stock}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-6">
                                        <button
                                            className="border-2 border-black px-2 py-2 hover:bg-red-500"
                                            onClick={() => SetEditItem({ item, variant })}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="border-2 border-black px-2 py-2 hover:bg-red-500"
                                            onClick={() => SetDeleteComfirmation({variant, item})}
                                        >
                                            Delete
                                        </button>
                                        </div>
                                    </TableCell>
                                    </TableRow>
                                ))
                                )}
                            </TableBody>

                   
                    {/* Edit and delete page */}
                    {EditItem && <EditForm item = {EditItem.item} variant={EditItem.variant} onClose={() => SetEditItem(null) }/>} 
                    {DeleteComfirmation && <DeleteItem item = {DeleteComfirmation.item} variant = {DeleteComfirmation.variant} onClose={() => SetDeleteComfirmation(null)} />}
                    </Table>
                </div>

            </>
    );
}

export default Inventory;