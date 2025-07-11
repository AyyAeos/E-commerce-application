package com.example.logis_app.service.Impl;

import java.util.*;
import java.util.concurrent.TimeUnit;

import com.example.logis_app.model.DTO.CartDTO.ModifyCartDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.example.logis_app.Mapper.CartMapper;
import com.example.logis_app.model.vo.ProductVO.CartPage;
import com.example.logis_app.service.CartService;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Slf4j
public class CartServiceImpl implements CartService {

    @Autowired
    private CartMapper cartMapper;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Override
    public List<CartPage> checkCart(Integer userId) {
        String redisKey = "cart:" + userId;
        log.info(redisKey);

        long startTime = System.nanoTime();

        // check if userId have stored in redis
        List<CartPage> cachedCart = (List<CartPage>) redisTemplate.opsForValue().get(redisKey);

        long endTime = System.nanoTime();

        log.info(" Time for redis = {} ", endTime - startTime);

        if (cachedCart != null) {
            System.out.println("Cart data fetched from Redis for user: " + userId);
            return cachedCart;
        }

        startTime = System.nanoTime();
        List<CartPage> cartData = cartMapper.checkCart(userId);
        endTime = System.nanoTime();

        log.info("Time for db = {} ms", (endTime - startTime) / 1_000_000);

        // store in redis with expired time 10 min
        redisTemplate.opsForValue().set(redisKey, cartData);
        redisTemplate.expire(redisKey, 10, TimeUnit.MINUTES);

        log.info("Cart data fetched from DB and cached in Redis for user: " + userId + cartData.toString());
        return cartData;
    }

    @Override
    public void modifyQuantity(ModifyCartDTO modifyCartDTO) {
        cartMapper.modifyQuantity(modifyCartDTO);
        String redisKey = "cart:" + modifyCartDTO.getUserId();
        redisTemplate.delete(redisKey);
        log.info("Cart updated in DB and Redis cache invalidated for user: " + modifyCartDTO.getUserId());
    }
}
