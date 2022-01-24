import React, { useState } from "react";
import './Profile.css';
import Avatar from '@mui/material/Avatar';

const Profile = ({curUser}) => {
    // 닉네임
    const [ name , setName ] = useState(curUser.memberInfo.name);
    const [ message, setMessage ] = useState('안녕하세요, 홍길동 입니다.');
    
    // 아바타 이미지 파일
    const [ file, setFile ] = useState(null);
    // 아바타 이미지 미리보기(소스)
    const [imgSrc, setImgSrc] = useState(null);
    // 수정 활성화 flag
    const [ modifyMode, setModifyMode ] = useState(false);


    const imageSelectHandler = (event) => {
        const imageFile = event.target.files[0]
        setFile(imageFile);
        // setFileName(imageFile.name);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(imageFile);
        fileReader.onload = (evt) => setImgSrc(evt.target.result)
    };
    const modifyBtnHandler = () => {
        console.log('수정');
        setModifyMode(true);
    }
    const submitHandler = ()=> {
        setModifyMode(false);
        console.log('저장');
    }

    return (
        <div className="profile-content">
            {modifyMode? 
                <button onClick={submitHandler}>저장</button> : 
                <button onClick={modifyBtnHandler}>수정</button>}
            
            <div>
                <Avatar
                    alt="Remy Sharp"
                    src={imgSrc}
                    sx={{ width: 56, height: 56 }}
                />
                {modifyMode? 
                <div className="file-dropper">
                    <input id="image" type="file" accept="image/*" onChange={imageSelectHandler}/>
                </div> : 
                <></>}
                
            </div>
            <div>
                {modifyMode?
                    <>
                        <span>닉네임</span><input id='name' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                        <span>소개</span><input id='message' type='text' value={message} onChange={(e) => setMessage(e.target.value)}/>
                    </> :
                    <>
                    <div>
                        <span>닉네임</span>
                        <span>{name}</span>
                    </div>
                    
                    <div>
                        <span>소개</span>
                        <span>{message}</span>
                    </div>
                    </>
                }
                
            </div>
        </div>
    )
}

export default Profile;