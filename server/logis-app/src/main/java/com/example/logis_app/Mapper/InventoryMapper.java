package com.example.logis_app.Mapper;

import com.example.logis_app.model.DTO.InventoryDTO.AddItemDTO;
import com.example.logis_app.model.DTO.InventoryDTO.QueryItemDTO;
import com.example.logis_app.model.DTO.InventoryDTO.InventoryVariantsDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface InventoryMapper {
    List<Map<String, Object>> getAllItems();

    List<Map<String, Object>> getItemBySelected(QueryItemDTO queryItemDTO);

    Integer insertItem(AddItemDTO addItemDTO);

    void updateItem(QueryItemDTO item);

    void deleteItem(Integer id, Integer sizeId);

    void insertItemSize(InventoryVariantsDTO inventoryVariantsDTO);

    void updateInventorySize(QueryItemDTO item);

    Integer getSum(QueryItemDTO queryItemDTO);

    Boolean checkItem(String itemName);
}
