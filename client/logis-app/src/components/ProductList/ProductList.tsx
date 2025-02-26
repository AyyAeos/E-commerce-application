
    //     "code": 1,
    //     "msg": "success",
    //     "data": [
    //         {
    //             "itemId": 1,
    //             "itemName": "Laptop",
    //             "description": "High-performance laptop",
    //             "variants": [
    //                 {
    //                     "size": "30",
    //                     "stock": 40,
    //                     "price": 50.00
    //                 },
    //                 {
    //                     "size": "20",
    //                     "stock": 30,
    //                     "price": 40.00
    //                 },
    //                 {
    //                     "size": "16GB RAM, 512GB SSD",
    //                     "stock": 10,
    //                     "price": 1200.00
    //                 }
    //             ]
    //         },
    //         {
    //             "itemId": 2,
    //             "itemName": "Headphones",
    //             "description": "Noise-cancelling headphones",
    //             "variants": [
    //                 {
    //                     "size": "Over-Ear",
    //                     "stock": 20,
    //                     "price": 200.00
    //                 }
    //             ]
    //         }
    //     ]
    // }
    import axios from 'axios';
import useSWR from 'swr'
import { Button } from "@/components/ui/button"

    export default function ProductList() {
        type Product = {
            itemId: number;
            itemName: string;
            description: string;
            variants: Variant[];
        }

        type Variant = {
            size: string;
            stock: number;
            price: number;
        }
    
        const fetcher = async ( url: string) => {
            try {
                const res = await axios.get(url)
                if(res.data.msg === 'success') {
                    return res.data.data
                }
                
            } catch (error) {
                console.log(error);
                return []
                
            }
        }
    const { data, error, isLoading } = useSWR(`http://localhost:8080/products`, fetcher)

    let priceMap = new Map();

    data?.forEach((product: Product) => {
        product.variants.forEach((variant: Variant) => {
            if(!priceMap.has(product.itemId)) {
                priceMap.set(product.itemId, { min: Number.MAX_VALUE, max: -Number.MAX_VALUE})
            }
            priceMap.set(product.itemId, {min: Math.min(priceMap.get(product.itemId).min, variant.price), max: Math.max(priceMap.get(product.itemId).max, variant.price) })
        })
    })

    //fake data
    const test = Array(100).fill(0).map((_, i) => i)
    
    return (
        //overflow y = scroll bar
        <div className="p-5 overflow-y-scroll">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Failed to fetch products</p>}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            {data && data.map((product: Product) =>  {
                
                return (
                    <div key={product.itemId} className="border p-4 rounded-lg shadow">
                    <h2 className="text-xl font-bold">{product.itemName}</h2>
                    <p className="text-sm mb-2">{product.description}</p>
                    <ul className="text-sm space-y-2 flex gap-3 justify-around items-center">
                        <li className='mt-3'>
                            ${priceMap.get(product.itemId).min == priceMap.get(product.itemId).max ? 
                            priceMap.get(product.itemId).min  :
                            priceMap.get(product.itemId).min + "..." + priceMap.get(product.itemId).max }
                        </li>
                        <li>
                            <Button variant="outline">Button</Button>
                        </li>

                    </ul>

                </div>

                )
            }
            )}
            {/* fake data when pass js variable to html  use this format and map*/}
           
            {
                test.map((i) => (<div>{i}</div>))
            }
        </div>
    </div>
    )
}