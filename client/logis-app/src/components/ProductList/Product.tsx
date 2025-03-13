import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import Cart from "../CartBar/Cart";
import { cn } from "@/lib/utils";
import OrderIcon from "../Order/OrderIcon";
import { Skeleton } from "../ui/skeleton";

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

  const userId = localStorage.getItem("userId") ?? "";

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      if (response.data.msg === "success" && response.data.code === 1) {
        console.log(`Fetched data: ${response.data.data}`);

        return response.data.data;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return [];
  };

  const { data, error, isLoading } = useSWR<SelectedProduct>(
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

  //Default additem become first
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

  const navigate = useNavigate();

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
    }
  };

  return (
    <>

        {isLoading &&  <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
            </div>
            }
          {error && <p className="text-red-500">Failed to fetch products. Please refresh the place!</p>}

      <Cart userId={userId} />
      <OrderIcon userId={userId} />

      <button
        className="fixed mt-4 right-20 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600"
        onClick={() => navigate(`/products`)}
      >
        EXIT
      </button>

      {/* Useswr */}
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Failed to fetch products</p>}

      <div className="flex flex-col bg-primary text-primary-foreground min-h-screen overflow-x-hidden px-5 pt-20 sm:px-10 md:px-20">
        {/* here wrap will make sure it fit the screen not overflow and cut off */}
        <div className="w-full border-b-4 bg-black h-4">
          <div className="w-full flex flex-wrap">
            {/* small = w-full  small > = w1/2  */}
            {/* use w-full become even thought now is horizontal but each element takes one row so its vertically */}
            <div className="w-full md:w-1/2 min-h-[400px] bg-red-500"></div>

            <div className="w-full bg-white sm:flex-1 p-5">
              {/* && must have div */}
              {data && (
                <div>
                  <h2 className="m-3 text-4xl font-bold">{data.itemName}</h2>
                  {/* wrap to the next row if exceed container */}
                  <div className="flex flex-wrap gap-4">
                    <span className="flex items-center ml-6 text-xl sm:text-2xl">
                      Size :{" "}
                    </span>
                    {data?.variants &&
                      data.variants.map((variant: Variants) => (
                        // small  and up = w-14 smaller u full
                        <button
                          key={variant.sizeId}
                          className={cn(
                            "ronded-lg m-2 p-4 border rounded w-full sm:w-14 min-w-fit ml-6",
                            addItem.sizeId === variant.sizeId &&
                              "border-red-500"
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
              )}

              <div className="flex gap-4 m-4 items-center ml-6">
                <span className="flex items-center text-xl sm:text-2xl">
                  Quantity :{" "}
                </span>
                <button
                  className="border px-4 m-2"
                  onClick={minusButton}
                  disabled={addItem.quantity < 2}
                >
                  -
                </button>

                <p>{addItem.quantity}</p>

                <button className="border px-4 m-2" onClick={addButton}>
                  +
                </button>
              </div>

              <div className="text-xl sm:text-2xl m-4 ml-6">
                <h2>Total Price : RM {addItem.itemPrice.toFixed(2)}</h2>
              </div>

              <button
                className="bg-blue-500 hover:bg-red-500 py-4 px-6 text-white text-lg rounded-lg ml-6 "
                onClick={addToCart}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
          <div className="w-1/2  p-4 mt-6 bg-white w-full p-5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4">
              Description
            </h2>
            {data?.description}; dnawdnaonaiowdnaoidniandioandiawndwaodnwad
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
