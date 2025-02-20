package com.example.logis_app.Mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.logis_app.pojo.User;

@Mapper
public interface AdminMapper {
    public List<User> findAllUserList();
}

