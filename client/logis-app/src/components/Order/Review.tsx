import { useState, useMemo, useEffect } from "react";
import { Order } from "./Order"; // Assuming this file contains the Order type definition

const WriteReview = ({ order, onClose }: { order: Order, onClose: () => void }) => {
  const [selectedItemType, setSelectedItemType] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState<string>("");

  // Handle review text change
  const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(event.target.value);
  };

  // Handle review submission
  const handleSubmit = () => {
    if (selectedItemType && reviewText) {
      console.log(`Review for item type ${selectedItemType}: ${reviewText}`);
      // Add the logic to submit the review
    } else {
      console.log("Please select an item type and write a review.");
    }
  };

  // Use useMemo to optimize the filtering of unique item types
  const uniqueItemTypes = useMemo(() => {
    const types = Array.from(new Set(order.items.map((item) => item.itemName))); // Get unique item types by itemName
    return types;
  }, [order.items]); // Only recompute when order.items change


  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
        <h2 className="text-xl mb-4">Write a Review</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select an Item Type</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => setSelectedItemType(e.target.value)}
            value={selectedItemType || ""}
          >
            <option value="">Select an Item Type</option>
            {uniqueItemTypes.map((itemType) => (
              <option key={itemType} value={itemType}>
                {itemType}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Your Review</label>
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
            onClick={handleSubmit}
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
    </div>
  );
};

export default WriteReview;
