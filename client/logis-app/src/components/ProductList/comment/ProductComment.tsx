import useSWR, { mutate } from "swr";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import ParentComment from "./ParentComment";
import { CommentList } from "../type";
import { useReplies } from "./Replies";

const ProductComment = ({ itemId }: { itemId: number }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const userFetcher = async (url: string) => {
    try {
      const response = await axiosInstance.get(url);
      if (response.data.code === 1 && response.data.msg === "success") {
        console.log("User data : ", response.data.data);
        
        return response.data.data;
      }
      throw new Error("User not authenticated");
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  };

  const fetcher = async (url: string) => {
    try {
      const response = await axiosInstance.get(url);
      if (response.data.msg === "success" && response.data.code === 1) {
        return response.data.data;
      }
      throw new Error("Failed to fetch comments");
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const { data :userID, error: userError, isLoading: userLoading } = useSWR("/logins/auth/me", userFetcher);
  const { data, error, isLoading } = useSWR<Comment>(`/products/${itemId}/review`, fetcher);

  const userId = userID?.userId;
  
  useEffect(() => {
    if (isSuccess) {
      const timeoutId = setTimeout(() => {
        mutate(`/products/${itemId}/review`);
        setIsSuccess(false);
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [isSuccess]);

  // Conditional rendering
  if (userLoading || isLoading) return <div>Loading...</div>;
  if (userError || !userID) return <div>Please log in</div>;
  if (error || !data) return <div>Error fetching comments</div>;



  // Group and sort comments
  const groupedComments: Record<number, CommentList[]> = {};
  data.productCommentLists.forEach((comment) => {
    if (!groupedComments[comment.parent]) {
      groupedComments[comment.parent] = [];
    }
    groupedComments[comment.parent].push(comment);
  });

  Object.keys(groupedComments).forEach((parentId) => {
    groupedComments[parseInt(parentId)].sort(
      (a, b) =>
        new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
    );
  });

  return (
    <div className="p-4">
      {isSuccess && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white font-semibold rounded-lg shadow-lg px-6 py-3 flex items-center space-x-4 animate-fade-in">
          <span>✅ Reply submitted successfully!</span>
          <button
            className="bg-white text-green-600 px-3 py-1 rounded-full font-bold hover:bg-gray-200 transition"
            onClick={() => {
              setIsSuccess(false);
             window.location.reload();
            }}
          >
            Reload Now
          </button>
        </div>
      )}

      {Object.entries(groupedComments).map(([parentId, comments]) => {
        const parentComment = comments.find((comment) => comment.root === 0);
        const replies = comments.filter((comment) => comment.root > 0);

        return (
          parentComment && (
            <ParentComment
              key={parentId}
              userId={userId}
              parentId={Number(parentId)}
              parentComment={parentComment}
              replies={replies}
              itemId={itemId}
              setIsSuccess={setIsSuccess}
            />
          )
        );
      })}
    </div>
  );
};

export default ProductComment;