package com.example.logis_app.service.Impl;

import java.time.LocalDateTime;
import java.util.List;

import com.example.logis_app.pojo.PageResult.UserPage;
import com.example.logis_app.pojo.RequestParam.AdminQueryParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.logis_app.Mapper.AdminMapper;
import com.example.logis_app.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminMapper adminMapper;


    @Override
    public List<UserPage> userList() {
        return adminMapper.findAllUserList() ;
    }

    @Override
    public void addNewAdmin(AdminQueryParam a) {

    }
}
