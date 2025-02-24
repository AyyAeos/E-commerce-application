package com.example.logis_app.service.Impl;

import java.time.LocalDateTime;
import java.util.List;

import com.example.logis_app.pojo.PageResult.AdminPage;
import com.example.logis_app.pojo.PageResult.UserPage;
import com.example.logis_app.pojo.RequestParam.AdminQueryParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import com.example.logis_app.Mapper.AdminMapper;
import com.example.logis_app.service.AdminService;
import org.springframework.transaction.annotation.Transactional;
@Slf4j
@Transactional
@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminMapper adminMapper;


    @Override
    public List<AdminPage> userList() {
        return adminMapper.findAllUserList() ;
    }

    @Override
    public void addNewAdmin(AdminQueryParam adminQueryParam) {
       adminQueryParam.setUserCreateTime(LocalDateTime.now());
       adminQueryParam.setUserLastModifiedTime(LocalDateTime.now());
       adminQueryParam.setAdminHireDateTime(LocalDateTime.now());
        adminMapper.addNewAdmin(adminQueryParam);
        adminMapper.insertNewAdminDetails(adminQueryParam);
    }

    @Override
    public void modifyAdmin(AdminQueryParam adminQueryParam) {
        adminQueryParam.setUserLastModifiedTime(LocalDateTime.now());
        adminMapper.modifyAdmin(adminQueryParam);
        adminMapper.modifyAdminDetails(adminQueryParam);
    }

    @Override
    public void deleteAdmin(Integer id) {
        adminMapper.deleteAdmin(id);
    }
}
