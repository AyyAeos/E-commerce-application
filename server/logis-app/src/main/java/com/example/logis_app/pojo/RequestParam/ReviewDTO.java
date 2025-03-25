package com.example.logis_app.pojo.RequestParam;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {
    private Integer indexId;
    private Integer itemId;

    private Integer commentId;

    private Integer userId;
    private String content;
    private LocalDateTime placedAt;
    private Integer quantity;
    private String itemName;
    private String sizeName;


    private Integer likeCount;
    private String type = "AuthorSend";

    private Integer parent;
    private Integer root;

    private LocalDateTime createTime;
}
