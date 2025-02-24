package com.example.logis_app.Mapper;

import com.example.logis_app.pojo.PageResult.InventoryPage;
import com.example.logis_app.pojo.RequestParam.InventoryQueryParam;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface InventoryMapper {
    List<InventoryPage> getAllItems();

    List<InventoryPage> getItemBySelected(InventoryQueryParam inventoryQueryParam);

    void insertItem(InventoryQueryParam inventoryQueryParam);

    void updateItem(InventoryQueryParam item);

    void deleteItem(Integer id);

    void insertItemSize(InventoryQueryParam inventoryQueryParam);

    void updateInventorySize(InventoryQueryParam item);
}
