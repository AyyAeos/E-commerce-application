import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import Cart from "../CartBar/Cart";
import { cn } from "@/lib/utils";
import OrderIcon from "../Order/OrderIcon";
import { Skeleton } from "../ui/skeleton";
import ProductComment from "./ProductComment";
import { FaMinus, FaPlus, FaShoppingCart, FaArrowLeft, FaTimes } from "react-icons/fa";
import { Alert, AlertDescription } from "@/components/ui/alert";

type Variants = {
  size: string;
  stock: number;
  price: number;
  sizeId: number;
};

type SelectedProduct = {
  itemId: number;
  itemName: string;
  description: string;
  variants: Variants[];
};

type AddItemType = {
  itemId: number;
  itemName: string;
  sizeId: number;
  quantity: number;
  userId: string;
  itemPrice: number;
};

const Product = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") ?? "";
  const [error, setError] = useState<string>("");

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      if (response.data.msg === "success" && response.data.code === 1) {
        console.log(`Fetched data: ${response.data.data}`);
        return response.data.data;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch product details. Please try again.");
    }
  };

  const { data, error: swrError, isLoading } = useSWR<SelectedProduct>(
    `http://localhost:8080/products/${itemId}`,
    fetcher
  );

  const [addItem, setAddItem] = useState<AddItemType>({
    itemId: itemId ? parseInt(itemId) : 0,
    itemName: "",
    sizeId: 0,
    quantity: 0,
    userId: userId ?? "",
    itemPrice: 0,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setAddItem((prev) => ({
        ...prev,
        sizeId: data.variants[0].sizeId,
        quantity: 1,
        userId: userId,
        itemPrice: data.variants[0].price,
      }));
    }
  }, [isLoading, data, userId]);

  const checkPrice = async (sizeId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/products/${itemId}/${sizeId}`
      );

      if (response.data.msg === "success" && response.data.code === 1) {
        console.log("Get Price Successfully . . .");
        setAddItem((prevState) => ({
          ...prevState,
          itemPrice: response.data.data,
          quantity: 1,
        }));
      }
    } catch (error) {
      console.log(error);
      setError("Failed to update price. Please try again.");
    }
  };

  const addButton = () => {
    setAddItem((prevState) => ({
      ...prevState,
      quantity: prevState.quantity + 1,
      itemPrice:
        (prevState.quantity + 1) * (prevState.itemPrice / prevState.quantity),
    }));
  };

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

  const addToCart = async () => {
    console.log(addItem);

    try {
      const response = await axios.post(
        `http://localhost:8080/products/${itemId}`,
        addItem
      );

      if (response.data.msg === "success" && response.data.code === 1) {
        console.log("Add To Cart Successfully . . .");
        navigate(`/carts/${userId}`);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to add to cart. Please try again.");
    }
  };

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
    <div className="min-h-screen bg-primary flex flex-col items-center">
      <Cart userId={userId} />
      <OrderIcon userId={userId} />

      <button
        className="fixed top-24 right-20 bg-white/10 text-white p-3 rounded-full shadow-lg hover:bg-white/20 hover:scale-150 z-10"
        onClick={() => navigate(`/products`)}
      >
        <FaTimes size={20} />
      </button>

      <button
        className="fixed top-24 left-20 bg-white/10 backdrop-blur-lg text-white p-3 rounded-full shadow-lg hover:bg-white/20 hover:scale-150 z-10"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft size={20} />
      </button>

      {isLoading ? (
        <LoadingSkeleton />
      ) : swrError || error ? (
        <Alert className="bg-red-500/20 border border-red-500/50 max-w-md w-full mt-8">
          <AlertDescription className="text-white">
            {error || "Failed to fetch product details. Please try again."}
          </AlertDescription>
        </Alert>
      ) : (
        <div className="max-w-4xl w-full p-4 pt-20">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl mb-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Product Image */}
              <div className="w-full md:w-1/2 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-xl min-h-[300px] flex items-center justify-center border border-white/20">
                <div className="text-white/50 text-lg">Product Image</div>
              </div>

              {/* Product Details */}
              <div className="w-full md:w-1/2">
                {data && (
                  <>
                    <h2 className="text-3xl font-bold text-white mb-4">{data.itemName}</h2>
                    
                    <div className="mb-6">
                      <h3 className="text-xl text-white mb-3">Size</h3>
                      <div className="flex flex-wrap gap-3">
                        {data?.variants &&
                          data.variants.map((variant: Variants) => (
                            <button
                              key={variant.sizeId}
                              className={cn(
                                "py-2 px-4 rounded-lg border border-white/30 text-white transition-all",
                                addItem.sizeId === variant.sizeId
                                  ? "bg-black scale-[1.2]"
                                  : "bg-white/10 hover:bg-white/20"
                              )}
                              onClick={() => {
                                setAddItem((prevState) => ({
                                  ...prevState,
                                  itemName: data.itemName,
                                  sizeId: variant.sizeId,
                                  quantity: 1,
                                }));
                                checkPrice(variant.sizeId);
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
                            addItem.quantity <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-white/20"
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
              {data?.description || "Product description not available."}
            </p>
          </div>

          {/* Comments Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Customer Reviews</h2>
            <ProductComment itemId={itemId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;