import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

type OrderItem = {
  itemName: string;
  size: string;
  quantity: number;
  price: number;
};

type Order = {
  orderId: number;
  orderDate: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
};


const CheckOrder = () => {
  const userId = localStorage.getItem("userId") ?? "";
  const [orders, setOrders] = useState<Order[]>([]);

  const fetcher = async (url :string) => {
       const response = await axios.get(url);

      if(response.data.msg === 'success' && response.data.code === 1) {
        return response.data.data;
      }

  }

  const {data, error, isLoading} = useSWR(`http://localhost:8080/orders/${userId}`, fetcher);

  return (
    <div className="bg-primary text-primary-foreground min-h-screen">
      <div className="px-20">
        <h1 className="text-2xl sm:text-4xl md:text-6xl xl:text-8xl font-bold px-2 mb-4 text-center">Your Orders</h1>

        {isLoading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-red-500">No orders found.</p>
        ) : (
          <div className="flex flex-col gap-5">
            {orders.map((order) => (
              <div key={order.orderId} className="bg-white shadow-lg rounded-lg p-5 border">
                <h2 className="text-xl font-bold">Order ID: {order.orderId}</h2>
                <p className="text-gray-600">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                <p className="text-gray-600">Status: {order.status}</p>

                <div className="mt-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="border p-3 rounded-lg mb-2 bg-gray-100">
                      <p>
                        <span className="font-semibold">Item:</span> {item.itemName}
                      </p>
                      <p>
                        <span className="font-semibold">Size:</span> {item.size}
                      </p>
                      <p>
                        <span className="font-semibold">Qty:</span> {item.quantity}
                      </p>
                      <p>
                        <span className="font-semibold">Price:</span> RM {item.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="text-lg font-bold mt-4">Total: RM {order.totalAmount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckOrder;