
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  
import axios from "axios"
import useSWR from "swr"
import { useState } from "react";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

  
 


const Transaction : React.FC =  () => {
    type TransactionType = 
        | "SALE" 
        | "EXPENSE" 
        | "SUPPLIER_PAYMENT" 
        | "SALARY";

    type Transaction = {
        transactionId: number;
        transactionType: TransactionType;
        itemId: number | null; 
        amount: number;
        transactionDate: string; 
        description: string;
    };

    type TransactionResponse = {
            code: number;
            msg: string;
            data: {
                transaction: Transaction[];
                page: number;
                pageLimit: number;
                totalCount: number;
            };
        };

    
      const fetcher = async(url: string) => {
        try{
            const res = await axios.get(url)
            if(res.data.msg === 'success') {
                console.log("Fetched data:", data);

                return res.data
            }
        } catch (error) {
            console.log(error);
            return []
            
        }
      }

      const {data, error, isLoading} = useSWR<TransactionResponse>("http://localhost:8080/admins/transaction", fetcher)

      const[currentPage, setCurrentPage] = useState(1);
      const totalPages = data?.data ? Math.ceil(data.data.totalCount / data.data.pageLimit) : 1;

 
      
        return (
            <>
                <div className="pt-8 overflow-y-scroll min-h-screen bg-primary text-primary-foreground">
                    <div className="flex justify-center text-2xl py-3 text-bold">
                        Transaction
                    </div>
                    <div className="flex flex-col space-y-6 md:flex-row flex-nowrap space-x-6  ">
                        
                        <select name="transactionType" className="w-40">
                            <option value="SALE">SALE</option>
                            <option value="EXPENSE">EXPENSE</option>
                            <option value="SUPPLIER_PAYMENT">SUPPLIER PAYMENT</option>
                            <option value="SALARY">SALARY</option>
                        </select>

                        {/* w-40 size  */}
                        <Input type="number" placeholder="Item Id" className="w-40"/>
                        <Input type="date" placeholder="Start Date" className="w-40" />
                        <Input type="date" placeholder="End Date" className="w-40" />
                        <Button className="ml-auto w-24" type="submit">Search</Button>
                    </div>

                    {isLoading && <p>Loading...</p>}
                    {error && <p className="text-red-500">Failed to fetch transactions</p>}

                    <Table>
                            <TableCaption>A list of Transaction.</TableCaption>
                           

                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Transaction ID</TableHead>
                                    <TableHead>Transaction Type</TableHead>
                                    <TableHead>Item ID</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Transaction Date</TableHead>
                                    <TableHead>Description</TableHead>
                                </TableRow>
                            </TableHeader>

                            

                        
                            <TableBody>
                            {data &&
                                    data.data.transaction.map((item: Transaction) => (
                                        <TableRow key={item.transactionId}>
                                            <TableCell>{item.transactionId}</TableCell>
                                            <TableCell>{item.transactionType}</TableCell>
                                            <TableCell>{item.itemId ?? "N/A"}</TableCell>
                                            <TableCell>${item.amount.toFixed(2)}</TableCell>
                                            <TableCell>
                                                {new Date(item.transactionDate).toLocaleString()}
                                            </TableCell>
                                            <TableCell>{item.description}</TableCell>
                                        </TableRow>
                                ))}
                            </TableBody>
                    </Table>

                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                            <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                            <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                            <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>


                </div>

            </>
    );
};

export default Transaction;