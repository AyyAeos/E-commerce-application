import useSWR, { mutate } from "swr";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import ParentComment from "./ParentComment";

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
  quantity?: number;
  itemName?: string;
  sizeName?: string;
  likedUser: number[];
}

export interface Comment {
  itemId: number;
  count: number;
  productCommentLists: CommentList[];
}

const ProductComment = ({ itemId }: { itemId: number }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const fetcher = async (url: string) => {
    try {
      const response = await axiosInstance.get(url);
      if (response.data.msg === "success" && response.data.code === 1) {
        console.log(response.data.data);

        return response.data.data;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return null;
  };

  const { data, error, isLoading } = useSWR<Comment>(
    `http://localhost:8080/products/${itemId}/review`,
    fetcher
  );

  // Auto reload effect when a reply is submitted successfully
  useEffect(() => {
    if (isSuccess) {
      const timeoutId = setTimeout(() => {
        mutate(`http://localhost:8080/products/${itemId}/review`);
        setIsSuccess(false);
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [isSuccess]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;
  if (!data) return null;

  const userId = localStorage.getItem("userId") || "";

  // Group comments by parentId
  const groupedComments: Record<number, CommentList[]> = {};
  data.productCommentLists.forEach((comment) => {
    if (!groupedComments[comment.parent]) {
      groupedComments[comment.parent] = [];
    }
    groupedComments[comment.parent].push(comment);
  });

  // Sort comments by newest first
  Object.keys(groupedComments).forEach((parentId) => {
    groupedComments[parseInt(parentId)]?.sort(
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
              mutate(`http://localhost:8080/products/${itemId}/review`);
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
