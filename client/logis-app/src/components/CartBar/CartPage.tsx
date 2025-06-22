import useSWR from "swr";
import { Button } from "../ui/button";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import {
  FaPlus,
  FaMinus,
  FaArrowLeft,
  FaTimes,
  FaShoppingCart,
  FaCheck,
} from "react-icons/fa";
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axiosInstance from "@/utils/axiosInstance";
import { Item } from "./type/type";

const CartPage = () => {
  const userId = localStorage.getItem("userId");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const fetcher = async (url: string) => {
    try {
      const res = await axiosInstance.get(url);
      if (res.data.msg === "success") {
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch cart items. Please try again.");
      return [];
    }
  };

  const [CartItem, setCartItem] = useState<Item[]>([]);

  const {
    data,
    error: swrError,
    isLoading,
  } = useSWR<Item[]>(`/carts/${userId}`, fetcher);

  useEffect(() => {
    if (data) {
      setCartItem(data);
    }
  }, [data]);

  const handleCheckboxClick = useCallback((item: Item) => {
    setCartItem((prevData) => {
      return prevData.map((prev) => {
        if (prev.sizeId === item.sizeId) {
          const isSelected = !prev.selected;
          setTotalPrice(
            (prevTotal) =>
              prevTotal +
              (isSelected
                ? item.price * item.quantity
                : -item.price * item.quantity)
          );
          return { ...prev, selected: isSelected };
        }
        return prev;
      });
    });
  }, []);

  const updateCartToServer = debounce(
    async (cartId: number, newQuantity: number, sizeId: number) => {
      try {
        await axiosInstance.put(`/carts/${userId}`, {
          cartId,
          quantity: newQuantity,
          sizeId,
        });
      } catch (error) {
        console.error("Failed to update cart:", error);
        setError("Failed to update cart. Please try again.");
      }
    },
    500
  );
  // wait 500 sec after last button is hit , if hit = reset

  const updateQuantity = (
    cartId: number,
    sizeId: number,
    increment: number
  ) => {
    setCartItem((prevData) => {
      return prevData.map((item) => {
        if (item.sizeId === sizeId) {
          const newQuantity = item.quantity + increment;
          if (newQuantity < 1) return item;

          updateCartToServer(cartId, newQuantity, sizeId);

          if (item.selected) {
            setTotalPrice((prev) => prev + item.price * increment);
          }

          return { ...item, quantity: newQuantity }; //update to data data afterwards
        }
        return item;
      });
    });
  };

  const addQuantity = (cartId: number, sizeId: number) =>
    updateQuantity(cartId, sizeId, 1);
  const minusQuantity = (cartId: number, sizeId: number) =>
    updateQuantity(cartId, sizeId, -1);

  const navigate = useNavigate();

  const handleCheckOut = () => {
    navigate(`/checkouts/${userId}`, {
      state: {
        placeOrderDTOS: CartItem.filter((prev) => prev.selected === true),
        totalPrice,
      },
    });
  };

  const LoadingSkeleton = () => (
    <div className="max-w-4xl mx-auto w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
      <Skeleton className="h-12 w-1/2 mx-auto mb-8 bg-white/20" />
      <Skeleton className="h-10 w-full mb-6 bg-white/20" />
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-16 w-full mb-2 bg-white/20" />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center p-4 pt-16">
      <button
        className="fixed top-24 right-4 bg-white/10 backdrop-blur-lg text-white p-3 rounded-full shadow-lg hover:bg-white/20 hover:scale-[1.2] "
        onClick={() => navigate(`/products`)}
      >
        <FaTimes size={20} />
      </button>

      <button
        className="fixed top-24 left-4 bg-white/10 backdrop-blur-lg text-white p-3 rounded-full shadow-lg hover:bg-white/20 hover:scale-[1.2]"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft size={20} />
      </button>

      {isLoading ? (
        <LoadingSkeleton />
      ) : swrError || error ? (
        <Alert className="bg-red-500/20 border border-red-500/50 max-w-md w-full mt-8">
          <AlertDescription className="text-white">
            {error || "Please refresh the page or click exit on top right!"}
          </AlertDescription>
        </Alert>
      ) : data && data.length === 0 ? (
        <div className="max-w-md w-full bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl text-center mt-8">
          <FaShoppingCart className="mx-auto text-pink-200 text-6xl mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-pink-100 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="max-w-6xl w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
            Shopping Cart
          </h1>

          <div className="bg-white/10 rounded-2xl border border-white/20 shadow-xl mb-24">
            {/* Header */}
            <div className="flex rounded-t-2xl bg-white/20 text-white p-4 font-medium text-sm md:text-base">
              <div className="w-1/6 text-center">Item</div>
              <div className="w-1/6 text-center">Size</div>
              <div className="w-1/6 text-center">Price</div>
              <div className="w-1/6 text-center">Quantity</div>
              <div className="w-1/6 text-center">Total</div>
              <div className="w-1/6 text-center">Select</div>
            </div>

            {/* Cart Items */}
            <div className="divide-y divide-white/10">
              {CartItem &&
                CartItem.map((item: Item, index: number) => {
                  const isSelected = item.selected;

                  return (
                    <div
                      key={index}
                      className="flex text-sm md:text-base items-center p-4 transition-all duration-300"
                    >
                      <div className="w-1/6 text-center text-white font-medium truncate">
                        {item.itemName}
                      </div>
                      <div className="w-1/6 text-center text-white">
                        {item.size}
                      </div>
                      <div className="w-1/6 text-center text-white">
                        RM {item.price.toFixed(2)}
                      </div>

                      <div className="w-1/6 flex justify-center items-center">
                        <button
                          className={`flex items-center justify-center p-2 rounded-l-md bg-white/10 border border-white/20 text-white ${
                            item.quantity <= 1
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-white/20"
                          }`}
                          onClick={() => {
                            minusQuantity(item.cartId, item.sizeId);
                          }}
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus size={12} />
                        </button>

                        <div className="bg-white/20 border-t border-b border-white/20 px-3 py-1 text-white">
                          {item.quantity}
                        </div>

                        <button
                          className="flex items-center justify-center p-2 rounded-r-md bg-white/10 border border-white/20 text-white hover:bg-white/20"
                          onClick={() => addQuantity(item.cartId, item.sizeId)}
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>

                      <div className="w-1/6 text-center text-white font-medium">
                        RM {(item.price * item.quantity).toFixed(2)}
                      </div>

                      <div className="w-1/6 flex justify-center">
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center cursor-pointer ${
                            isSelected
                              ? "bg-gradient-to-r from-pink-500 to-purple-600"
                              : "bg-white/10 hover:bg-white/20"
                          }`}
                          onClick={() => handleCheckboxClick(item)}
                        >
                          {isSelected && (
                            <FaCheck size={12} className="text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {CartItem &&
            CartItem.filter((prev) => prev.selected === true).length > 0 && (
              <div className="fixed bottom-0 left-0 right-0 bg-white/10 border-t border-white/20 py-4 px-6 shadow-lg">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-white text-lg sm:text-xl font-medium">
                    <span>Total: </span>
                    <span className="font-bold text-white">
                      RM {totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <Button
                    className="w-full sm:w-auto py-6 px-8 text-lg font-medium rounded-xl bg-black hover:scale-105 flex items-center justify-center gap-2"
                    onClick={handleCheckOut}
                  >
                    <FaCheck size={16} />
                    <span>Checkout</span>
                  </Button>
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
