package com.example.logis_app.service;

import java.util.List;

import com.example.logis_app.pojo.PageResult.DepartmentPage;
import com.example.logis_app.pojo.PageResult.UserPage;
import com.example.logis_app.pojo.RequestParam.AdminQueryParam;
import com.example.logis_app.pojo.RequestParam.DepartmentQueryParam;

public interface AdminService {
    List<UserPage> userList();

    void addNewAdmin(AdminQueryParam adminQueryParam);

    void modifyAdmin(AdminQueryParam adminQueryParam);

    void deleteAdmin(Integer id);
}
