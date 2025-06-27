package com.example.logis_app.model.DTO.ChatbotDTO;

import java.util.Objects;

public class UserStatus {
    private String userName;
    private boolean appointedStatus;

    public UserStatus(String userName, boolean appointedStatus) {
        this.userName = userName;
        this.appointedStatus = appointedStatus;
    }

    public String getUserName() {
        return userName;
    }

    public boolean isAppointedStatus() {
        return appointedStatus;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserStatus)) return false;
        UserStatus that = (UserStatus) o;
        return appointedStatus == that.appointedStatus &&
                Objects.equals(userName, that.userName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userName, appointedStatus);
    }

    @Override
    public String toString() {
        return "UserStatus{" +
                "userName='" + userName + '\'' +
                ", appointedStatus=" + appointedStatus +
                '}';
    }
}