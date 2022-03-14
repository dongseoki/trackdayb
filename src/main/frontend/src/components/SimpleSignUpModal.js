import React, { useState, useContext, useEffect } from "react";

import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import { useMediaQuery } from "react-responsive";

import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import './ChangePwModal.css';
import {useHistory} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

const SimpleSignUpModal = ({open, setOpen}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState("");


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



    const submitHandler = (e) => {
        console.log('hello', name)
        e.preventDefault();
        

    }
    


    return (
        <div>
            {/* <button className="accountInfo-button" onClick={handleOpen}>간편회원가입</button> */}
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