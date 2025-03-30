package com.example.logis_app.service;

import com.example.logis_app.common.enums.UserRole;
import com.example.logis_app.pojo.vo.UserVO.UserPage;

import java.util.List;

public interface UserService {
    List<UserPage> getUserList(Integer page, Integer pageLimit, UserRole role);
}
