package com.example.logis_app.Mapper;

import java.util.List;

import com.example.logis_app.pojo.PageResult.UserPage;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminMapper {
    public List<UserPage> findAllUserList();
}

