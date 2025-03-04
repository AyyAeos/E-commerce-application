package com.example.logis_app.service.Impl;

import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.TimeUnit;

import com.example.logis_app.pojo.RequestParam.CartQueryModify;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.example.logis_app.Mapper.CartMapper;
import com.example.logis_app.pojo.PageResult.Product.CartPage;
import com.example.logis_app.pojo.PageResult.Product.ProductPage;
import com.example.logis_app.pojo.PageResult.Product.Variants;
import com.example.logis_app.service.CartService;
import com.example.logis_app.util.ProductPageUtil;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    @Autowired
    private CartMapper cartMapper;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Override
    public List<CartPage> checkCart(Integer userId) {
        String redisKey = "cart:" + userId;

        // check if userId have stored in redis
        List<CartPage> cachedCart = (List<CartPage>) redisTemplate.opsForValue().get(redisKey);

        if (cachedCart != null) {
            System.out.println("Cart data fetched from Redis for user: " + userId);
            return cachedCart;
        }

        // if not in redis
        List<CartPage> cartData = cartMapper.checkCart(userId);

        // store in redis with expired time 10 min
        redisTemplate.opsForValue().set(redisKey, cartData);
        redisTemplate.expire(redisKey, 10, TimeUnit.MINUTES);

        System.out.println("Cart data fetched from DB and cached in Redis for user: " + userId);
        return cartData;
    }

    @Override
    public void modifyQuantity(CartQueryModify cartQueryModify) {
    cartMapper.modifyQuantity(cartQueryModify);

        // 2️⃣ Remove outdated cart data from Redis
        String redisKey = "cart:" + cartQueryModify.getUserId();
        redisTemplate.delete(redisKey);

        System.out.println("Cart updated in DB and Redis cache invalidated for user: " + cartQueryModify.getUserId());
    }
}
