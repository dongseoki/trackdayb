import React, { useState } from "react";
import './Profile.css';
import Avatar from '@mui/material/Avatar';
import { BiEdit } from "react-icons/bi";
import TextField from '@mui/material/TextField';
import CardMedia from '@mui/material/CardMedia';


const Profile = ({myInfo}) => {
    // 수정 활성화 flag
    const [ editFlag, setEditFlag ] = useState(false);


    const [ name, setName ] = useState(myInfo.name);
    const [ introduction, setIntroduction ] = useState(myInfo.introduction);
    // 아바타 이미지 파일
    const [ photo, setPhoto ] = useState(null);
    // 아바타 이미지 미리보기(소스)
    const [ photoSrc, setPhotoSrc] = useState(null);
    // 배경 이미지 파일
    const [ background, setBackground ] = useState(null);
    // 배경 이미지 미리보기(소스)
    const [ backgroundSrc, setBackgroundSrc] = useState(null);



    /// 하나로 전체 수정
    const editFlagHandler = () => {
        setEditFlag(true)
    };
    const saveFlagHandler = () => {
        setEditFlag(false);
    }
    const cancleFlagHandler = () => {
        setEditFlag(false);
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

    return (
        <>
        <div className="profile-main-wrapper">
            {editFlag? 
            <div className="button-wrapper">
                <button type="submit" className="submitBtn" onClick={saveFlagHandler}>저장</button>
                <button type="button" className="cancleBtn" onClick={cancleFlagHandler}>취소</button>
            </div>
            :
            <button type="submit" className="submitBtn" onClick={editFlagHandler}>수정</button>
            }


            <div className="profile-background-wrapper">
                <CardMedia
                    className="profile-background"
                    component="img"
                    height="300"
                    image={backgroundSrc}
                    alt="Paella dish"
                />
                
                
                <div className="file-wrapper">
                    {editFlag?
                    <div className="file-dropper">
                        <label for="background">파일선택</label>
                        <input id="background" type="file" accept="image/*" onChange={backgroundSelectHandler}/>
                    </div> 
                   : null}
                </div>

                
            </div>
        
            <div className="profile-contents-wrapper">
                
                <div className="profile-photo">
                    <Avatar
                        className="profile-avatar"
                        alt="Profile Image"
                        src={photoSrc}
                        sx={{ width: 100, height: 100, mx: 2}}
                    />

                    <div className="file-wrapper">
                        {editFlag?
                        <div className="file-dropper">
                            <label for="photo">파일선택</label>
                            <input id="photo" type="file" accept="image/*" onChange={photoSelectHandler}/>
                        </div> 
                        : null}
                    </div>

                </div>

                <div className="profile-texts">

                    <div className="profile-name">
                        {editFlag? 
                        <TextField 
                            id="name" 
                            defaultValue={name}
                            label="이름" 
                            size="small" 
                            variant="outlined"
                            style={{width:"100%",marginBottom:"14px", marginRight:"4px"}}
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
                            style={{width:"100%", marginBottom:"14px", marginRight:"4px"}}
                            onChange={function(e){
                                setIntroduction(e.target.value)
                            }}
                        />
                        :
                        <div className="profile-text-content">{ myInfo.introduction }</div>
                        }
                    </div>

                </div>

            </div>
        </div>
        </>
    )
}

export default Profile;