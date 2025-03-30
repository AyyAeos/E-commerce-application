package com.example.logis_app.service.Impl;

import com.example.logis_app.Mapper.LoginMapper;
import com.example.logis_app.pojo.vo.LoginVO.LoginPage;
import com.example.logis_app.pojo.DTO.LoginDTO.LoginDTO;
import com.example.logis_app.pojo.DTO.LoginDTO.RegisterDTO;
import com.example.logis_app.service.LoginService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
public class LoginServiceImpl implements LoginService {
    @Autowired
    private LoginMapper loginMapper;

    @Override
    public LoginPage login(LoginDTO loginDTO) {
        LoginPage loginPage=  loginMapper.login(loginDTO);

        if (loginPage == null || !loginDTO.getPassword().equals(loginPage.getPassword())) {
            loginPage.setCredentails(false);
        }
        return new LoginPage(loginPage.getCredentails(), loginPage.getUserId(), loginPage.getPassword());
    }

    @Override
    public Boolean register(RegisterDTO registerDTO) {
        return loginMapper.register(registerDTO) > 0 ;
    }
}
