export type SelectedProduct = {
  itemId: number;
  itemName: string;
  description: string;
  variants: Variant[];
};

export type Variant = {
  size: string;
  stock: number;
  price: number;
  sizeId: number;
};

export type AddItemType = {
  itemId: number;
  itemName: string;
  sizeId: number;
  quantity: number;
  itemPrice: number;
};


export const getRandomGradient = () => {
    const gradients = [
      "from-blue-100 to-purple-100",
      "from-pink-100 to-rose-100",
      "from-green-100 to-teal-100",
      "from-amber-100 to-orange-100",
      "from-indigo-100 to-sky-100",
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  export type Comment = {
    itemId: number;
    count: number;
    productCommentLists: CommentList[];
  }

  export type CommentList = {
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
  replyTo : string;
}