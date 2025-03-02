import axios from "axios";
import useSWR from "swr";




const Product = () =>{
    

type  SelectedProduct = {
   

}
  

   const fetcher = async (url: string) => {
        const response = await axios.get(url);
        try {
            if(response.data.msg === 'success' && response.data.code === 1) {
                return response.data.data;
            }
        }
        catch (error) {
            console.log(error);
            return [];
            
        }
   }

   const { data, error, isLoading } = useSWR(`http://localhost:8080/products`, fetcher)

   const userId = localStorage.getItem("userId");
   console.log(userId);
   return (
  
   
    
    <>
    <div>
    {/* Useswr */}
    {isLoading && <p>Loading...</p>}
    {error && <p className="text-red-500">Failed to fetch products</p>}





    </div>
    </>
   );
}  

export default Product;
