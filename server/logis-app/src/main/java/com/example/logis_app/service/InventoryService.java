package com.example.logis_app.service;

import com.example.logis_app.model.vo.InventoryPage;
import com.example.logis_app.model.DTO.InventoryDTO.AddItemDTO;
import com.example.logis_app.model.DTO.InventoryDTO.QueryItemDTO;

public interface InventoryService {

    InventoryPage getItemBySelected(QueryItemDTO queryItemDTO);

    Boolean insertNewItem( AddItemDTO addItemDTO);

    void updateItem(QueryItemDTO item);

    void deleteItem(Integer id, Integer sizeId);
}
