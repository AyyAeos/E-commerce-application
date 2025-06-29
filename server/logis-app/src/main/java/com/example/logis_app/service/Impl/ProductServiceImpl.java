package com.example.logis_app.service.Impl;

import com.example.logis_app.Mapper.ProductMapper;
import com.example.logis_app.model.DTO.CartDTO.AddCartDTO;
import com.example.logis_app.model.DTO.ProductDTO.LikeDTO;
import com.example.logis_app.model.vo.ProductVO.ProductComment;
import com.example.logis_app.model.vo.ProductVO.ProductCommentList;
import com.example.logis_app.model.vo.ProductVO.ProductPage;
import com.example.logis_app.service.ProductService;
import com.example.logis_app.common.util.ProductPageUtil;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;

@Slf4j
@Service
@Transactional
public class ProductServiceImpl  implements ProductService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

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
    public void addToCard(AddCartDTO addCartDTO) {
         //check product exist
        if(productMapper.checkProductExist(addCartDTO)) {
            log.info("Product exist");
            productMapper.updateQuantity(addCartDTO);
        } else {
            log.info("Product not exist. Creating new product . . .");
            productMapper.addToCard(addCartDTO);
        }

        String redisKey = "cart:" + addCartDTO.getUserId();
        redisTemplate.delete(redisKey);
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
        List <ProductCommentList> list = productMapper.loadReplies(parentId, start, pageLimit);
        list.forEach(lists -> {
            lists.setLikedUser(productMapper.getLikedUser(lists.getIndexId()));
        });
      return list;
    }

    
    
}
