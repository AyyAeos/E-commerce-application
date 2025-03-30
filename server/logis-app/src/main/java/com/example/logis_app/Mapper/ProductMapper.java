package com.example.logis_app.Mapper;

import com.example.logis_app.pojo.vo.ProductVO.ProductCommentList;
import com.example.logis_app.pojo.DTO.CartDTO.AddCartDTO;
import com.example.logis_app.pojo.DTO.ProductDTO.LikeDTO;

import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Mapper
public interface ProductMapper {


    List<Map<String, Object>> getProductList();

    List<Map<String,Object>> getSpecificProduct(Integer id);

    void addToCard(AddCartDTO addCartDTO);

    BigDecimal checkPrice(Integer sizeId);

    boolean checkProductExist(AddCartDTO addCartDTO);


    void updateQuantity(AddCartDTO addCartDTO);

    List<ProductCommentList> getCommentsByItemId(Integer itemId);

    Integer getCommentCount(Integer itemId);

    List<Integer> getLikedUser(Integer indexId);

    void addLike(LikeDTO likeDTO);

    void removeLike(LikeDTO likeDTO);

	List<ProductCommentList> loadReplies(Integer parentId, Integer start, Integer pageLimit);
}
