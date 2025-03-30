package com.example.logis_app.service.Impl;

import com.example.logis_app.Mapper.CheckOutMapper;
import com.example.logis_app.pojo.DTO.CartDTO.PlaceOrderDTO;
import com.example.logis_app.service.CheckOutService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@Slf4j
public class CheckOutServiceImpl implements CheckOutService {

    @Autowired
    private CheckOutMapper checkOutMapper;

    @Transactional
    @Override
    public void placeOrder(List<PlaceOrderDTO> placeOrderDTOS) {

        for(PlaceOrderDTO placeOrderDTO : placeOrderDTOS) {
            log.info("Placing order: {}", placeOrderDTO);
        checkOutMapper.placeOrder(placeOrderDTO);
        checkOutMapper.updateOrderStatus(placeOrderDTO.getCartId());
        }

    }
}
