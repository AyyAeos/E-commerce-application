package com.example.logis_app.service.Impl;

import com.example.logis_app.Mapper.OrderMapper;
import com.example.logis_app.Mapper.ProductMapper;
import com.example.logis_app.pojo.PageResult.Product.*;
import com.example.logis_app.pojo.RequestParam.AddItemToCartQueryParam;
import com.example.logis_app.pojo.RequestParam.LikeDTO;
import com.example.logis_app.service.ProductService;
import com.example.logis_app.util.ProductPageUtil;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;

@Slf4j
@Service
@Transactional
public class ProductServiceImpl  implements ProductService {

    @Autowired
    private ProductMapper productMapper;
       @Override
    public List<ProductPage> getProductList() {
        
        List<Map<String, Object>> productList = productMapper.getProductList();
        return ProductPageUtil.transformToProductPage(productList);
    }

    @Override
    public ProductPage getSpecificProduct(Integer id) {
        List<Map<String, Object>> productList = productMapper.getSpecificProduct(id);
        List<ProductPage> products = ProductPageUtil.transformToProductPage(productList);
        return products.isEmpty() ? null : products.get(0);
    }

    @Override
    public void addToCard(AddItemToCartQueryParam addItemToCartQueryParam) {
         //check product exist
        if(productMapper.checkProductExist(addItemToCartQueryParam)) {
            log.info("Product exist");
            productMapper.updateQuantity(addItemToCartQueryParam);
        } else {
            log.info("Product not exist. Creating new product . . .");
            productMapper.addToCard(addItemToCartQueryParam);
        }
    }

    @Override
    public BigDecimal checkPrice(Integer sizeId) {
        return productMapper.checkPrice(sizeId);
    }

    @Override
    public ProductComment getReviewList(Integer itemId) {
        List<ProductCommentList> list = productMapper.getCommentsByItemId(itemId);
        list.forEach(lists -> {
            lists.setLikedUser(productMapper.getLikedUser(lists.getIndexId()));
        });
        Integer count = productMapper.getCommentCount(itemId);
        return new ProductComment(itemId, count, list);
    }

    @Override
    public void updateLike(LikeDTO likeDTO) {
        if(!likeDTO.getLike()) {
            productMapper.addLike(likeDTO);
        } else {
            productMapper.removeLike(likeDTO);
        }
        
    }

    @Override
    public List<ProductCommentList> loadReplies(Integer parentId, Integer page, Integer pageLimit) {
       Integer start = (page - 1) * pageLimit;
        return productMapper.loadReplies(parentId, start, pageLimit); 
    }

    
    
}
