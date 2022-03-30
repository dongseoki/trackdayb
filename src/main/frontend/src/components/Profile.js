import React, { useEffect, useState } from "react";
import './Profile.css';
import Avatar from '@mui/material/Avatar';
import { BiEdit } from "react-icons/bi";
import { BsPlusCircleFill } from "react-icons/bs";

import TextField from '@mui/material/TextField';
import CardMedia from '@mui/material/CardMedia';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_MY_INFO_REQUEST } from '../reducers/user';
import { toast } from "react-toastify";

const Profile = () => {
    const dispatch = useDispatch();
    const { myInfo, changeMyInfoError, changeMyInfoDone } = useSelector((state)=> state.user); 

    // 수정 활성화 flag
    const [ editFlag, setEditFlag ] = useState(false);
    
    // 아바타 이미지 파일(보낼것)
    const [ photo, setPhoto ] = useState(null);
    // 아바타 이미지 미리보기(소스:보여줄것)
    const [ photoSrc, setPhotoSrc] = useState(myInfo.profilePhotoUrlPath);

    // 배경 이미지 파일(보낼것)
    const [ background, setBackground ] = useState(null);
    // 배경 이미지 미리보기(소스:보여줄것)
    const [ backgroundSrc, setBackgroundSrc] = useState(myInfo.backgroundPhotoUrlPath);

    const [ name, setName ] = useState(myInfo.name);
    const [ introduction, setIntroduction ] = useState(myInfo.introduction);
    const [ emailAddress, setEmailAddress ] = useState(myInfo.emailAddress);
    const [ phoneNumber, setPhoneNumber ] = useState(myInfo.phoneNumber);


    /// 하나로 전체 수정
    const editFlagHandler = () => {
        setEditFlag(true)
    };
    // 제출 onClick={saveFlagHandler}
    const submitHandler = async (e) => { 
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name)
        formData.append("introduction", introduction)
        formData.append("emailAddress", emailAddress)
        formData.append("phoneNumber", phoneNumber)
        if(photo) {
            formData.append("profilePhoto", photo)
        }
        if(background) {
            formData.append("backgroundPhoto", background)
        }
        console.log('formData', formData)
        dispatch({
            type : CHANGE_MY_INFO_REQUEST,
            data : formData,
        })

        // setEditFlag(false);
    }
    const cancleFlagHandler = () => {
        setEditFlag(false);
        setPhotoSrc(myInfo.profilePhotoUrlPath);
        setBackgroundSrc(myInfo.backgroundPhotoUrlPath);
    }

    // 프로필 사진 변경
    const photoSelectHandler = (event) => {
        const imageFile = event.target.files[0]
        setPhoto(imageFile);
        // setFileName(imageFile.name);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(imageFile);
        fileReader.onload = (evt) => setPhotoSrc(evt.target.result)
    };

    // 배경 이미지 변경
    const backgroundSelectHandler = (event) => {
        const imageFile = event.target.files[0]
        setBackground(imageFile);
        // setFileName(imageFile.name);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(imageFile);
        fileReader.onload = (evt) => setBackgroundSrc(evt.target.result)
    };

    // 에러처리
    useEffect(() => {
        if(changeMyInfoError) {
            if(changeMyInfoError === '9999'){
                toast.error("이미지 사이즈는 1MB 이하입니다.")
            }else if(changeMyInfoError === '0086'){
                toast.error('unsupport file part name')
            }else if(changeMyInfoError === '9985'){
                toast.error('이미지 파일 확장자만 업로드할 수 있습니다.')
            }
        }
    }, [changeMyInfoError])

    return (
        <>
        <div className="profile-main-wrapper">
            <form encType="multipart/form-data" onSubmit={submitHandler}>
                <div className="button-wrapper">
                {editFlag? 
                    <>
                    <button type="submit" className="submitBtn">저장</button>
                    <button type="button" className="cancleBtn" onClick={cancleFlagHandler}>취소</button>
                    </>
                :
                    <button type="button" className="modifyBtn" onClick={editFlagHandler}>수정</button>
                }
                </div>

                <div className="profile-wrapper">
                    <div className="profile-background-wrapper">
                        <CardMedia
                            className="profile-background"
                            component="img"
                            height="300"
                            image={backgroundSrc}
                        />
                        
                        <div className="file-wrapper">
                            {editFlag?
                            <div className="file-dropper">
                                <label className="edit-label" for="background"><BsPlusCircleFill className="edit-icon" /></label>
                                <input id="background" type="file" accept="image/*" onChange={backgroundSelectHandler}/>
                            </div> 
                        : null}
                        </div>

                    </div>    
                
            
                    <div className="profile-contents-wrapper">

                        <div className="profile-texts">

                            <div className="profile-name">
                                {editFlag? 
                                <TextField 
                                    id="name" 
                                    defaultValue={name}
                                    label="이름" 
                                    size="small" 
                                    variant="outlined"
                                    style={{backgroundColor:"white", borderRadius: '5px', width:"100%",marginBottom:"5px", marginRight:"4px"}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={function(e){
                                        setName(e.target.value)
                                    }}
                                />
                                :
                                <div className="profile-text-content">{ myInfo.name }</div>
                                }
                            </div>
                            
                            <div className="profile-introduction">
                                {editFlag? 
                                <TextField
                                    id="introduction"
                                    defaultValue={introduction}
                                    label="소개"
                                    multiline
                                    rows={2}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    style={{backgroundColor:"white", borderRadius: '5px', width:"100%", marginBottom:"5px", marginRight:"4px" }}
                                    onChange={function(e){
                                        setIntroduction(e.target.value)
                                    }}
                                />
                                :
                                <pre className="profile-text-content">{ myInfo.introduction }</pre>
                                }
                            </div>

                            <div className="profile-emailAddress">
                                {editFlag? 
                                <TextField 
                                    id="emailAddress" 
                                    defaultValue={emailAddress}
                                    label="이메일" 
                                    size="small" 
                                    variant="outlined"
                                    style={{backgroundColor:"white", borderRadius: '5px', width:"100%",marginBottom:"5px", marginRight:"4px"}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={function(e){
                                        setEmailAddress(e.target.value)
                                    }}
                                />
                                :
                                <div className="profile-text-content">{ myInfo.emailAddress }</div>
                                }
                            </div>

                            <div className="profile-phoneNumber">
                                {editFlag? 
                                <TextField 
                                    id="phoneNumber" 
                                    defaultValue={phoneNumber}
                                    label="연락처" 
                                    size="small" 
                                    variant="outlined"
                                    style={{backgroundColor:"white", borderRadius: '5px', width:"100%",marginBottom:"5px", marginRight:"4px"}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={function(e){
                                        setPhoneNumber(e.target.value)
                                    }}
                                />
                                :
                                <div className="profile-text-content">{ myInfo.phoneNumber }</div>
                                }
                            </div>
                            
                        </div>

                        <div className="profile-photo">
                            <Avatar
                                className="profile-avatar"
                                alt="Profile Image"
                                src={photoSrc}
                                sx={{ width: 100, height: 100, m: 1}}
                            />

                            <div className="file-wrapper">
                                {editFlag?
                                <div className="file-dropper">
                                    <label className="edit-label" for="photo"><BsPlusCircleFill className="edit-icon" /></label>
                                    <input id="photo" type="file" accept="image/*" onChange={photoSelectHandler}/>
                                </div> 
                                : null}
                            </div>

                        </div>

                    </div>

                </div> 
            </form>           
        </div>
        </>
    )
}

export default Profile;