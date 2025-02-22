package com.example.logis_app.Mapper;

import com.example.logis_app.pojo.PageResult.Transaction;
import com.example.logis_app.pojo.PageResult.TransactionPage;
import com.example.logis_app.pojo.RequestParam.TransactionQueryParam;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface TransactionMapper {

     List<Transaction> transactionList();

     Integer findAllTransactionList();

     List<Transaction> querySpecificTransaction(TransactionQueryParam transactionQueryParam);
}
