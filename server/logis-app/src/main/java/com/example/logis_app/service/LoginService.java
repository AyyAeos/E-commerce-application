package com.example.logis_app.service;

import com.example.logis_app.pojo.RequestParam.LoginQueryParam;
import com.example.logis_app.pojo.RequestParam.RegisterParam;

public interface LoginService {
    Boolean login(LoginQueryParam loginQueryParam);

    Boolean register(RegisterParam registerParam);
}
