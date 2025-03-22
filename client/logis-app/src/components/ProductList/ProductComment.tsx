import axios from "axios";
import useSWR from "swr";
export interface CommentList {
    indexId: number;
    userId: number;
    root: number;
    parent: number;
    likeCount: number;
    type: string;
    createTime: string;
    content: string;
    quantity: number;
    itemName: string;
    sizeName: string;
  }
  
export interface Comment {

      itemId: number;
      count: number;
      productCommentLists: CommentList[];
  }

const ProductComment =  ({ itemId }: { itemId: number }) => {
    console.log(itemId);
    

    const fetcher = async (url : string)=> {
        try {
            const response = await axios.get(url);
            if (response.data.msg === "success" && response.data.code === 1) {
              console.log(`Fetched data: `, response.data.data);
              return response.data.data;
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
    }
    const {data , error, isLoading} = useSWR(`http://localhost:8080/products/${itemId}/review`, fetcher)
    return (
        <>
        <h2>hi</h2>
        </>
    )
}

export default ProductComment;