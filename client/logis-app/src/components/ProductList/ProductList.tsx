import useSWR from "swr";
import { Button } from "../ui/button";

import Cart from "../CartBar/CartIcon";
import { useNavigate } from "react-router-dom";
import OrderIcon from "../Order/OrderIcon";
import { Skeleton } from "../ui/skeleton";
import { FaShoppingBag, FaSearch, FaArrowRight } from "react-icons/fa";
import axiosInstance from "@/utils/axiosInstance";

const ProductList = () => {
  type Product = {
    itemId: number;
    itemName: string;
    description: string;
    variants: Variant[];
  };

  type Variant = {
    size: string;
    stock: number;
    price: number;
  };

  const fetcher = async (url: string) => {
    try {
      const res = await axiosInstance.get(url);
      if (res.data.msg === "success") {
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const { data, error, isLoading } = useSWR(
    `http://localhost:8080/products`,
    fetcher
  );

  let priceMap = new Map();

  data?.forEach((product: Product) => {
    product.variants.forEach((variant: Variant) => {
      if (!priceMap.has(product.itemId)) {
        priceMap.set(product.itemId, {
          min: Number.MAX_VALUE, //largest value
          max: -Number.MAX_VALUE, //smallest value
        });
      }
      // math.min(currentVlaue, value)
      priceMap.set(product.itemId, {
        min: Math.min(priceMap.get(product.itemId).min, variant.price),
        max: Math.max(priceMap.get(product.itemId).max, variant.price),
      });
    });
  });

  const navigate = useNavigate();
  const handleClick = (itemId: number) => {
    navigate(`/products/${itemId}`);
  };

  const userId = localStorage.getItem("userId") ?? "";

  // Generate random placeholder backgrounds for product cards
  const getRandomGradient = () => {
    const gradients = [
      "from-blue-100 to-purple-100",
      "from-pink-100 to-rose-100",
      "from-green-100 to-teal-100",
      "from-amber-100 to-orange-100",
      "from-indigo-100 to-sky-100",
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  return (
    <div className="min-h-screen bg-primary">
      <OrderIcon userId={userId} />
      <Cart userId={userId} />

      {/* container center content  mx -autohorizontally center */}
      <div className="container mx-auto px-4 py-10">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Our Products
          </h1>
          <p className="text-pink-100 text-lg max-w-2xl mx-auto">
            Browse our collection of premium items crafted for your needs
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl"
              >
                <Skeleton className="h-16 w-3/4 bg-white/20 mb-4 rounded-lg" />
                <Skeleton className="h-4 w-full bg-white/20 mb-2 rounded" />
                <Skeleton className="h-4 w-full bg-white/20 mb-2 rounded" />
                <Skeleton className="h-4 w-2/3 bg-white/20 mb-6 rounded" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-8 w-20 bg-white/20 rounded" />
                  <Skeleton className="h-10 w-32 bg-white/20 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 my-8 text-white text-center">
            <p>Failed to fetch products. Please refresh the page.</p>
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.map((product: Product) => (
              <div
                key={product.itemId}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl flex flex-col h-full"
              >
                <div
                  className={`rounded-xl bg-gradient-to-br ${getRandomGradient()} mb-4 p-6 flex items-center justify-center`}
                >
                  <FaShoppingBag className="text-gray-700 text-4xl opacity-40" />
                </div>

                <h2 className="text-xl font-bold text-white mb-2">
                  {product.itemName}
                </h2>

                <p className="text-pink-100 mb-4 flex-grow">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
                  <div className="text-lg font-semibold text-white">
                    $
                    {priceMap.get(product.itemId).min ===
                    priceMap.get(product.itemId).max
                      ? priceMap.get(product.itemId).min.toFixed(2)
                      : `${priceMap
                          .get(product.itemId)
                          .min.toFixed(2)} - ${priceMap
                          .get(product.itemId)
                          .max.toFixed(2)}`}
                  </div>

                  <Button
                    onClick={() => handleClick(product.itemId)}
                    className="bg-black rounded-lg border-0 flex items-center gap-2 text-white hover:scale-150"
                  >
                    <span>Details</span>
                    <FaArrowRight size={12} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {data && data.length === 0 && !isLoading && (
          <div className="bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl text-center my-12">
            <FaSearch className="mx-auto text-pink-300 text-5xl mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              No Products Found
            </h3>
            <p className="text-pink-100">
              We couldn't find any products at the moment. Please check back
              later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
