import React, { useState } from "react";
import { DELETE_GOAL_REQUEST } from '../reducers/goal';
import { useDispatch } from 'react-redux';
// 삭제버튼
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { RiDeleteBinLine } from "react-icons/ri";

// 삭제 버튼 모달
function GoalDeleteModal({goalId}) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    const deleteHandler = ()=>{
      dispatch({
          type : DELETE_GOAL_REQUEST,
          data : { goalId : goalId }
      });
      handleClose();
    }
    return (
      <>
        <button className="deleteBtn" variant="outlined" onClick={handleClickOpen}>
          <RiDeleteBinLine style={{verticalAlign:"middle"}} title="삭제"/>
        </button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"정말 삭제하시겠습니까?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={deleteHandler} autoFocus>
              삭제
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

export default GoalDeleteModal;