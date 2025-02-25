package com.example.logis_app.Mapper;

import com.example.logis_app.pojo.PageResult.Product.ProductPage;
import com.example.logis_app.pojo.PageResult.Product.Variants;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ProductMapper {


    List<Map<String, Object>> getProductList();

    List<Map<String,Object>> getSpecificProduct(Integer id);

    void addToCard();
}
