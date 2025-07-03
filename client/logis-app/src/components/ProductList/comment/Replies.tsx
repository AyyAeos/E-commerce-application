import { useState } from "react";

import axiosInstance from "@/utils/axiosInstance";
import { CommentList } from "../type";

//fetch replies custom hooks
export const useReplies = (
  parentId: number,
  initialReplies: CommentList[] = []
) => {
  //Store replies
  const [replies, setReplies] = useState<CommentList[]>(initialReplies);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreReplies = async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/products/replies?parentId=${parentId}&page=${page}&pageLimit=4`
      );

      if (response.data.code === 1 && response.data.data?.length > 0) {
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

  const refetchReplies = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/products/replies?parentId=${parentId}&page=1&pageLimit=${page * 4}`
      );

      if (response.data.code === 1) {
        setReplies(response.data.data);
        setPage(2); // reset page to next page
        setHasMore(response.data.data.length >= 4);
      }
    } catch (error) {
      console.error("Error refreshing replies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    refetchReplies,
    replies,
    loadMoreReplies,
    isLoading,
    hasMore,
    setReplies,
  };
};
