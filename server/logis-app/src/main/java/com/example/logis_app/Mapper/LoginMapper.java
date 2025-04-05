package com.example.logis_app.Mapper;

import com.example.logis_app.pojo.DTO.LoginDTO.RegisterDTO;
import com.example.logis_app.pojo.vo.LoginVO.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {
    User login(String username);

    Integer register(RegisterDTO registerDTO);
}
