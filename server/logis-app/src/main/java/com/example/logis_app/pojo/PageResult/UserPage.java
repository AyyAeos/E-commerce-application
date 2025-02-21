package main.java.com.example.logis_app.pojo.PageResult;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public abstract class UserPage {
private Integer userId;
private String userFullName;
private String userPhone;
private String userRole;
private String userCreateTime;
private String userLastModifiedTime;
private String username;
private String password;
private String email;
}
