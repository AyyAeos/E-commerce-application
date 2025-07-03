import { useState, ChangeEvent } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Button } from "@/components/ui/button";
import { FormData, Variant } from "./type";

const AddButton = ({ onClose }: { onClose: () => void }) => {
  //Add item form
  const [formData, setFormData] = useState<FormData>({
    itemName: "",
    description: "",
    variants: [
      {
        size: "",
        price: 0,
        stock: 0,
        onSale: 0,
      },
    ],
  });

  const createItem = async () => {
    try {
      const response = await axiosInstance.post(
        "/admins/inventory/create",
        formData
      );

      if (response.data.msg === "success" && response.data.data === true) {
        onClose();
        alert("Item successfully added!");
      } else {
        alert("Item already existed");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  // Handle changes in variant fields
  const handleVariantChange = (
    index: number,
    field: keyof Variant,
    value: any
  ) => {
    //find the appropriate value and change the state
    const updatedVariants = [...formData.variants];
    updatedVariants[index][field] = value;
    setFormData({ ...formData, variants: updatedVariants });
  };

  // Add a new variant to the form
  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        { size: "", price: 0, stock: 0, onSale: 0 },
      ],
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl px-4 sm:w-[500px] overflow-y-scroll">
        <h2 className="text-2xl font-bold mb-4">Add an item</h2>

        <div className="mb-4 flex flex-col sm:flex-row sm:items-center">
          <label className="w-full sm:w-1/3 text-left mb-2 sm:mb-0">
            Item Name:
          </label>
          <input
            type="text"
            value={formData.itemName}
            className="border-4 border-slate-500 text-center w-full sm:w-2/3"
            onChange={(e) =>
              setFormData({ ...formData, itemName: e.target.value })
            }
          />
        </div>

        {/* Description */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center">
          <label className="w-full sm:w-1/3 text-left mb-2 sm:mb-0">
            Description:
          </label>
          <textarea
            value={formData.description}
            className="border-4 border-slate-500 text-center w-full sm:w-2/3 resize-y h-28 p-2"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        {/* Variants */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Variants</h3>
          <div className="max-h-64 overflow-y-auto">
            {formData.variants.map((variant, index) => (
              <div
                key={index}
                className="mb-4 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0"
              >
                {/* Size */}
                <div className="w-full sm:w-1/3">
                  <label className="block">Size:</label>
                  <input
                    type="text"
                    value={variant.size}
                    className="border-4 border-slate-500 text-center w-full"
                    onChange={(e) =>
                      handleVariantChange(index, "size", e.target.value)
                    }
                  />
                </div>

                {/* Price */}
                <div className="w-full sm:w-1/3">
                  <label className="block">Price:</label>
                  <input
                    type="number"
                    value={variant.price}
                    className="border-4 border-slate-500 text-center w-full"
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        "price",
                        Number(e.target.value)
                      )
                    }
                  />
                </div>

                {/* Stock */}
                <div className="w-full sm:w-1/3">
                  <label className="block">Stock:</label>
                  <input
                    type="number"
                    value={variant.stock}
                    className="border-4 border-slate-500 text-center w-full"
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        "stock",
                        Number(e.target.value)
                      )
                    }
                  />
                </div>

                {/* On Sale */}
                <div className="w-full sm:w-1/3">
                  <label className="block">On Sale:</label>
                  <select
                    className="border-4 border-slate-500 text-center w-full"
                    value={variant.onSale}
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        "onSale",
                        Number(e.target.value)
                      )
                    }
                  >
                    <option value="0">Not On Sale</option>
                    <option value="1">On Sale</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Variant Button */}
          <Button onClick={addVariant}>Add More</Button>
        </div>

        <div className="flex justify-between mt-4 space-x-2 flex-col sm:flex-row gap-y-4">
          <button
            className="px-8 py-2 bg-red-500 text-white rounded"
            onClick={onClose}
          >
            No
          </button>
          <button
            className="px-8 py-2 bg-blue-500 text-white rounded"
            onClick={createItem}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddButton;
