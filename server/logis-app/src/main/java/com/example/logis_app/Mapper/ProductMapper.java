package com.example.logis_app.Mapper;

import com.example.logis_app.pojo.PageResult.Product.ProductComment;
import com.example.logis_app.pojo.PageResult.Product.ProductCommentList;
import com.example.logis_app.pojo.PageResult.Product.ProductPage;
import com.example.logis_app.pojo.PageResult.Product.Variants;
import com.example.logis_app.pojo.RequestParam.AddItemToCartQueryParam;

import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Mapper
public interface ProductMapper {


    List<Map<String, Object>> getProductList();

    List<Map<String,Object>> getSpecificProduct(Integer id);

    void addToCard(AddItemToCartQueryParam addItemToCartQueryParam);

    BigDecimal checkPrice(Integer sizeId);

    boolean checkProductExist(AddItemToCartQueryParam addItemToCartQueryParam);


    void updateQuantity(AddItemToCartQueryParam addItemToCartQueryParam);

    List<ProductCommentList> getCommentsByItemId(Integer itemId);

    Integer getCommentCount(Integer itemId);
}
