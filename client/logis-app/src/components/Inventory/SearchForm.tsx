import { SetStateAction, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type SearchFormDataType = {
  itemName: string;
  onSale?: number;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  totalCounts?: number;
  page?: number;
  pageLimits?: number;
};

const SearchForm = ({
  searchFormData,
  setSearchFormData,
  handleSubmit,
}: {
  searchFormData: SearchFormDataType;
  setSearchFormData: React.Dispatch<SetStateAction<SearchFormDataType>>;
  handleSubmit: () => void;
}) => {
  const handlePageChange = (newPage: number) => {
    setSearchFormData((prev) => ({ ...prev, page: newPage }));
    setTimeout(handleSubmit, 0);
  };

  return (
    <>
      <div className="sm:flex items-center space-x-4 py-2">
        <div className="w-full sm:w-1/5 space-y-2">
          <Label htmlFor="itemName">Item Name : </Label>
          <Input
            id="itemName"
            type="text"
            placeholder="Item Name"
            value={searchFormData.itemName}
            onChange={(e) =>
              setSearchFormData({ ...searchFormData, itemName: e.target.value })
            }
          />
        </div>

        <div className="w-full sm:w-1/5 space-y-2">
          <Label htmlFor="itemStatus">Item Status:</Label>
          <select
            id="itemStatus"
            value={searchFormData.onSale}
            onChange={(e) =>
              setSearchFormData({
                ...searchFormData,
                onSale: Number(e.target.value),
              })
            }
            className="border border-gray-300 rounded px-2 py-1 w-full h-9"
          >
            <option value="">Select Status</option>
            <option value="1">On Sale</option>
            <option value="0">Not On Sale</option>
          </select>
        </div>

        <div className="w-full sm:w-1/5 space-y-2">
          <Label htmlFor="itemSize">Item Size : </Label>
          <Input
            id="itemSize"
            type="text"
            placeholder="Size"
            value={searchFormData.size}
            onChange={(e) =>
              setSearchFormData({ ...searchFormData, size: e.target.value })
            }
          />
        </div>

        <div className="w-full sm:w-1/5 space-y-2">
          <Label htmlFor="startPrice">Start Price : </Label>
          <Input
            id="startPrice"
            type="number"
            placeholder="Start Price"
            value={searchFormData.minPrice}
            onChange={(e) =>
              setSearchFormData({
                ...searchFormData,
                minPrice:
                  Number(e.target.value) < 0 ? 0 : Number(e.target.value),
              })
            }
          />
        </div>

        <div className="w-full sm:w-1/5 space-y-2">
          <Label htmlFor="endPrice">End Price : </Label>
          <Input
            id="endPrice"
            type="number"
            placeholder="End Price"
            value={searchFormData.maxPrice}
            onChange={(e) =>
              setSearchFormData({
                ...searchFormData,
                maxPrice:
                  Number(e.target.value) < 0 ? 0 : Number(e.target.value),
              })
            }
          />
        </div>
      </div>

      <div className="sm:flex items-center space-x-4 py-2">
        <div className="w-full sm:w-1/4 space-y-2">
          <Label htmlFor="totalCounts">Total Counts : </Label>
          <Input
            id="totalCounts"
            type="number"
            value={searchFormData.totalCounts}
            disabled 
            onChange={(e) =>
              setSearchFormData({
                ...searchFormData,
                totalCounts:
                  Number(e.target.value) < 0 ? 0 : Number(e.target.value),
              })
            }
          />
        </div>

        <div className="w-full sm:w-1/4 space-y-2">
          <Label htmlFor="page">Page : </Label>
          <Input
            id="page"
            type="number"
            value={searchFormData.page}
            disabled
            onChange={(e) =>
              setSearchFormData({
                ...searchFormData,
                page: Number(e.target.value) < 0 ? 0 : Number(e.target.value),
              })
            }
          />
        </div>

        <div className="w-full sm:w-1/4 space-y-2">
          <Label htmlFor="pageLimits">Page Limits : </Label>
          <Input
            id="pageLimits"
            type="number"
            value={searchFormData.pageLimits}
            onChange={(e) => {
              setSearchFormData({
                ...searchFormData,
                pageLimits:
                  Number(e.target.value) <= 5 ? 5 : Number(e.target.value),
              });
            }}
          />
        </div>

        <Button
          type="submit"
          className="mt-10 px-4 py-2 hover:bg-red-500 text-white rounded mb-2 w-full sm:w-1/4"
          onClick={handleSubmit}
        >
          Subscribe
        </Button>
      </div>

      <Pagination>
        <PaginationContent className="flex items-center justify-between">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => {
                if (searchFormData.page! > 1) {
                  handlePageChange(searchFormData.page! - 1);
                }
              }}
            />
          </PaginationItem>

          <div className="flex items-center space-x-2">
            <span>Page:</span>
            <Input
              type="number"
              value={searchFormData.page}
              onChange={(e) => {
                const newPage = Number(e.target.value);
                const maxPages = Math.ceil(
                  searchFormData.totalCounts! / searchFormData.pageLimits!
                );

                if (newPage > 0 && newPage <= maxPages) {
                  handlePageChange(newPage);
                }
              }}
              className="w-12 p-1 border border-gray-300 rounded text-center"
            />
            <span>
              of{" "}
              {Math.ceil(
                searchFormData.totalCounts! / searchFormData.pageLimits!
              )}
            </span>
          </div>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => {
                const maxPages = Math.ceil(
                  searchFormData.totalCounts! / searchFormData.pageLimits!
                );
                if (searchFormData.page! < maxPages) {
                  handlePageChange(searchFormData.page! + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default SearchForm;
