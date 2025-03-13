import useSWR from "swr";
import { Button } from "../ui/button";
import axios from "axios";
import Cart from "../CartBar/Cart";
import { useNavigate } from "react-router-dom";
import OrderIcon from "../Order/OrderIcon";
import { Skeleton } from "../ui/skeleton";

export default function ProductList() {
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
      const res = await axios.get(url);
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
        //key cannot object value can object , can direct access min and max var no need index 0 n 1
        priceMap.set(product.itemId, {
          min: Number.MAX_VALUE,
          max: -Number.MAX_VALUE,
        });
      }
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

  return (
    <>
      <OrderIcon userId={userId} />
      <Cart userId={userId} />
      <div className="flex flex-col bg-primary text-black min-h-screen p-5 overflow-y-scroll">
       
        <div className=" p-5 sm:px-10 md:px-20">

        <h1 className="text-2xl sm:text-4xl md:text-6xl xl:text-8xl font-bold px-2 mb-4 text-center">
          Products
        </h1>
       
          {isLoading &&  <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>

            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>

            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>

            </div>
            }
          {error && <p className="text-red-500">Failed to fetch products</p>}

          {/* Responsive Grid Fix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {data &&
              data.map((product: Product) => (
                <div
                  key={product.itemId}
                  className="bg-white border p-5 rounded-lg shadow-lg flex flex-col w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
                >
                  <h2 className="text-xl font-bold">{product.itemName}</h2>
                  <p className="text-sm mb-2">{product.description}</p>

                  {/* Push price & button to bottom but keep inside box */}
                  <div className="mt-auto flex flex-wrap justify-between items-center w-full">
                    <div className="text-md">
                      $
                      {priceMap.get(product.itemId).min ===
                      priceMap.get(product.itemId).max
                        ? priceMap.get(product.itemId).min
                        : `${priceMap.get(product.itemId).min}...${
                            priceMap.get(product.itemId).max
                          }`}
                    </div>

                    <Button
                      variant="outline"
                      className="hover:bg-red-500 hover:text-white w-auto px-4 py-2 text-sm"
                      onClick={() => handleClick(product.itemId)}
                    >
                      Check Details
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
