import { useState, useMemo } from "react";
import { Order } from "./Order";
import axiosInstance from "@/utils/axiosInstance";


const WriteReview = ({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) => {
  const [selectedItemType, setSelectedItemType] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReviewText(event.target.value);
  };

  const typeMap = new Map<number, string>();
  const uniqueItemTypes = useMemo(() => {
    order.items.forEach((item) => {
      if (!typeMap.has(item.itemId)) {
        typeMap.set(item.itemId, item.itemName);
      }
    });
    return Array.from(typeMap.entries());
  }, [order.items]);

  const handleSubmit = async (selectedItemType: string | null) => {
    if (selectedItemType && reviewText) {
      const itemId = Number(selectedItemType);
      const placeOrderDTO = order.items.find((item) => item.itemId === itemId);

      if (!placeOrderDTO) {
        console.log("Selected item not found.");
        return;
      }

      const reviewDTO = {
        itemId: itemId,
        userId: order.userId,
        content: reviewText,
        placedAt: order.placedAt,
        quantity: placeOrderDTO.quantity,
        itemName: placeOrderDTO.itemName,
        sizeName: placeOrderDTO.sizeName,
        likeCount: 0,
      };

      try {
        const response = await axiosInstance.post(
          `http://localhost:8080/orders/${order.userId}`,
          reviewDTO
        );
        if (response.data.code === 1 && response.data.msg === "success") {
          setIsSuccess(true);
        } else {
          alert("Error submitting review");
          onClose();
        }
      } catch (error) {
        console.log("Error submitting review", error);
      }
    } else {
      console.log("Please select an item type and write a review.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      {isSuccess ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
          <h2 className="text-xl mb-4">Review Submitted Successfully!</h2>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            onClick={() => onClose()}
          >
            Okay
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl mb-4">Write a Review</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Select an Item Type
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => setSelectedItemType(e.target.value)}
              value={selectedItemType || ""}
            >
              <option value="">Select an Item Type</option>
              {uniqueItemTypes.map(([itemId, itemName]) => (
                <option key={itemId} value={itemId.toString()}>
                  {itemName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Your Review
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Write your review here..."
              rows={4}
              value={reviewText}
              onChange={handleReviewChange}
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              className="border px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              onClick={() => handleSubmit(selectedItemType)}
            >
              Submit Review
            </button>

            <button
              className="border px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
              onClick={onClose}
            >
              Exit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WriteReview;
