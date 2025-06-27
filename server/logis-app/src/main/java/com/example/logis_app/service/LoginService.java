package com.example.logis_app.service;

import com.example.logis_app.model.DTO.LoginDTO.LoginDTO;
import com.example.logis_app.model.DTO.LoginDTO.RegisterDTO;
import com.example.logis_app.model.vo.LoginVO.LoginUser;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface LoginService extends UserDetailsService {

 

    Boolean register(RegisterDTO registerDTO);

    LoginUser login(LoginDTO loginDTO);
}
