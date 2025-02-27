
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
import useSWR from "swr"
  
 


const Inventory : React.FC =  () => {
    type Item = {
        itemId: number
        itemName: string
        onSale : boolean
        description: string
        size: string
        price: number
        stock: number
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

        return (
            <>
                <div className="pt-8 overflow-y-scroll min-h-screen bg-primary text-primary-foreground">
                    <div className="flex justify-center text-2xl py-3 text-bold">
                        Inventory
                    </div>

                    <Table>
                            <TableCaption>A list of Inventory.</TableCaption>
                           

                            <TableHeader>
                                <TableRow>
                                <TableHead className="w-[100px]">Item Id</TableHead>
                                <TableHead>Item Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="">Description</TableHead>
                                <TableHead className="">Size</TableHead>
                                <TableHead className="">Price</TableHead>
                                <TableHead className="">Stock</TableHead>
                                </TableRow>
                            </TableHeader>

                            {isLoading && <p>Loading...</p>}
                            {error && <p className="text-red-500">Failed to fetch inventory</p>}

                        
                            <TableBody>
                            {data && data.map((item :Item) => {
                                return (
                                    <TableRow key={item.itemId}>
                                        <TableCell>{item.itemId}</TableCell>
                                        <TableCell>{item.itemName}</TableCell>
                                        <TableCell>{item.onSale ? "On Sale" : "Not On Sale"}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>{item.size}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>{item.stock}</TableCell>
                                    </TableRow>
                                )
                            })}
                            </TableBody>
                    </Table>

                </div>

            </>
    );
};

export default Inventory;