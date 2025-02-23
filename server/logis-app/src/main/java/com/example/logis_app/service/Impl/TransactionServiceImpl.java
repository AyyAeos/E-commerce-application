package com.example.logis_app.service.Impl;

import com.example.logis_app.Mapper.TransactionMapper;
import com.example.logis_app.pojo.PageResult.Transaction;
import com.example.logis_app.pojo.PageResult.TransactionPage;
import com.example.logis_app.pojo.RequestParam.TransactionQueryParam;
import com.example.logis_app.service.TransactionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@Slf4j
@Transactional
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionMapper transactionMapper;

    @Override
    public TransactionPage transactionList() {
        Integer count = transactionMapper.findAllTransactionList();
        List<Transaction> list =  transactionMapper.transactionList();
        return new TransactionPage(list,1,10, count);
    }

    @Override
    public TransactionPage querySpecificTransaction(TransactionQueryParam transactionQueryParam) {
        transactionQueryParam.setStart( (transactionQueryParam.getPage() - 1)* transactionQueryParam.getPageLimit());
        Integer count = transactionMapper.findAllTransactionList();
        List<Transaction> list = transactionMapper.querySpecificTransaction(transactionQueryParam);
        return new TransactionPage(list,transactionQueryParam.getPage(),transactionQueryParam.getPageLimit(), count);
    }

    @Override
    public void addNewTransaction(TransactionQueryParam transactionQueryParam) {
        transactionMapper.addNewTransaction(transactionQueryParam);
        transactionMapper.addNewTransactionDetails(transactionQueryParam);
        BigDecimal amount = BigDecimal.valueOf(transactionQueryParam.getAmount());
        if(transactionQueryParam.getTransactionType().equals("SALE")) {
            transactionMapper.addBalance(amount);
        } else {
            transactionMapper.minusBalance(amount);
        }
    }

    @Override
    public void modifyTransaction(TransactionQueryParam transactionQueryParam) {
        transactionMapper.modifyTransaction(transactionQueryParam);
        transactionMapper.modifyTransactionDetails(transactionQueryParam);
    }

    @Override
    public void deleteTransaction(Integer id) {
        transactionMapper.deleteTransaction(id);
    }
}
