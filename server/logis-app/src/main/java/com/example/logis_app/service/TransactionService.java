package com.example.logis_app.service;

import com.example.logis_app.pojo.PageResult.TransactionPage;
import com.example.logis_app.pojo.RequestParam.TransactionQueryParam;

import java.util.List;

public interface TransactionService {
    TransactionPage transactionList();

    TransactionPage querySpecificTransaction(TransactionQueryParam transactionQueryParam);

    void addNewTransaction(TransactionQueryParam transactionQueryParam);

    void modifyTransaction(TransactionQueryParam transactionQueryParam);

    void deleteTransaction(Integer id);
}
