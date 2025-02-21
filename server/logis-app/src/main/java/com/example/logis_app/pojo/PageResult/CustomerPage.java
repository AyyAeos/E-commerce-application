package com.example.logis_app.pojo.PageResult;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class CustomerPage   {
    private String customerAddress;
    private String customerAddressCity;
    private String customerAddressPostalCode;
    private String customerAddressCountry;
    private String customerAddressState;
    private String customerDefaultAddress;
}
