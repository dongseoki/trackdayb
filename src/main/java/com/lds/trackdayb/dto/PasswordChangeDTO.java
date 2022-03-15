package com.lds.trackdayb.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordChangeDTO {
    private String beforePwd;
    private String afterPwd;
}
