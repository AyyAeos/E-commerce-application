package com.example.logis_app.Mapper;

import com.example.logis_app.pojo.PageResult.LoginPage;
import com.example.logis_app.pojo.RequestParam.LoginQueryParam;
import com.example.logis_app.pojo.RequestParam.RegisterParam;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {
    LoginPage login(LoginQueryParam loginQueryParam);

    Integer register(RegisterParam registerParam);
}
