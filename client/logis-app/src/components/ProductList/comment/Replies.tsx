import { useState } from "react";

import axiosInstance from "@/utils/axiosInstance";
import { CommentList } from "../type";

//optinal array can be []
export const useReplies = (
  parentId: number,
  initialReplies: CommentList[] = []
) => {
  //Store replies from api
  const [replies, setReplies] = useState<CommentList[]>(initialReplies);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreReplies = async () => {
  if (!hasMore || isLoading) return ;

    setIsLoading(true);
    try {

      const response = await axiosInstance.get(
        `/products/replies?parentId=${parentId}&page=${page}&pageLimit=4`
      );

      if (response.data.code === 1 && response.data.data?.length > 0) {
        console.log("Response = " , response.data.data);
        
        setReplies((prev) => [...prev, ...response.data.data]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading replies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    replies,
    loadMoreReplies,
    isLoading,
    hasMore,
    setReplies,
  };
};
