package com.example.logis_app.service.Impl;

import com.example.logis_app.Mapper.LoginMapper;
import com.example.logis_app.pojo.PageResult.LoginPage;
import com.example.logis_app.pojo.RequestParam.LoginQueryParam;
import com.example.logis_app.pojo.RequestParam.RegisterParam;
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
    public LoginPage login(LoginQueryParam loginQueryParam) {
        LoginPage loginPage=  loginMapper.login(loginQueryParam);

        if (loginPage == null || !loginQueryParam.getPassword().equals(loginPage.getPassword())) {
            loginPage.setCredentails(false);
        }
        return new LoginPage(loginPage.getCredentails(), loginPage.getUserId(), loginPage.getPassword());
    }

    @Override
    public Boolean register(RegisterParam registerParam) {
        return loginMapper.register(registerParam) > 0 ;
    }
}
