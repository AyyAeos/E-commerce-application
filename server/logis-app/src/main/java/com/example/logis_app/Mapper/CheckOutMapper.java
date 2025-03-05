package com.example.logis_app.Mapper;

import com.example.logis_app.pojo.RequestParam.SelectedItem;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface CheckOutMapper {
    void placeOrder(SelectedItem selectedItems);
}
