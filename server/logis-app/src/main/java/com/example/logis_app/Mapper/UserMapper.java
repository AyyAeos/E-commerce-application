package com.example.logis_app.Mapper;

import com.example.logis_app.common.enums.UserRole;
import com.example.logis_app.pojo.vo.UserVO.UserPage;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper

public interface UserMapper {
    List<UserPage> getUserList(Integer start, Integer pageLimit, UserRole role);
}
