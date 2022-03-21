package com.lds.trackdayb.vo;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class MemberForm {
    private String memberSerialNumber;
    private String name;
    private String phoneNumber;
    private String emailAddress;
    private String introduction;
    private MultipartFile profilePhoto;
    private MultipartFile backgroundPhoto;
}
