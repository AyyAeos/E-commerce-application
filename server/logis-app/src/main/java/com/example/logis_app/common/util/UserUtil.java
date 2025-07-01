package com.example.logis_app.common.util;

import com.example.logis_app.model.vo.LoginVO.LoginUser;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserUtil {

    private UserUtil(){}

    public static LoginUser getUser() {
        var context = SecurityContextHolder.getContext();
        if (context == null || context.getAuthentication() == null || context.getAuthentication().getPrincipal() == null) {
            throw new RuntimeException("User is not authenticated");
        }

        return (LoginUser) context.getAuthentication().getPrincipal();
    }
}
