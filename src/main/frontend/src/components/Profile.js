import React, { useEffect, useState } from "react";
import './Profile.css';
import Avatar from '@mui/material/Avatar';
import { BsPlusCircleFill } from "react-icons/bs";
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { CHANGE_MY_INFO_REQUEST } from "../reducers/user";
import { Paper } from "@material-ui/core";

const Profile = () => {
    const dispatch = useDispatch();

    const { myInfo, changeMyInfoError, changeMyInfoDone } = useSelector((state)=> state.user);

    // 수정 활성화 flag
    const [ editFlag, setEditFlag ] = useState(false);
    
    // 아바타 이미지 파일(보낼것)
    const [ photo, setPhoto ] = useState();
    // 아바타 이미지 미리보기(소스:보여줄것)
    const [ photoSrc, setPhotoSrc] = useState();

    // 배경 이미지 파일(보낼것)
    const [ background, setBackground ] = useState();
    // 배경 이미지 미리보기(소스:보여줄것)
    const [ backgroundSrc, setBackgroundSrc] = useState();

    const [ name, setName ] = useState();
    const [ introduction, setIntroduction ] = useState();
    const [ emailAddress, setEmailAddress ] = useState();
    const [ phoneNumber, setPhoneNumber ] = useState();

    // 초기값 세팅
    useEffect(() =>{
        setName(myInfo? myInfo.name : null);
        setIntroduction(myInfo? myInfo.introduction : null);
        setEmailAddress(myInfo? myInfo.emailAddress : null);
        setPhoneNumber(myInfo? myInfo.phoneNumber : null);
        setPhotoSrc(myInfo? myInfo.profilePhotoUrlPath : null);     
        setBackgroundSrc(myInfo? myInfo.backgroundPhotoUrlPath : null);
    },[myInfo])

    /// 수정 버튼
    const editFlagHandler = (e) => {
        e.preventDefault();
        setEditFlag(true)
    };

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
        dispatch({
            type : CHANGE_MY_INFO_REQUEST,
            data : formData,
        })
    }

    // 취소 버튼
    const cancleFlagHandler = () => {
        setEditFlag(false);
        setName(myInfo.name);
        setIntroduction(myInfo.introduction);
        setEmailAddress(myInfo.emailAddress);
        setPhoneNumber(myInfo.phoneNumber);
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
            if(changeMyInfoError.resultCode === '9999'){
                toast.error("이미지 사이즈는 1MB 이하입니다.")
            }else if(changeMyInfoError.resultCode === '9986'){
                toast.error('unsupport file part name')
            }else if(changeMyInfoError.resultCode === '9985'){
                toast.error('이미지 파일 확장자만 업로드할 수 있습니다.')
            }
        }
    }, [changeMyInfoError])

    // 성공처리
    useEffect(() =>{
        if(changeMyInfoDone){
            setEditFlag(false);
        }
    },[changeMyInfoDone])

    const styles = {
        paperContainer: {
            backgroundImage: `url(${backgroundSrc})`,
            position: 'relative',
        },
    };

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
                    <Paper style={styles.paperContainer}>
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
                                    <div className="profile-text-content">{ name }</div>
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
                                    <pre className="profile-text-content">{introduction}</pre>
                                    }
                                </div>
                                <div className="profile-emailAddress">
                                    {editFlag? 
                                    <TextField 
                                        id="emailAddress" 
                                        defaultValue={myInfo? myInfo.emailAddress: null}
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
                                    <div className="profile-text-content">{emailAddress}</div>
                                    }
                                </div>

                                <div className="profile-phoneNumber">
                                    {editFlag? 
                                    <TextField 
                                        id="phoneNumber" 
                                        defaultValue={myInfo? myInfo.phoneNumber: null}
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
                                    <div className="profile-text-content">{phoneNumber}</div>
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
                                        <label className="edit-label" htmlFor="photo"><BsPlusCircleFill className="edit-icon" /></label>
                                        <input id="photo" type="file" accept="image/*" onChange={photoSelectHandler}/>
                                    </div> 
                                    : null}
                                </div>
                            </div>
                        </div>

                        <div className="file-wrapper">
                            {editFlag?
                            <div className="file-dropper">
                                <label className="edit-label" htmlFor="background"><BsPlusCircleFill className="edit-icon" /></label>
                                <input id="background" type="file" accept="image/*" onChange={backgroundSelectHandler}/>
                                <div className="size-guild">권장사이즈 (1150*350), 바둑판식 배열</div>
                            </div>                          
                            : null}
                        </div>
                    </Paper>
                </form>           
            </div>
        </>
    )
}

export default Profile;