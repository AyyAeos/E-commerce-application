package com.example.logis_app.service;

import com.example.logis_app.model.vo.TransactionVO.TransactionPage;
import com.example.logis_app.model.DTO.TransactionQueryParam;


public interface TransactionService {
    TransactionPage transactionList();

    TransactionPage querySpecificTransaction(TransactionQueryParam transactionQueryParam);

    void addNewTransaction(TransactionQueryParam transactionQueryParam);

    void modifyTransaction(TransactionQueryParam transactionQueryParam);

    void deleteTransaction(Integer id);
}
