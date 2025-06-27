package com.example.logis_app.Mapper;

import java.util.List;

import com.example.logis_app.model.vo.ProductVO.CartPage;
import com.example.logis_app.model.DTO.CartDTO.ModifyCartDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper

public interface CartMapper {

    List<CartPage> checkCart(Integer id);

    void modifyQuantity(ModifyCartDTO modifyCartDTO);
}
