import { useState } from "react";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

import {
  MessageCircle,
  ThumbsUp,
  Send,
  Calendar,
  Tag,
  ShoppingBag,
  Ruler,
  Hash,
} from "lucide-react";
import useSWR, { mutate } from "swr";
import { useReplies } from "./Replies";
import axiosInstance from "@/utils/axiosInstance";
import { CommentList } from "../type";
import { set } from "lodash";

const ParentComment = ({
  userId,
  parentId,
  parentComment,
  itemId,
  setIsSuccess,
}: {
  userId: string;
  parentId: number;
  parentComment: CommentList;
  itemId: number;
  setIsSuccess: (value: boolean) => void;
}) => {
  const [replyStates, setReplyStates] = useState<boolean>(false);
  const [replyTexts, setReplyTexts] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyTo, setReplyTo] = useState<string>("");

  const {
    replies,
    loadMoreReplies,
    isLoading: isLoadingReplies,
    hasMore,
    refetchReplies,
  } = useReplies(parentId);

  const handleSubmitReply = async (parentId: number) => {
    setIsSubmitting(true);

    const reviewDTO = {
      itemId,
      content: replyTexts,
      parent: parentId,
      replyTo,
    };

    try {
      const response = await axiosInstance.post(`/orders`, reviewDTO);

      if (response.data.code === 1 && response.data.msg === "success") {
        setIsSuccess(true);
        setReplyTexts("");
        setReplyStates(false);
        setReplyTo("");
      } else {
        alert("Error submitting reply");
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
      alert("Error submitting reply");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (indexId: number, likedUser: number[]) => {
    const isLiked =
      Array.isArray(likedUser) && likedUser.includes(Number(userId));

    const likeDTO = {
      indexId: indexId,
      like: isLiked,
    };

    try {
      const response = await axiosInstance.post(`/products/like`, likeDTO);
      mutate(`/products/${itemId}/review`);
      await refetchReplies();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 mb-4">
      {/* Parent Comment Header */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <div className="flex-grow">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold">
                {parentComment.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                {parentComment.username}
              </h3>
              <p className="text-xs text-gray-500 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(parentComment.createTime).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* prevent includes undefined error */}
        <button
          className={`flex items-center text-xs font-semibold px-2 py-1 rounded-lg transition-all ${
            (parentComment.likedUser ?? []).includes(Number(userId))
              ? "bg-blue-100 text-blue-600 border border-blue-400 shadow-md"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
          onClick={() =>
            handleLike(parentComment.indexId, parentComment.likedUser)
          }
        >
          <ThumbsUp className="w-3 h-3 mr-1" />
          {(parentComment.likedUser ?? []).length}
        </button>
      </div>

      {/* Parent Comment Content */}
      <div className="p-4">
        <p className="text-gray-700 mb-4">{parentComment.content}</p>

        {/* Additional Details */}
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
          {parentComment.type && (
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2 text-gray-500" />
              <span>{parentComment.type}</span>
            </div>
          )}
          {parentComment.itemName && (
            <div className="flex items-center">
              <ShoppingBag className="w-4 h-4 mr-2 text-gray-500" />
              <span>{parentComment.itemName}</span>
            </div>
          )}
          {parentComment.sizeName && (
            <div className="flex items-center">
              <Ruler className="w-4 h-4 mr-2 text-gray-500" />
              <span>{parentComment.sizeName}</span>
            </div>
          )}
          {parentComment.quantity !== undefined && (
            <div className="flex items-center">
              <Hash className="w-4 h-4 mr-2 text-gray-500" />
              <span>Quantity: {parentComment.quantity}</span>
            </div>
          )}
        </div>
      </div>

      {/* Child Comments */}
      {replies.length > 0 && (
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center mb-3">
            <MessageCircle className="w-5 h-5 mr-2 text-gray-500" />
            <span className="text-sm font-medium text-gray-600">
              {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
            </span>
          </div>
          {replies.map((comment) => (
            <div
              key={comment.indexId}
              className="bg-gray-50 rounded-lg p-3 mb-2 last:mb-0"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-700 font-bold text-sm">
                    {comment.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium text-gray-800 text-sm">
                      {comment.username}
                      {comment.replyTo && (
                        <>
                          <span className="text-gray-400 mx-1">
                            &gt;&gt;&gt;
                          </span>
                          {comment.replyTo}
                        </>
                      )}
                    </h4>

                    <h6 className="font-medium text-gray-800 text-sm"></h6>

                    <button
                      className={`flex items-center text-xs font-semibold px-2 py-1 rounded-lg transition-all ${
                        (comment.likedUser ?? []).includes(Number(userId))
                          ? "bg-blue-100 text-blue-600 border border-blue-400 shadow-md"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                      onClick={() =>
                        handleLike(comment.indexId, comment.likedUser ?? [])
                      }
                    >
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      {new Set(comment.likedUser ?? []).size}
                    </button>
                  </div>
                  <p className="text-gray-700 text-sm">{comment.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(comment.createTime).toLocaleString()}
                  </p>
                  {/* Reply Button */}
                  <button
                    className="text-xs text-blue-600 hover:underline right"
                    onClick={() => setReplyTo(comment.username)}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reply Section */}
      <div className="p-4 border-t border-gray-100 text-pink-200">
        <Button
          variant="outline"
          size="sm"
          className="mb-3"
          onClick={() => setReplyStates((prev) => !prev)}
        >
          {replyStates ? "Cancel Reply" : "Add Reply"}
        </Button>

        {replyStates && (
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold">U</span>
            </div>
            <div className="flex-grow">
              <Input
                placeholder="Write your reply..."
                value={replyTexts}
                onChange={(e) => setReplyTexts(e.target.value)}
                className="mb-2"
                disabled={isSubmitting}
              />
              <Button
                onClick={() => handleSubmitReply(parentId)}
                disabled={!replyTexts?.trim() || isSubmitting}
                className="flex items-center"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? "Sending..." : "Send Reply"}
              </Button>
              {replyTo && (
                <p className="text-xs text-gray-500 mb-1">
                  Replying to{" "}
                  <span className="font-semibold text-gray-600">{replyTo}</span>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      {hasMore && (
        <div className="flex justify-center mb-4">
          <Button onClick={loadMoreReplies} disabled={isLoadingReplies}>
            {isLoadingReplies ? "Loading..." : "Load More Replies"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ParentComment;
