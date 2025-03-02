package com.example.logis_app.service;

import com.example.logis_app.pojo.PageResult.LoginPage;
import com.example.logis_app.pojo.RequestParam.LoginQueryParam;
import com.example.logis_app.pojo.RequestParam.RegisterParam;

public interface LoginService {
    LoginPage login (LoginQueryParam loginQueryParam);

    Boolean register(RegisterParam registerParam);
}
