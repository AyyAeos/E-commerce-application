package com.example.logis_app.service;

import com.example.logis_app.pojo.vo.LoginVO.LoginPage;
import com.example.logis_app.pojo.DTO.LoginDTO.LoginDTO;
import com.example.logis_app.pojo.DTO.LoginDTO.RegisterDTO;

public interface LoginService {
    LoginPage login (LoginDTO loginDTO);

    Boolean register(RegisterDTO registerDTO);
}
