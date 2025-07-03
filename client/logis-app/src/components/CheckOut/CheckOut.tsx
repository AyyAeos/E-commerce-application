import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

import { FaArrowLeft, FaTimes, FaCheck } from "react-icons/fa";
import axiosInstance from "@/utils/axiosInstance";

type Item = {
  cartId: number;
  itemId: number;
  quantity: number;
  sizeId: number;
  size: string;
  updatedAt: string;
  itemName: string;
  price: number;
};

const Checkout = () => {
  const location = useLocation();
  const { placeOrderDTOS = [], totalPrice = 0 } = location.state || {};
  const navigate = useNavigate();

  //useState for comfirmation message for comfirm button
  const [confirmationMessage, setConfirmationMessage] =
    useState<Boolean>(false);
  const [orderPlaced, setOrderPlaced] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  //Go back and Comfirm button
  const placeOrder = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(`/checkouts`, placeOrderDTOS);
      if (response.data.msg === "success" && response.data.code === 1) {
        setOrderPlaced(true);
        setConfirmationMessage(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center p-4 pt-16">
      <button
        className="fixed top-24 right-4 bg-white/10 text-white p-3 rounded-full shadow-lg hover:bg-white/20 hover:scale-[1.2]"
        onClick={() => navigate(`/products`)}
      >
        <FaTimes size={20} />
      </button>

      <button
        className="fixed top-24 left-4 bg-white/10 text-white p-3 rounded-full shadow-lg hover:bg-white/20 hover:scale-[1.2]"
        onClick={() => navigate(`/carts`)}
      >
        <FaArrowLeft size={20} />
      </button>

      <div className="max-w-6xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
          Checkout
        </h1>

        {placeOrderDTOS?.length > 0 ? (
          <div className="bg-white/10 rounded-2xl border border-white/20 shadow-xl mb-8">
            {/* Header */}
            <div className="flex rounded-t-2xl bg-white/20 text-white p-4 font-medium text-sm md:text-base">
              <div className="w-1/3 text-center">Item</div>
              <div className="w-1/3 text-center">Size</div>
              <div className="w-1/3 text-center">Price</div>
            </div>

            {/* Items */}
            <div className="divide-y divide-white/10">
              {placeOrderDTOS.map((item: Item) => (
                <div
                  key={item.sizeId}
                  className="flex text-sm md:text-base items-center p-4 hover:bg-white/5"
                >
                  <div className="w-1/3 text-center text-white font-medium">
                    {item.itemName}
                  </div>
                  <div className="w-1/3 text-center text-pink-100">
                    {item.size}
                  </div>
                  <div className="w-1/3 text-center text-white font-medium">
                    RM {item.price.toFixed(2)} × {item.quantity} = RM{" "}
                    {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end p-4 bg-white/5 rounded-b-2xl">
              <div className="text-white text-xl font-bold">
                Total:{" "}
                <span className="text-pink-100">
                  RM {totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl text-center">
            <p className="text-white text-xl">No items selected!</p>
          </div>
        )}

        {placeOrderDTOS?.length > 0 && (
          <div className="flex justify-center gap-4">
            <Button
              className="py-6 px-8 text-lg font-medium rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center gap-2"
              onClick={() => navigate(`/carts`)}
            >
              <FaArrowLeft size={16} />
              <span>Back to Cart</span>
            </Button>

            <Button
              className="py-6 px-8 text-lg font-medium rounded-xl bg-black hover:scale-105 flex items-center justify-center gap-2"
              onClick={() => setConfirmationMessage(true)}
            >
              <FaCheck size={16} />
              <span>Confirm Order</span>
            </Button>
          </div>
        )}
      </div>

      {confirmationMessage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-20">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Confirm Your Order
            </h2>
            <p className="text-white text-center mb-8">
              Are you sure you want to place this order?
            </p>
            <div className="flex justify-center gap-4">
              <Button
                className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl"
                onClick={() => setConfirmationMessage(false)}
              >
                Cancel
              </Button>
              <Button className="px-6 py-3 bg-black" onClick={placeOrder}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

      {orderPlaced === true && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-20">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheck size={30} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Order Placed Successfully!
            </h2>
            <p className="text-pink-100 mb-8">Thank you for your purchase.</p>
            <Button
              className="w-full py-3 text-lg font-medium rounded-xl bg-black"
              onClick={() => navigate("/products")}
            >
              Back to Home
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
