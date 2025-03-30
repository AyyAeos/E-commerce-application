package com.example.logis_app.Mapper;

import java.util.List;

import com.example.logis_app.pojo.vo.ProductVO.CartPage;
import com.example.logis_app.pojo.DTO.CartDTO.ModifyCartDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper

public interface CartMapper {

    List<CartPage> checkCart(Integer id);

    void modifyQuantity(ModifyCartDTO modifyCartDTO);
}
