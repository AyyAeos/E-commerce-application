import axios from "axios";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import Cart from "../CartBar/Cart";
import OrderIcon from "./OrderIcon";

type OrderItem = {
  cartId: number;
  itemId: number;
  quantity: number;
  sizeId: number;
  itemName: string;
  sizeName: string;
};


type Order = {
  orderId: string;
  userId: number;
  placedAt: string;
  updatedAt: string;
  status: string;
  items: OrderItem[];
  isExpired: boolean;
};

const CheckOrder = () => {
  const userId = localStorage.getItem("userId") ?? "";
 
  const navigate = useNavigate();

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);
      if (response.data.msg === "success" && response.data.code === 1) {
        console.log(response.data.data);
        return response.data.data;
      }
    } catch (error) {
      return [];
    }
  };


  const { data: orders = [], error, isLoading } = useSWR(
    `http://localhost:8080/orders/${userId}`,
    fetcher
  );

  const DeleteOrder = ({ placeDate }: { placeDate: Order }) => {
    const currentDate = new Date();
    const targetDate = new Date(placeDate.placedAt)
    const timeDifference = currentDate.getTime() - targetDate.getTime();

    const twoDays = 2 * 24 * 60 * 60 * 1000;

      const expired = timeDifference > twoDays;
  
      if (!expired) {
        placeDate.isExpired = false;
      }
  
      return (
        <>
          {placeDate.isExpired === false && (
            <button className="font semi-bold border border-black md:px-4 md:py-2 mt-4 hover:bg-slate-500 hover:text-white">
              Delete Order
            </button>
          )}
        </>
      );
    };

  return (
    <div className="bg-primary text-primary-foreground min-h-screen">
      <Cart userId={userId} />
      <button
        className="fixed mt-4 right-20 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600"
        onClick={() => navigate(`/products`)}
      >
        EXIT
      </button>
      <OrderIcon userId={userId} />

      {isLoading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">
          Please refresh the page or click EXIT on the top right!
        </p>
      ) : orders.length === 0 ? (
        <p className="text-red-500">
          No orders found. Please click EXIT on the top right!
        </p>
      ) : (
        <div className="px-5 sm:px-10 md:px-20">
          <h1 className="py-4 text-2xl sm:text-4xl md:text-6xl xl:text-8xl font-bold px-2 mb-4 text-center">
            Your Orders
          </h1>
          <div className="flex flex-col gap-5">
            {orders.map((order : Order) => (
              <div
                key={order.orderId}
                className="bg-white shadow-lg rounded-lg p-5 border" >

                <p className="font-semibold text-xl text-end">Status : {order.status}</p>

                <p className="text-gray-600 text-end text-md">
                  Last Updated Date: {new Date(order.updatedAt).toLocaleString()}
                </p>
               

                <div className="mt-4">
                  {order.items.map((item : OrderItem , index : number) => (
                    <div
                      key={index}
                      className="border p-3 rounded-lg mb-2 bg-gray-100"
                    >
                      <p>
                        <span className="font-semibold">Item:</span>{" "}
                        {item.itemName}
                      </p>
                      <p>
                        <span className="font-semibold">Size:</span>{" "}
                        {item.sizeName}
                      </p>
                      <p>
                        <span className="font-semibold">Qty:</span>{" "}
                        {item.quantity}
                      </p>
                    </div>
                  ))}
                </div>


               

                  <div className="flex flex-wrap justify-between">
                    <div className="w-1/2">
           

                <p className="text-lg font-bold mt-4">
                  Total Items: {order.items.length}
                </p>

                <p className="text-gray-600">
                  Created Date: {new Date(order.placedAt).toLocaleString()}
                </p>

                <p className="text-gray-600">
                  Order id: {order.orderId}
                </p>
                    </div>
                  
                  <DeleteOrder placeDate={order} />
          
               
                  <button
                    className="border border-black px-4 py-2 mt-4 hover:bg-slate-500 hover:text-white">
                    Write A Review !
                  </button>


              
                  
              
                  </div>
                
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOrder;
