package com.example.logis_app.service;

import com.example.logis_app.pojo.DTO.LoginDTO.LoginDTO;
import com.example.logis_app.pojo.DTO.LoginDTO.RegisterDTO;
import com.example.logis_app.pojo.vo.LoginVO.LoginUser;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface LoginService extends UserDetailsService {

    @Override
    LoginUser loadUserByUsername(String username) throws UsernameNotFoundException;

    Boolean register(RegisterDTO registerDTO);

    String login(LoginDTO loginDTO);
}
