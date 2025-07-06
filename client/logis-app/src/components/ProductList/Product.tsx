import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Cart from "../CartBar/CartIcon";
import { cn } from "@/lib/utils";
import OrderIcon from "../Order/OrderIcon";
import { Skeleton } from "../ui/skeleton";

import {
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaArrowLeft,
  FaTimes,
} from "react-icons/fa";
import axiosInstance from "@/utils/axiosInstance";
import ProductComment from "./comment/ProductComment";
import { AddItemType, SelectedProduct, Variant } from "./type";
import index from "swr";

const Product = () => {
  const location = useLocation();

  const { product }: { product: SelectedProduct } = location.state || {};

  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  // Cart Item
  const [addItem, setAddItem] = useState<AddItemType>({
    itemId: product.itemId,
    itemName: "",
    sizeId: product.variants[0].sizeId,
    quantity: 1,
    itemPrice: product.variants[0].price,
  });

  //Add Quantity
  const addButton = () => {
    setAddItem((prevState) => ({
      ...prevState,
      quantity: prevState.quantity + 1,
      itemPrice:
        (prevState.quantity + 1) * (prevState.itemPrice / prevState.quantity),
    }));
  };

  //Minus Quantity
  const minusButton = () => {
    setAddItem((prevState) => ({
      ...prevState,
      quantity: Math.max(1, prevState.quantity - 1),
      itemPrice:
        prevState.quantity > 1
          ? (prevState.quantity - 1) *
            (prevState.itemPrice / prevState.quantity)
          : prevState.itemPrice,
    }));
  };

  //Add Selected Item to Cart
  const addToCart = async () => {

    if(addItem.quantity == 0) {
      alert("Quantity cannot be 0.")
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/products/${product.itemId}`,
        addItem
      );

      if (response.data.msg === "success" && response.data.code === 1) {
        navigate(`/carts`);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to add to cart. Please try again.");
    }
  };

  // Loading Screen Animation
  const LoadingSkeleton = () => (
    <div className="max-w-4xl mx-auto w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
        <Skeleton className="h-[300px] w-full md:w-1/2 rounded-xl bg-white/20" />
        <div className="space-y-4 w-full md:w-1/2">
          <Skeleton className="h-8 w-3/4 bg-white/20" />
          <Skeleton className="h-6 w-1/2 bg-white/20" />
          <div className="flex flex-wrap gap-2 mt-4">
            <Skeleton className="h-10 w-14 rounded-lg bg-white/20" />
            <Skeleton className="h-10 w-14 rounded-lg bg-white/20" />
            <Skeleton className="h-10 w-14 rounded-lg bg-white/20" />
          </div>
          <Skeleton className="h-12 w-full mt-6 bg-white/20" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-primary flex flex-col items-center">
        <Cart />
        <OrderIcon />

        <button
          className="fixed top-24 right-4 bg-white/10 text-white p-3 rounded-full shadow-lg hover:bg-white/20 hover:scale-150 z-10"
          onClick={() => navigate(`/products`)}
        >
          <FaTimes size={20} />
        </button>

        <button
          className="fixed top-24 left-4 bg-white/10 backdrop-blur-lg text-white p-3 rounded-full shadow-lg hover:bg-white/20 hover:scale-150 z-10"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={20} />
        </button>

        <div className="max-w-4xl w-full p-4 pt-20">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl mb-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Product Image */}
              <div className="w-full md:w-1/2 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-xl min-h-[300px] flex items-center justify-center border border-white/20">
                <div className="text-white/50 text-lg">Product Image</div>
              </div>

              {/* Product Details */}
              <div className="w-full md:w-1/2">
                {product && (
                  <>
                    <h2 className="text-3xl font-bold text-white mb-4">
                      {product.itemName}
                    </h2>

                    <div className="mb-6">
                      <h3 className="text-xl text-white mb-3">Size</h3>
                      <div className="flex flex-wrap gap-3">
                        {product?.variants &&
                          product.variants.map((variant: Variant) => (
                            <button
                              key={variant.sizeId ?? `${variant.size}-${index}`}
                              className={cn(
                                "py-2 px-4 rounded-lg border border-white/30 text-white transition-all",
                                addItem.sizeId === variant.sizeId
                                  ? "bg-black scale-[1.2]"
                                  : "bg-white/10 hover:bg-white/20"
                              )}
                              onClick={() => {
                                setAddItem((prevState) => ({
                                  ...prevState,
                                  itemName: product.itemName,
                                  sizeId: variant.sizeId,
                                  quantity: 1,
                                  itemPrice: variant.price,
                                }));
                              }}
                            >
                              {variant.size}
                            </button>
                          ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl text-white mb-3">Quantity</h3>
                      <div className="flex items-center">
                        <button
                          className={cn(
                            "p-3 rounded-l-lg bg-white/10 text-white border border-white/30",
                            addItem.quantity <= 1
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-white/20"
                          )}
                          onClick={minusButton}
                          disabled={addItem.quantity < 2}
                        >
                          <FaMinus />
                        </button>
                        <div className="px-6 py-2 bg-white/20 text-white font-medium border-t border-b border-white/30">
                          {addItem.quantity}
                        </div>
                        <button
                          className="p-3 rounded-r-lg bg-white/10 text-white border border-white/30 hover:bg-white/20"
                          onClick={addButton}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl text-white">Total Price</h3>
                      <p className="text-3xl font-bold text-white">
                        RM {addItem.itemPrice.toFixed(2)}
                      </p>
                    </div>

                    <button
                      className="w-full py-4 text-lg font-medium rounded-xl bg-black hover:scale-105 text-white flex items-center justify-center gap-2"
                      onClick={addToCart}
                      disabled={addItem.quantity <= 0}
                    >
                      <FaShoppingCart />
                      <span>Add to Cart</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
            <p className="text-white">
              {product?.description || "Product description not available."}
            </p>
          </div>

          {/* Comments Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Customer Reviews
            </h2>
            <ProductComment itemId={product.itemId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
