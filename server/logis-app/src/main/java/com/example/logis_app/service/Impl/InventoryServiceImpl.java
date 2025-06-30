package com.example.logis_app.service.Impl;

import com.example.logis_app.Mapper.InventoryMapper;
import com.example.logis_app.model.vo.InventoryPage;
import com.example.logis_app.model.vo.ProductVO.ProductPage;
import com.example.logis_app.model.DTO.InventoryDTO.AddItemDTO;
import com.example.logis_app.model.DTO.InventoryDTO.QueryItemDTO;
import com.example.logis_app.model.DTO.InventoryDTO.InventoryVariantsDTO;
import com.example.logis_app.service.InventoryService;
import com.example.logis_app.common.util.ProductPageUtil;
import com.example.logis_app.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
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

    @Autowired
    private RedisTemplate redisTemplate;
    @Autowired
    private ProductService productService;

    @Override
    public InventoryPage getItemBySelected(QueryItemDTO queryItemDTO) {
        queryItemDTO.setBegin((queryItemDTO.getPage() - 1) * queryItemDTO.getPageLimits());
        List<Map<String, Object>> productList =  inventoryMapper.getItemBySelected(queryItemDTO);
        Integer itemCounts = inventoryMapper.getSum(queryItemDTO);
        Integer page = queryItemDTO.getPage();
        Integer pageLimits = queryItemDTO.getPageLimits();

        List<ProductPage> list =  ProductPageUtil.transformToProductPage(productList);

        return new InventoryPage(list, itemCounts, page, pageLimits );


    }



    @Override
    public Boolean insertNewItem(AddItemDTO addItemDTO) {

            // Check if the item already exists in the database
            Boolean isValid = inventoryMapper.checkItem(addItemDTO.getItemName());

            // If item does not exist, proceed to insert
            if (isValid == null || !isValid) {
                // Insert the main item into the inventory
                inventoryMapper.insertItem(addItemDTO);

                // Get the generated item ID
                Integer itemId = addItemDTO.getItemId();

                // Insert the variants associated with the item
                for (InventoryVariantsDTO inventoryVariantsDTO : addItemDTO.getVariants()) {
                    inventoryVariantsDTO.setItemId(itemId); // Associate variant with the new item
                    inventoryMapper.insertItemSize(inventoryVariantsDTO); // Insert each variant
                }

updateRedis();
                return true;
            }
            return false;
    }


    @Override
    public void updateItem(QueryItemDTO item) {

        inventoryMapper.updateItem(item);
        inventoryMapper.updateInventorySize(item);
updateRedis();
    }

    @Override
    public void deleteItem(Integer id, Integer sizeId) {
        inventoryMapper.deleteItem(id, sizeId);
        updateRedis();

    }

    private  void updateRedis() {
        redisTemplate.delete("product:list");
        List<ProductPage> updatedList = productService.getProductList();
        redisTemplate.opsForValue().set("product:list", updatedList);
    }
}
