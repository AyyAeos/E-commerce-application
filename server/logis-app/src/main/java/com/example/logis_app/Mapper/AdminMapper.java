package com.example.logis_app.Mapper;

import java.util.List;

import com.example.logis_app.pojo.PageResult.UserPage;
import com.example.logis_app.pojo.RequestParam.AdminQueryParam;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminMapper {
    public List<UserPage> findAllUserList();

    void addNewAdmin(AdminQueryParam adminQueryParam);

    void insertNewAdminDetails(AdminQueryParam adminQueryParam);

    void modifyAdmin(AdminQueryParam adminQueryParam);

    void modifyAdminDetails(AdminQueryParam adminQueryParam);

    void deleteAdmin(Integer id);
}

