package com.example.logis_app.service;

import com.example.logis_app.pojo.PageResult.TransactionPage;
import com.example.logis_app.pojo.RequestParam.TransactionQueryParam;

import java.util.List;

public interface TransactionService {
    TransactionPage transactionList();

    TransactionPage querySpecificTransaction(TransactionQueryParam transactionQueryParam);
}
