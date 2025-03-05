package com.example.logis_app.service;

import com.example.logis_app.pojo.RequestParam.SelectedItem;

import java.util.List;

public interface CheckOutService {
    void placeOrder(List<SelectedItem> selectedItems);
}
