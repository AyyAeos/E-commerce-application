package com.example.logis_app.Mapper;

import com.example.logis_app.pojo.vo.LoginVO.LoginPage;
import com.example.logis_app.pojo.DTO.LoginDTO.LoginDTO;
import com.example.logis_app.pojo.DTO.LoginDTO.RegisterDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {
    LoginPage login(LoginDTO loginDTO);

    Integer register(RegisterDTO registerDTO);
}
