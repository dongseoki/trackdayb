import React, { useState, useEffect } from "react";

import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { useMediaQuery } from "react-responsive";

import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import './subModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MY_INFO_REQUEST, SNS_UNLINK_REQUEST, WITHDRAWAL_REQUEST } from "../reducers/user";
import { toast } from "react-toastify";
import {useHistory} from "react-router-dom";

const UnlinkAccountModal = ({imageSrc, snsName}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [open, setOpen] = useState(false);

    const { snsUnlinkError, snsUnlinkDone } = useSelector((state)=> state.user)

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
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const unlinkHandler = () =>{
        dispatch({
            type : SNS_UNLINK_REQUEST,
            data : {
                snsName : snsName
            }
        });
    }

    // 연결해제 성공시
    useEffect(() => {
        if(snsUnlinkDone){
            toast.success('계정 연동을 해지하였습니다.')
        }
        handleClose();
    }, [snsUnlinkDone]);

    // 연결해제 에러 발생시
    useEffect(() => {
        if(snsUnlinkError){
            toast.error(snsUnlinkError.message)
        }
    }, [snsUnlinkError]);


    return (
        <div>
            <img className="accountInfo-liked" src={`/img/icon/${imageSrc}`}  onClick={handleOpen} />
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
                    <h3 id="transition-modal-title">계정 연결 해제</h3>
                    <div className="sub-modal-content">
                        <h4>정말 연결을 해제하시겠습니까?</h4>                        
                        <div className="button-wrapper">
                            <button type="button" className="submitBtn" onClick={unlinkHandler}>연결해제</button>
                            <button type="button" className="cancleBtn" onClick={handleClose}>취소</button>
                        </div>
                    </div>
                </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default UnlinkAccountModal;