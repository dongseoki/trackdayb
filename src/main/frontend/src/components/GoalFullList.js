import React, { useState, useEffect } from "react";
import "./GoalFullList.css";
import axios from "axios";
import GoalInsertFormModal from "./GoalInsertFormModal";
// 토글버튼
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// 삭제버튼
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function GoalFullList(props) {
  // 검색결과(목표타이틀 리스트)
  const [goalFullList, setGoalFullList] = useState([]);
  const [orderColumn, setOrderColumn] = useState("start_datetime");
  useEffect(() => {
    const fetchGoalFullList = async () => {
      try {
        const result = await axios.get("/goalManage/goalFullList", {
          params: {
            searchGoalIdList:props.searchGoalIdList.toString(),
            searchStartDatetime:makeYYMMDD(props.searchStartDatetime),
            searchEndDatetime:makeYYMMDD(props.searchEndDatetime),
            // searchKind:"deadline",
            orderColumn: orderColumn,
            orderType:"asc"
          }
        });
        setGoalFullList(result.data.goalFullList)
      } catch(err){
        console.error(err)
      }
    }
    fetchGoalFullList();
}, [props.searchStartDatetime, props.searchEndDatetime, props.searchGoalIdList, orderColumn]);

const orderColumnHandler = (e, orderColumn)=>{
  setOrderColumn(orderColumn)
}
    return (
        <div>
            <div className="align-buttons">
            <button>목표 모아보기</button>
            
            <ToggleButtonGroup
              color="primary"
              value={orderColumn}
              exclusive={true}
              onChange={orderColumnHandler}
            >
              <ToggleButton value="start_datetime">시작일 순</ToggleButton>
              <ToggleButton value="end_datetime">종료일 순</ToggleButton>
              <ToggleButton value="progress_rate">진행률 순</ToggleButton>
            </ToggleButtonGroup>

            <ColorToggleButton 
            defalutValue="카드"
            values={["카드", "차트"]}/>
            </div>
            <div className="goal-cards-list">
                {goalFullList && goalFullList.map((goal, index) => (
                    <GoalCard
                        key={index}
                        title={goal.title}
                        startDatetime={goal.startDatetime}
                        endDatetime={goal.endDatetime}
                        content={goal.content}
                        goalId={goal.goalId}
                        kind={goal.kind}
                        progressRate={goal.progressRate}
                        color={goal.color}
                        goalFullList={goalFullList}
                        setGoalFullList={setGoalFullList}
                        ></GoalCard>
                ))}
                <GoalInsertFormModal 
                goalFullList={goalFullList}
                setGoalFullList ={setGoalFullList}/>
            </div>
      </div>
    )
}


function ColorToggleButton(props) {
    const [alignment, setAlignment] = React.useState(props.defalutValue);
  
    const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment);
    };
  
    return (
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        size='small'
      >
        {props.values && props.values.map((value, index) => (
          <ToggleButton key={index}
            value={value}>{value}</ToggleButton>
        ))}
      </ToggleButtonGroup>
    );
  }


function GoalCard({title, startDatetime, endDatetime, content, goalId, kind, progressRate, color, goalFullList, setGoalFullList}){
  const modifyHandler = ()=>{
    console.log('수정')
  }
    return(
        <div className="card" style={{ borderLeft : `6px solid`, borderColor : color}} id={goalId} >
          <ModifyModal goalId={goalId} goalFullList={goalFullList}
                setGoalFullList ={setGoalFullList}/>

          <DeleteModal goalId={goalId} goalFullList={goalFullList}
                setGoalFullList ={setGoalFullList}/>
          
          <h2>{title}</h2>
          <span>시작일: </span><span>{startDatetime}</span><br/>
          <span>종료일: </span><span>{endDatetime}</span><br/>
          <span>내용: </span><span>{content}</span><br/>
          <span>kind: </span><span>{kind}</span><br/>
          <span>진행률: </span><span>{progressRate}</span><br/>
        </div>
    )
}

function ModifyModal ({goalId, goalFullList, setGoalFullList}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modifyHandler = async ()=>{
    try{
      const result= await axios.patch("/goalManage/goal222", {
        params:{
          goalId: goalId
        }
      })
      console.log("수정결과", result);
      setGoalFullList();

    }catch(err){
      console.error(err)
    }
  }
  
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        수정
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"정말 수정하시겠습니까?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={modifyHandler} autoFocus>
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}

// 삭제 버튼 모달
function DeleteModal({goalId, goalFullList, setGoalFullList}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = async ()=>{
    try{
      const result= await axios.delete("/goalManage/goal", {
        params:{
          goalId: goalId
        }
      })
      console.log("삭제결과", result)
      setGoalFullList(goalFullList.filter(goal => goal.goalId !== goalId));
    }catch(err){
      console.error(err)
    }
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        삭제
      </Button>
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
    </div>
  );
}


// YYYY-MM-DD 형태로 반환
function makeYYMMDD(value){
  return value.toISOString().substring(0,10);
}



export default GoalFullList;