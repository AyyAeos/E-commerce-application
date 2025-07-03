import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import useSWR, { mutate } from "swr";

import { CiSquarePlus } from "react-icons/ci";
import AddButton from "./AddForm";

import SearchForm from "./SearchForm";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import EditForm from "./EditForm";
import { Item, Variants } from "./type";
type SearchFormDataType = {
  itemName: string;
  size: string;
  onSale?: number | undefined;
  minPrice?: number;
  maxPrice?: number;
  totalCounts?: number;
  page?: number;
  pageLimits?: number;
};

const Inventory: React.FC = () => {
  const [searchForm, setSearchForm] = useState<SearchFormDataType>({
    itemName: "",
    size: "",
    onSale: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    totalCounts: undefined,
    page: undefined,
    pageLimits: undefined,
  });

  const fetcher = async (url: string) => {
    try {
      const res = await axiosInstance.get(url, { params: searchForm });
      if (res.data.msg === "success") {
        //Display Pagination
        setSearchForm({
          ...searchForm,
          totalCounts: res.data.data.itemCounts,
          page: res.data.data.page,
          pageLimits: res.data.data.pageLimits,
        });
        return res.data.data.list;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  //fetch inventory data
  const { data, error, isLoading } = useSWR(
    "/admins/inventory/search",
    fetcher
  );

  // Display the edit box
  const [EditItem, SetEditItem] = useState<{
    item: Item;
    variant: Variants;
  } | null>(null);

  const [AddPage, SetAddPage] = useState(false);

  //Update inventory list
  const handleSubmit = () => {
    mutate("/admins/inventory/search");
  };

  const navigate = useNavigate();

  return (
    <>
      <button
        className="fixed top-24 left-4 bg-white/10 backdrop-blur-lg text-black p-3 rounded-full shadow-lg hover:bg-white/20 hover:scale-[1.2]"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft size={20} />
      </button>
      <div className="pt-8 overflow-y-scroll min-h-screen bg-white text-primary-foreground  px-5 sm:px-10 md:px-20">
        <div className="flex justify-center text-2xl font-bold">
          <span className="flex-1 text-center">Inventory</span>
          <CiSquarePlus
            className="ml-16 text-5xl "
            onClick={() => {
              SetAddPage(true);
            }}
          />
        </div>

        {/* Display add form */}
        {AddPage && <AddButton onClose={() => SetAddPage(false)} />}

        <SearchForm
          searchFormData={searchForm}
          setSearchFormData={setSearchForm}
          handleSubmit={handleSubmit}
        />

        <div className="overflow-x-auto">
          {isLoading && <p>Loading...</p>}
          {error && <p className="text-red-500">Failed to fetch inventory</p>}

          <Table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
            <TableCaption className="text-lg font-semibold py-4">
              Inventory List
            </TableCaption>

            <TableHeader>
              <TableRow className="">
                <TableHead>Item Name</TableHead>
                <TableHead className="">Description</TableHead>
                <TableHead className="">Status</TableHead>
                <TableHead className="">Size</TableHead>
                <TableHead className="">Stock</TableHead>
                <TableHead className="">Price</TableHead>
                <TableHead className="">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data &&
                data.map((item: Item) =>
                  item.variants.map((variant, index) => (
                    <TableRow key={`${item.itemId}-${variant.sizeId}`}>
                      {index === 0 && (
                        <>
                          <TableCell rowSpan={item.variants.length}>
                            {item.itemName}
                          </TableCell>

                          <TableCell rowSpan={item.variants.length}>
                            {item.description}
                          </TableCell>
                        </>
                      )}
                      <TableCell>
                        {variant.onSale === 0 ? "Not On Sale" : "On Sale"}
                      </TableCell>
                      <TableCell>{variant.size}</TableCell>
                      <TableCell>{variant.price}</TableCell>
                      <TableCell className="">{variant.stock}</TableCell>
                      <TableCell>
                        <div className="flex space-x-6">
                          <button
                            className="border-2 border-black px-2 py-2 hover:bg-red-500 w-full"
                            onClick={() => SetEditItem({ item, variant })}
                          >
                            Edit
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
            </TableBody>

            {/* Edit and delete page */}
            {EditItem && (
              <EditForm
                item={EditItem.item}
                variant={EditItem.variant}
                onClose={() => SetEditItem(null)}
              />
            )}
          </Table>
        </div>
      </div>
    </>
  );
};

export default Inventory;
