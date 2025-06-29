import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import Cart from "../CartBar/CartIcon";
import OrderIcon from "./OrderIcon";
import { useState } from "react";
import WriteReview from "./Review";
import axiosInstance from "@/utils/axiosInstance";

type OrderItem = {
  cartId: number;
  itemId: number;
  quantity: number;
  sizeId: number;
  itemName: string;
  sizeName: string;
};

export type Order = {
  orderId: string;
  placedAt: string;
  updatedAt: string;
  status: string;
  items: OrderItem[];
  isExpired: boolean;
};

const CheckOrder = () => {

  const navigate = useNavigate();

  const fetcher = async (url: string) => {
    try {
      const response = await axiosInstance.get(url);
      if (response.data.msg === "success" && response.data.code === 1) {
        console.log(response.data.data);
        return response.data.data;
      }
    } catch (error) {
      return [];
    }
  };

  const {
    data: orders = [],
    error,
    isLoading,
  } = useSWR(`/orders`, fetcher);

  const DeleteOrder = ({ placeDate }: { placeDate: Order }) => {
    const currentDate = new Date();
    const targetDate = new Date(placeDate.placedAt);
    const timeDifference = currentDate.getTime() - targetDate.getTime();

    const twoDays = 2 * 24 * 60 * 60 * 1000;

    const expired = timeDifference > twoDays;

    if (!expired) {
      placeDate.isExpired = false;
    }

    return (
      <>
        {placeDate.isExpired === false && (
          <button className="font semi-bold border border-black md:px-4 md:py-2 hover:bg-slate-500 hover:text-white">
            Delete Order
          </button>
        )}
      </>
    );
  };
  const [review, setReview] = useState<boolean>(false);

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null); // To store the full order details

  const handleWriteReview = (order: Order) => {
    setSelectedOrderId(order.orderId); // Set the selected order's ID
    setSelectedOrder(order); // Pass the full order details to the state
  };

  return (
    <div className="bg-primary text-primary-foreground min-h-screen">
      <Cart  />
      <button
        className="fixed mt-4 right-20 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600"
        onClick={() => navigate(`/products`)}
      >
        EXIT
      </button>
      <OrderIcon  />

      {isLoading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">
          Please refresh the page or click EXIT on the top right!
        </p>
      ) : orders.length === 0 ? (
        <p className="text-red-500 text-center pt-20 text-4xl">
          No orders found. Please click EXIT on the top right!
        </p>
      ) : (
        <div className="p-4 pt-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
            Your Orders
          </h1>
          <div className="flex flex-col gap-5">
            {orders.map((order: Order) => (
              <div
                key={order.orderId}
                className="bg-white shadow-lg rounded-lg p-5 border"
              >
                <p className="font-semibold text-xl text-end">
                  Status : {order.status}
                </p>

                <p className="text-gray-600 text-end text-md">
                  Last Updated Date:{" "}
                  {new Date(order.updatedAt).toLocaleString()}
                </p>

                <div className="mt-4">
                  {order.items.map((item: OrderItem, index: number) => (
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

                    <p className="text-gray-600">Order id: {order.orderId}</p>
                  </div>

                  <div className="flex justify-end gap-4 mt-4">
                    <DeleteOrder placeDate={order} />
                    <button
                      className="border border-black px-4 py-2 hover:bg-slate-500 hover:text-white"
                      onClick={() => handleWriteReview(order)} // Pass the full order to WriteReview
                    >
                      Write A Review!
                    </button>
                    {selectedOrderId === order.orderId && selectedOrder && (
                      <WriteReview
                        order={selectedOrder}
                        onClose={() => setSelectedOrderId(null)}
                      />
                    )}
                  </div>
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
