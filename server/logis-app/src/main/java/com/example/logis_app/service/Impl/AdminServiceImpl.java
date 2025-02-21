package com.example.logis_app.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.logis_app.Mapper.AdminMapper;
import com.example.logis_app.pojo.User;
import com.example.logis_app.service.AdminService;

import main.java.com.example.logis_app.pojo.PageResult.CustomerPage;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminMapper adminMapper;


    @Override
    public List<CustomerPage> userList() {
        return adminMapper.findAllUserList() ;
    }

    
}
