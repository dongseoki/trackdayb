import React, { useState, useContext, useEffect } from "react";

import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import { useMediaQuery } from "react-responsive";

import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import './ChangePwModal.css';
import axios from "axios";
import { toast } from 'react-toastify';
import JSEncrypt from 'jsencrypt';
import { CHANGE_PW_REQUEST, CHANGE_PW_RESET, GET_PUBLICKEY_REQUEST, LOG_IN_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from 'react-redux';

const ChangePwModal = () => {
    const dispatch = useDispatch();
    const { publicKey, changePwError, changePwDone } = useSelector((state)=> state.user);
    const [open, setOpen] = useState(false);

    const [prevPassword, setPrevPassword] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')

    useEffect(()=>{
        if(!open) return; // 비밀번호 변경 모달이 열렸을 때 요청
        dispatch({
            type: GET_PUBLICKEY_REQUEST,
        })
    },[open])

    

    // 비밀번호 validation check
    const hasPasswordError = (password) =>{
        // 특수문자 포함 체크 함수
        const containsSpecialChar = (value) => {
        const specialChars = "~․!@#$%^&*()_-+={}[]|\\;:'\"<>,.?/";
        for (let i = 0; i < specialChars.length; i++) {
            if (value.indexOf(specialChars[i]) > -1) { 
            return false;
            }
        }
        return true;
        }
        // 8자 이상, 최소 영문1개, 최소 숫자1개, 최소 특문 1개
        if(password.length < 8) return false
        else if(!password.match(".*[a-zA-Z]+.*")) return false
        else if(!password.match(".*[0-9]+.*")) return false
        if(containsSpecialChar(password) === true) {
        return false
        }
        else return true
    }

    // 비밀번호 더블 체크
    const hasNotSameError = passwordEntered =>
        password !== passwordCheck ? false : true;

    // 반응형 화면 BreakPoint
    const isMobileScreen = useMediaQuery({
        query: "(max-width: 440px)",
    });

    const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 2, 2),
        width: "470px",
        fontSize: "14px",
    },
    paperMobile: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 2, 2),
        width: "100%",
        fontSize: "14px"
    },
    }));

    const classes = useStyles();
    

    const handleOpen = () => {
        console.log('hello')
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitHandler = async (e) => {
        console.log('hello')
        e.preventDefault();
        // try{
        if(hasPasswordError(password) && hasNotSameError('passwordCheck')){
            // 데이터 암호화
            let rsaEncrypt = new JSEncrypt();
            rsaEncrypt.setPublicKey(publicKey);
            let rsaEncryptedPrevPassword = rsaEncrypt.encrypt(prevPassword); // 기존 비번
            let rsaEncryptedPassword = rsaEncrypt.encrypt(password); // 새로운 비번
            const formData = {
                beforePwd : rsaEncryptedPrevPassword,
                afterPwd : rsaEncryptedPassword
            }
            dispatch({
                type : CHANGE_PW_REQUEST,
                data : formData
            })
            handleClose();
        } else {
            if(!hasPasswordError(password)) toast.error("Password는 영문, 숫자, 특수문자 포함 8자 이상입니다.");
            if(!hasNotSameError('passwordCheck')) toast.error("Password가 일치 하지 않습니다.");
        }
    }

    // 비밀번호 변경 성공시
    useEffect(() => {
        if(changePwDone) {
            toast.success(`비밀번호를 변경하였습니다.`)
            dispatch({
                type : CHANGE_PW_RESET
            })
        }
    },[changePwDone])

    // 비밀번호 변경 changePwError 에러처리
    useEffect(() => {
        if(changePwError){
        if(changePwError.resultCode === "9996"){
            toast.error(changePwError.message)
        }else if(changePwError.resultCode === "9998"){
            toast.error('비밀번호가 올바르지 않습니다.')
        }else{
            toast.error('Oops! 알수 없는 에러')
        }
        dispatch({
            type: GET_PUBLICKEY_REQUEST,
        })
        }
    }, [changePwError])

    return (
        <div>
            <button className="accountInfo-button" onClick={handleOpen}>비밀번호 변경</button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className= {isMobileScreen ? classes.paperMobile : classes.paper}>
                    <h3 id="transition-modal-title">비밀번호 변경</h3>
                    <form className="chpw-form" onSubmit={submitHandler}>
                        <div className="chpw-input-wrapper">
                            <TextField
                                required
                                className="chpw-input"
                                id="outlined-password-input"
                                label="기존 비밀번호"
                                type="password"
                                autoComplete="current-password"
                                onChange={(e) => setPrevPassword(e.target.value)}
                                inputProps={{maxLength: 20}}
                            />
                            <TextField
                                required
                                className="chpw-input"
                                id="outlined-password-input"
                                label="새 비밀번호"
                                type="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                                error={!hasPasswordError(password)}
                                helperText={!hasPasswordError(password) ? '영문자, 숫자, 특수문자 포함 8자 이상' : null}
                                inputProps={{maxLength: 20}}
                            />
                            <TextField
                                required
                                className="chpw-input"
                                id="outlined-passwordCheck-input"
                                label="새 비밀번호 확인"
                                type="password"
                                autoComplete="current-password-check"
                                onChange={(e) => setPasswordCheck(e.target.value)}
                                error={!hasNotSameError('passwordCheck')}
                                helperText={
                                    !hasNotSameError('passwordCheck') ? "입력한 비밀번호와 일치하지 않습니다." : null
                                }
                                inputProps={{maxLength: 20}}
                            />
                        </div>
                        <div className="button-wrapper">
                            <button type="submit" className="submitBtn">비밀번호변경</button>
                            <button type="button" className="cancleBtn" onClick={handleClose}>취소</button>
                        </div>
                    </form>
                </div>
                </Fade>
            </Modal>

        </div>
    )
}

export default ChangePwModal;