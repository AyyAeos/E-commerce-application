package com.example.logis_app.model.vo.LoginVO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Integer userId;
    private String name;
    private String userPhone;
    private LocalDateTime userCreateTime;
    private LocalDateTime userLastModifiedTime;
    private String userName;
    private String password;
    private String email;
    private UserRole role;
}
