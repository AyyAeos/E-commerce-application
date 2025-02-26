package com.example.logis_app.pojo.RequestParam;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterParam {
    private Integer userId;
    private String name;
    private String userPhone;
    private String username;
    private String password;
    private String email;
}
