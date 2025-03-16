package com.example.logis_app.service.Impl;

import com.example.logis_app.Mapper.InventoryMapper;
import com.example.logis_app.exception.ItemAlreadyExistsException;
import com.example.logis_app.pojo.PageResult.InventoryPage;
import com.example.logis_app.pojo.PageResult.Product.ProductPage;
import com.example.logis_app.pojo.PageResult.Product.Variants;
import com.example.logis_app.pojo.RequestParam.InventoryAddItem;
import com.example.logis_app.pojo.RequestParam.InventoryQueryParam;
import com.example.logis_app.pojo.RequestParam.InventoryVariants;
import com.example.logis_app.service.InventoryService;
import com.example.logis_app.util.ProductPageUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Transactional
@Service
@Slf4j
public class InventoryServiceImpl implements InventoryService {
    @Autowired
    private InventoryMapper inventoryMapper;

    @Override
    public InventoryPage getItemBySelected(InventoryQueryParam inventoryQueryParam) {
        inventoryQueryParam.setBegin((inventoryQueryParam.getPage() - 1) * inventoryQueryParam.getPageLimits());
        List<Map<String, Object>> productList =  inventoryMapper.getItemBySelected(inventoryQueryParam);
        Integer itemCounts = inventoryMapper.getSum(inventoryQueryParam);
        Integer page = inventoryQueryParam.getPage();
        Integer pageLimits = inventoryQueryParam.getPageLimits();

        List<ProductPage> list =  ProductPageUtil.transformToProductPage(productList);

        return new InventoryPage(list, itemCounts, page, pageLimits );


    }



    @Override
    public Boolean insertNewItem(InventoryAddItem inventoryAddItem) {

            // Check if the item already exists in the database
            Boolean isValid = inventoryMapper.checkItem(inventoryAddItem.getItemName());

            // If item does not exist, proceed to insert
            if (isValid == null || !isValid) {
                // Insert the main item into the inventory
                inventoryMapper.insertItem(inventoryAddItem);

                // Get the generated item ID
                Integer itemId = inventoryAddItem.getItemId();

                // Insert the variants associated with the item
                for (InventoryVariants inventoryVariants : inventoryAddItem.getVariants()) {
                    inventoryVariants.setItemId(itemId); // Associate variant with the new item
                    inventoryMapper.insertItemSize(inventoryVariants); // Insert each variant
                }
                return true;
            }
            return false;
    }


    @Override
    public void updateItem(InventoryQueryParam item) {

        inventoryMapper.updateItem(item);
        inventoryMapper.updateInventorySize(item);
    }

    @Override
    public void deleteItem(Integer id, Integer sizeId) {
        inventoryMapper.deleteItem(id, sizeId);
    }
}
