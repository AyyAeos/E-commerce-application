import axiosInstance from "@/utils/axiosInstance";
import { debounce } from "lodash";
import React, { createContext, useContext, useState, useEffect } from "react";

interface CartContextType {
  cartItems: any[];
  updateCartToServer: (cartId: number, newQuantity: number, sizeId: number) => void;
  fetchCartItems: () => void;
  error: string | null;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userId = 1; // Replace with dynamic userId if needed

  const updateCartToServer = debounce(
    async (cartId: number, newQuantity: number, sizeId: number) => {
      try {
        await axiosInstance.put(`http://localhost:8080/carts/${userId}`, {
          cartId,
          quantity: newQuantity,
          sizeId,
        });
        fetchCartItems(); // Refresh cart data after update
      } catch (error) {
        console.error("Failed to update cart:", error);
        setError("Failed to update cart. Please try again.");
      }
    },
    500
  );

  const fetchCartItems = async () => {
    setIsLoading(true); // Start loading
    try {
      const res = await axiosInstance.get(`http://localhost:8080/carts/${userId}`);
      if (res.data.msg === "success") {
        setCartItems(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      setError("Failed to fetch cart items. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, updateCartToServer, fetchCartItems, error, isLoading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
