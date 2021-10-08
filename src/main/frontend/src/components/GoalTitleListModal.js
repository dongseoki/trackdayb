import React, { useState, useEffect } from "react";
import axios from "axios";
//css
import { makeStyles } from '@material-ui/core/styles';
//modal
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


//radio 버튼
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  function GoalTitleListModal({parentGoalTitle, setParentGoalTitle, parentGoalId, setParentGoalId, parentGoalKind, setParentGoalKind}){
    
    const useStyles = makeStyles((theme) => ({
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    }));
    const classes = useStyles();
  
    const [open, setOpen] = useState(false);
    //목표 타이틀 리스트-부모 목표 고르기
    const [goalTitleListModal, setGoalTitleListModal] = useState([]);
    const defaultSearchTime =  " 09:00:00";
  
    useEffect(()=>{
      let body = {
      }
      const fetchGoalTitleListModal = async () => {
        try{
          const result = await axios.post(
            "/goalManage/getGoalTitleList", body);
          setGoalTitleListModal(result.data.goalTitleList);
        } catch(err) {
          console.error(err);
        }
      };
      fetchGoalTitleListModal();
    }, [])
   
   
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
    return(
      <>
        <button className="prevGoalTitleList" onClick={handleOpen}>목표분류</button>
        <Modal
          aria-labelledby="transition-modal-prevGoalTitleList"
          aria-describedby="transition-modal-prevGoalTitleList"
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
            <div className={classes.paper}>
              <h2 id="transition-modal-title">목표 리스트</h2>
              <p id="transition-modal-description">활동과 관련된 목표를 선택하세요</p>
              <GoalTitleChoiceList 
                goalTitleList = {goalTitleListModal} 
                parentGoalTitle = {parentGoalTitle}
                setParentGoalTitle = {setParentGoalTitle}
                parentGoalId={parentGoalId}
                setParentGoalId = {setParentGoalId}
                parentGoalKind={parentGoalKind}
                setParentGoalKind={setParentGoalKind}
              />
              <button type="button" onClick={handleClose}>CLOSE</button>
            </div>
          </Fade>
        </Modal>
      </>
    )
  }


function GoalTitleChoiceList({goalTitleList, parentGoalTitle, setParentGoalTitle, parentGoalId, setParentGoalId, parentGoalKind, setParentGoalKind}){
    // 목표-부모&자식 묶기
    const argGoalTitleObject = ArrangeGoalTitleList(goalTitleList)

    return (
        <div>
            <p>목표선택</p>
            <div className="goal-list">
                <ul>
                <FormControl component="fieldset">
                  <FormLabel component="legend">부모 목표선택</FormLabel>
                  <RadioGroup
                    aria-label="parentGoal"
                    defaultValue="female"
                    name="radio-buttons-group"
                    onChange= {(evt) => {
                      setParentGoalTitle(evt.target.name)
                      setParentGoalId(evt.target.value)
                      ///기한성목표면 진도율도 입력할 수 있도록
                      console.log('클릭 goalId', evt.target.value)
                      goalTitleList.map((goal, index)=>{
                        if(goal.goalId === evt.target.value){
                          console.log('같은값 if문', goal.goalId, goal.kind)
                          setParentGoalKind(goal.kind)
                        }else{
                          setParentGoalKind("")
                        }
                      })
                    }}
                  >
                    <FormControlLabel value="" control={<Radio />} label="" name="선택안함"/>
                    {argGoalTitleObject && Object.keys(argGoalTitleObject).map((key, index) => {
                        
                        if(argGoalTitleObject[key].children.length === 0){
                            return (
                                <GoalTitleParentCards 
                                    key={argGoalTitleObject[key].goalId}
                                    goalId = {argGoalTitleObject[key].goalId}
                                    title={argGoalTitleObject[key].title}
                                    parentId={argGoalTitleObject[key].parentId}
                                    color ={argGoalTitleObject[key].color}
                                    kind={argGoalTitleObject[key].kind}
                                ></GoalTitleParentCards>
                                )
                        }else{
                            return (
                                <div>
                                    <GoalTitleParentCards 
                                        key={argGoalTitleObject[key].goalId}
                                        goalId = {argGoalTitleObject[key].goalId}
                                        title={argGoalTitleObject[key].title}
                                        parentId={argGoalTitleObject[key].parentId}
                                        color ={argGoalTitleObject[key].color}
                                    ></GoalTitleParentCards>

                                    {argGoalTitleObject[key].children.map((child, index) => (
                                        <GoalTitleChildCards 
                                        key={child.goalId}
                                        goalId = {child.goalId}
                                        title={child.title}
                                        parentId={child.parentId}
                                        color ={child.color}
                                    ></GoalTitleChildCards>
                                    )
                                    )}
                                </div>
                            )
                        }
                    })
                }
                </RadioGroup>
                </FormControl>

                </ul>
            </div>
        </div>
    )
}

function GoalTitleParentCards({title, goalId, color, kind}) {
    return (
        <li key={goalId}>
          <FormControlLabel value={goalId} control={<Radio />} label="" name={title} kind={kind}/>
            <p className="class-2">{title}</p>
            <div className="color-tag" style={{ backgroundColor : color}}></div>
        </li>
    )
}

function GoalTitleChildCards({title, goalId}) {
    return (
        <li key={goalId}>
          <FormControlLabel value={goalId} control={<Radio />} label="" name={title}/>
            <p className="class-2">{title}</p>
            <div className="none-tag"></div>
        </li>
    )
}



// 목표 부모-자식 묶기
function ArrangeGoalTitleList(goalTitleList){
    const arrangedObj = new Object();
    goalTitleList.map((goal, index) => {
        if(!goal.parentId) {
            arrangedObj[goal.goalId] = goal
            arrangedObj[goal.goalId]["children"] = []
        }else if(Object.keys(arrangedObj).includes(goal.parentId)){
            arrangedObj[goal.parentId]["children"].push(goal)
        }
    })
    return arrangedObj
}

  export default GoalTitleListModal