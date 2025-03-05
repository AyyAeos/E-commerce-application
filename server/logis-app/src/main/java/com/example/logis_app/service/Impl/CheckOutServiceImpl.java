package com.example.logis_app.service.Impl;

import com.example.logis_app.Mapper.CheckOutMapper;
import com.example.logis_app.pojo.RequestParam.SelectedItem;
import com.example.logis_app.service.CheckOutService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
public class CheckOutServiceImpl implements CheckOutService {

    @Autowired
    private CheckOutMapper checkOutMapper;

    @Transactional
    @Override
    public void placeOrder(List<SelectedItem> selectedItems) {

        for(SelectedItem selectedItem : selectedItems) {
            log.info("Placing order: {}", selectedItem);
        checkOutMapper.placeOrder(selectedItem);
        }

    }
}
