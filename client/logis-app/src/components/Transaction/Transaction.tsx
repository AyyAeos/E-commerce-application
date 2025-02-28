
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
import { useState } from "react";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { CiSquarePlus } from "react-icons/ci";

  
 


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
       
       

        const [editForm, setEditForm] = useState< {transaction: Transaction} | null >(null);

    
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

        return (
            <>
                <div className="pt-8 overflow-y-scroll min-h-screen bg-primary text-primary-foreground">


                    {isLoading && <p>Loading...</p>}
                    {error && <p className="text-red-500">Failed to fetch transactions</p>}

                    <Table>
                            <TableCaption>A list of Transaction.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Transaction ID</TableHead>
                                    <TableHead>Transaction Type</TableHead>
                                    <TableHead>Item ID</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Transaction Date</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Action</TableHead>
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

                                            <div className="space-x-6  ">
                                            <button 
                                            className=" border-2 px-2 py-2 border-black m-2 hover:bg-red-500 "
                                            onClick={() => { 
                                                console.log(`Edit transaction id : ${item.itemId} `);
                                               setEditForm({transaction: item});
                                                
                                            }}
                                            
                                            >Edit

                                            </button>

                                            <button 
                                            className="border-2 px-2 py-2 border-black hover:bg-red-500"
                                            
                                            >Delete

                                            </button>
                                            </div>
                                        </TableRow>
                                ))}
                            </TableBody>
                    </Table>
                </div>

            </>
    );
};

export default Transaction;