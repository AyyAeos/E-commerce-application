package com.example.logis_app.service;

import java.util.List;

import com.example.logis_app.pojo.User;

import main.java.com.example.logis_app.pojo.PageResult.CustomerPage;

public interface AdminService {
    List<CustomerPage> userList();
}
