package com.example.logis_app.service.Impl;

import com.example.logis_app.Mapper.CheckOutMapper;
import com.example.logis_app.pojo.DTO.CartDTO.PlaceOrderDTO;
import com.example.logis_app.service.CheckOutService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Transactional
@Service
@Slf4j
public class CheckOutServiceImpl implements CheckOutService {

    @Autowired
    private CheckOutMapper checkOutMapper;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Transactional
    @Override
    public void placeOrder(List<PlaceOrderDTO> placeOrderDTOS, Integer userId) {
        String orderId = new String(UUID.randomUUID().toString());
        log.info("Place Order. ");
        for(PlaceOrderDTO placeOrderDTO : placeOrderDTOS) {
            placeOrderDTO.setOrderId(orderId);
            placeOrderDTO.setUserId(userId);
            checkOutMapper.placeOrder(placeOrderDTO);
            checkOutMapper.updateOrderStatus(placeOrderDTO.getCartId());
        }
        String redisKey = "cart:" + placeOrderDTOS.get(0).getUserId();
        redisTemplate.delete(redisKey);
    }
}
