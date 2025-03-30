package com.example.logis_app.Mapper;

import com.example.logis_app.pojo.DTO.ProductDTO.ReviewDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface OrderMapper {
    List<Map<String, Object>> getOrderList(Integer userId);



    void updateItemCommentCount(Integer itemId);

    Integer insertItemCommentIfNotExists(ReviewDTO reviewDTO);

    Integer insertItemCommentIndex(ReviewDTO reviewDTO);

    Integer checkItemExist(Integer userId);

    void insertReviewDetails(ReviewDTO reviewDTO);

    void storeComment(ReviewDTO reviewDTO);

    Integer findMaxParent(Integer itemId);

    Integer findMaxRoot(Integer itemId, Integer parent);
}
