package com.example.logis_app.service.Impl;

import com.example.logis_app.Mapper.LoginMapper;
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
    public Boolean login(LoginQueryParam loginQueryParam) {
        String storedPassword =  loginMapper.login(loginQueryParam);

        if (storedPassword == null) {
            return false;
        }
        log.info(storedPassword);
        log.info(loginQueryParam.getPassword());
        return storedPassword.equals(loginQueryParam.getPassword());

    }

    @Override
    public Boolean register(RegisterParam registerParam) {
        return loginMapper.register(registerParam) > 0 ;
    }
}
