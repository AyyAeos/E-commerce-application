import axios from "axios";
import useSWR, { mutate } from "swr";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export interface CommentList {
  indexId: number;
  username: string;
  userId: number;
  root: number;
  parent: number;
  likeCount: number;
  type: string;
  createTime: string;
  content: string;
  quantity: number;
  itemName: string;
  sizeName: string;
}

export interface Comment {
  itemId: number;
  count: number;
  productCommentLists: CommentList[];
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

const ProductComment = ({ itemId }: { itemId: number }) => {
  const [replyStates, setReplyStates] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [replyTexts, setReplyTexts] = useState<{ [key: number]: string }>({});
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);
      if (response.data.msg === "success" && response.data.code === 1) {
        return response.data.data;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { data, error, isLoading } = useSWR<Comment>(
    `http://localhost:8080/products/${itemId}/review`,
    fetcher
  );

  // Auto reload effect when success message is shown
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isSuccess) {
      // Set timeout to reload page after 5 seconds
      timeoutId = setTimeout(() => {
        mutate(`http://localhost:8080/products/${itemId}/review`);
        setIsSuccess(false);
      }, 5000);
    }

    // Cleanup function to clear timeout if component unmounts
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isSuccess]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;
  if (!data) return null;



  const toggleReply = (parentId: number) => {
    setReplyStates((prev) => ({
      ...prev,
      [parentId]: !prev[parentId],
    }));
  };

  const handleInputChange = (parentId: number, value: string) => {
    setReplyTexts((prev) => ({
      ...prev,
      [parentId]: value,
    }));
  };

  const userId = localStorage.getItem("userId");

  const handleSubmitReply = async (parentId: number) => {
    const replyContent = replyTexts[parentId];
    if (!replyContent.trim()) return;

    const reviewDTO = {
      itemId: itemId,
      userId: userId,
      content: replyContent,
      parent: parentId,
    };

    console.log("Submitted item : ", reviewDTO);

    try {
      const response = await axios.post(
        `http://localhost:8080/orders/${userId}`,
        reviewDTO
      );

      if (response.data.code === 1 && response.data.msg === "success") {
        console.log("Reply submitted !");
        setIsSuccess(true);
      } else {
        alert("Error submitting reply");
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const groupedComments: Record<number, CommentList[]> = {};

  data.productCommentLists.forEach((comment) => {
    if (!groupedComments[comment.parent]) {
      groupedComments[comment.parent] = [];
    }
    groupedComments[comment.parent].push(comment);
  });

  Object.keys(groupedComments).forEach((parentId) => {
    groupedComments[parseInt(parentId)] = groupedComments[
      parseInt(parentId)
    ].sort(
      (a, b) =>
        new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
    );
  });

  
  return (
    <div className="p-4">
      {isSuccess && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white font-semibold rounded-lg shadow-lg px-6 py-3 flex items-center space-x-4 animate-fade-in">
          <span>✅ Reply submitted successfully!</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Reloading in 5 seconds...</span>
            <button
              className="bg-white text-green-600 px-3 py-1 rounded-full font-bold hover:bg-gray-200 transition"
              onClick={() => {
                setIsSuccess(false)
                mutate(`http://localhost:8080/products/${itemId}/review`);
              }}
            >
              Reload Now
            </button>
          </div>
        </div>
      )}

      {Object.entries(groupedComments).map(([parentId, comments]) => {
        const parentComment = comments.find((comment) => comment.root === 0);
        const replies = comments.filter((comment) => comment.root > 0);

        return (
          <div
            key={parentId}
            className="mb-4 p-3 border border-gray-300 rounded-lg"
          >
            {parentComment && (
              <div className="p-3 bg-gray-100 rounded-md">
                <p>
                  <strong>{parentComment.username}</strong>:{" "}
                  {parentComment.content}
                </p>
                <p className="text-sm text-gray-600">
                  Created: {formatDate(parentComment.createTime)}
                </p>
              </div>
            )}

            <div className="ml-6 mt-2">
              {replies.map((comment) => (
                <div
                  key={comment.indexId}
                  className="p-2 border-l-2 border-gray-400 ml-4"
                >
                  <p>
                    <strong>{comment.username}</strong>: {comment.content}
                  </p>
                  <p className="text-sm text-gray-600">
                    Created: {formatDate(comment.createTime)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Button
                className="w-32"
                onClick={() => toggleReply(Number(parentId))}
              >
                {replyStates[Number(parentId)] ? "Close Reply" : "Add Reply"}
              </Button>
            </div>

            {replyStates[Number(parentId)] && (
              <div className="w-full mt-2 flex gap-4">
                <Input
                  placeholder="Write your reply..."
                  className="p-2 border border-gray-300 rounded flex-1"
                  value={replyTexts[Number(parentId)] || ""}
                  onChange={(e) =>
                    handleInputChange(Number(parentId), e.target.value)
                  }
                />
                <Button
                  className="w-32"
                  onClick={() => handleSubmitReply(Number(parentId))}
                  disabled={!replyTexts[Number(parentId)]?.trim()}
                >
                  Submit
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductComment;