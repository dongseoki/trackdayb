import React, { useState, useEffect } from "react";
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import { useMediaQuery } from "react-responsive";
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
// import './ChangePwModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { SNS_SIGN_UP_CANCLE, SNS_SIGN_UP_REQUEST } from "../reducers/user";
import { toast } from "react-toastify";

const SimpleSignUpModal = ({open, setOpen, snsName}) => {
    const dispatch = useDispatch();

    const [memberId, setMemberId] = useState("");
    const [name, setName] = useState("");

    const { snsSignUpError } = useSelector((state)=> state.user); 

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

    const handleClose = () => {
        setOpen(false);
        localStorage.removeItem('tokenId');
        dispatch({
            type: SNS_SIGN_UP_CANCLE
        })
    };

    const submitHandler = (e) => {
        console.log('hello', memberId, name)
        e.preventDefault();
        const tokenId = localStorage.getItem('tokenId');
        const formData = {
            memberId : memberId,
            name : name,
            tokenId : tokenId,
        }
        dispatch({
            type : SNS_SIGN_UP_REQUEST,
            data : {
                snsName : snsName,
                payload : formData,
            }
        })
    }

    // snsSignUpError 처리
    useEffect(() => {
        if(snsSignUpError){
        if(snsSignUpError.resultCode === "9997"){
            toast.error('아이디가 중복됩니다.');
            localStorage.removeItem('tokenId');
        }else if(snsSignUpError.resultCode === "9999"){
            toast.error('서버오류')
            localStorage.removeItem('tokenId');
        }else if(snsSignUpError.resultCode === "9994"){
            toast.error('SNS 인증 서버 처리 실패')
            localStorage.removeItem('tokenId');
        }else if(snsSignUpError.resultCode === "9992"){
            toast.error('이미 연동된 이메일입니다.')
            localStorage.removeItem('tokenId');
        }
        }
    },[snsSignUpError])
    


    return (
        <div>
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
                    <h3 id="transition-modal-title">간편회원가입</h3>
                    <form className="simple-signup-form" onSubmit={submitHandler}>
                        <div className="simple-signup-input-wrapper">
                            <TextField
                                required
                                className="simple-signup-memberId"
                                id="outlined-memberId-input"
                                label="memberId"
                                type="text"
                                onChange={(e) => setMemberId(e.target.value)}
                                inputProps={{maxLength: 20}}
                            />
                            <TextField
                                required
                                className="simple-signup-name"
                                id="outlined-name-input"
                                label="name"
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                inputProps={{maxLength: 20}}
                            />
                        </div>
                        <div className="button-wrapper">
                            <button type="submit" className="submitBtn">간편회원가입</button>
                            <button type="button" className="cancleBtn" onClick={handleClose}>취소</button>
                        </div>
                    </form>
                </div>
                </Fade>
            </Modal>

        </div>
    )
}

export default SimpleSignUpModal;