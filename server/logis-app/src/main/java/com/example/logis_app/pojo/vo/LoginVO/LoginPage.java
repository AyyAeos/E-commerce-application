package com.example.logis_app.pojo.vo.LoginVO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginPage {
    private Boolean credentails = true;
    private Integer userId;

    private String password;
}
