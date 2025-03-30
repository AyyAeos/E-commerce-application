package com.example.logis_app.service;

import com.example.logis_app.pojo.vo.ProductVO.ProductComment;
import com.example.logis_app.pojo.vo.ProductVO.ProductCommentList;
import com.example.logis_app.pojo.vo.ProductVO.ProductPage;
import com.example.logis_app.pojo.DTO.CartDTO.AddCartDTO;
import com.example.logis_app.pojo.DTO.ProductDTO.LikeDTO;

import java.math.BigDecimal;
import java.util.List;

public interface ProductService {
    List<ProductPage> getProductList();

    ProductPage getSpecificProduct(Integer id);

    void addToCard(AddCartDTO addCartDTO);

    BigDecimal checkPrice(Integer sizeId);

    ProductComment getReviewList(Integer itemId);

    void updateLike(LikeDTO likeDTO);

    List<ProductCommentList> loadReplies(Integer parentId, Integer page, Integer pageLimit);
}
