package com.example.logis_app.model.vo.ProductVO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductCommentList {
        private Integer indexId;
        private Integer userId;
        private String username;
        private Integer root;
        private Integer parent;
        private Integer likeCount;
        private String type;
        private LocalDateTime createTime;
        private Integer commentId;

        private String content;
        private Integer quantity;
        private String itemName;
        private String sizeName;
        private List<Integer> likedUser;
        private String replyTo;
}
