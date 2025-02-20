package com.example.logis_app.pojo;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor

public class User {
    private Integer userId;
    private String name;
    private String phone;
    private String role;
    private LocalDateTime createTime;
    private LocalDateTime lastUpdatedTime;
    private String username;
    private String password;
    private String email;
}
