import { useState } from 'react';
import axios from 'axios';
import { CommentList } from './ProductComment';

//optinal array can be []
export const useReplies = (parentId: number, initialReplies: CommentList[] = []) => {
    //Store replies from api
  const [replies, setReplies] = useState<CommentList[]>(initialReplies);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreReplies = async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
        console.log(`http://localhost:8080/products/replies?parentId=${parentId}&page=${page}&pageLimit=4`);
        
      const response = await axios.get(
        `http://localhost:8080/products/replies?parentId=${parentId}&page=${page}&pageLimit=4`
      );

      if (response.data.code === 1 && response.data.data?.length > 0) {
        setReplies(prev => [...prev, ...response.data.data]);
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading replies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    replies,
    loadMoreReplies,
    isLoading,
    hasMore,
    setReplies
  };
};