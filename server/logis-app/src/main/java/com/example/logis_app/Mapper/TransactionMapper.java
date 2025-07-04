package com.example.logis_app.Mapper;

import com.example.logis_app.model.vo.TransactionVO.Transaction;
import com.example.logis_app.model.DTO.TransactionQueryParam;
import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import java.util.List;
@Mapper
public interface TransactionMapper {

     List<Transaction> transactionList();

     Integer findAllTransactionList();

     List<Transaction> querySpecificTransaction(TransactionQueryParam transactionQueryParam);

     void addNewTransaction(TransactionQueryParam transactionQueryParam);

     void addNewTransactionDetails(TransactionQueryParam transactionQueryParam);

     void addBalance(BigDecimal amount);

     void minusBalance(BigDecimal amount);

     void modifyTransaction(TransactionQueryParam transactionQueryParam);

     void modifyTransactionDetails(TransactionQueryParam transactionQueryParam);

     void deleteTransaction(Integer id);
}
