import React, { useState, useContext, useEffect } from "react";
//css
import { makeStyles } from '@material-ui/core/styles';
import "./GoalTitleListModal.css"
//modal
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { RiArrowDropDownLine } from "react-icons/ri";
//radio 버튼
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
//Tree 
import Tree from '@naisutech/react-tree'

import { GoalTotalTitleListContext } from "../context/GoalTotalTitleListContext";
import randomColor from "randomcolor";

function GoalTitleListModal({parentId, setParentId, setParentGoalTitle, setColor}){
  const [ goalTotalTitleList ] = useContext(GoalTotalTitleListContext);
  const [ tempParentId, setTempParentId ] = useState("")
  const [ tempParentTitle, setTempParentTitle ] = useState("없음")

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
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes = useStyles();
  const [openInside, setOpenInside] = useState(false);
  const handleOpenInside = (e) => {
    e.preventDefault();
    setOpenInside(true);
    setTempParentId(parentId)
  };
  const handleCloseInside = () => {
    setOpenInside(false);
  };
  const handleSubmitInside = () =>{
    setParentId(tempParentId);
    setParentGoalTitle(tempParentTitle);
    setColor(randomColor())
    setOpenInside(false);
  }
  return(
    <>
      <button className="prevGoalTitleList" onClick={handleOpenInside}>목표분류</button>
      <Modal
        aria-labelledby="transition-modal-prevGoalTitleList"
        aria-describedby="transition-modal-prevGoalTitleList"
        className={classes.modal}
        open={openInside}
        onClose={handleCloseInside}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openInside}>
          <div className={classes.paper}>
            <div className="modal-goalList-title" id="transition-modal-title">목표 리스트</div>
            <div className="modal-goalList-desc" id="transition-modal-description">상위 목표를 선택하세요</div>
            <GoalTitleChoiceList 
              goalTitleList= {goalTotalTitleList}
              tempParentId={tempParentId}
              setTempParentId={setTempParentId}
              setTempParentTitle={setTempParentTitle}
            />
            <div className="button-wrapper">
              <button type="button" className="submitBtn" onClick={handleSubmitInside}>확인</button>
              <button type="button" className="cancleBtn" onClick={handleCloseInside}>취소</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

function GoalTitleChoiceList({goalTitleList, tempParentId,setTempParentId,setTempParentTitle}){
  // TreeNode를 위한 goalIdList
  const [goalIdList, setGoalIdList] = useState([])
  useEffect(()=>{
    let tempGoalIdList = [];
    goalTitleList.forEach((goal) =>{
        tempGoalIdList.push(parseInt(goal.goalId))
    })
    setGoalIdList(tempGoalIdList)
  }, [goalTitleList]);

  const nodes = []
  goalTitleList.map((goal, index) => {
    const goalObj = new Object();
    goalObj.label = goal.title
    goalObj.id = parseInt(goal.goalId)
    goalObj.dropdown=false
    if(goal.parentId){
      if(goalIdList.includes(parseInt(goal.parentId))){ //부모아이디가 검색결과 리스트에 있음
        goalObj.parentId = parseInt(goal.parentId)
      }else{
        goalObj.parentId = null
      }
    }else{
        goalObj.parentId = null
    }
    goalTitleList.forEach((goal2)=>{
      if(goal.goalId === goal2.parentId){
        goalObj.dropdown = true
      }
    })
    goalObj.color = goal.color
    goalObj.index = index
    nodes.push(goalObj)
  })

  const myThemes = {
    modifiedDarkLarge: {
      text: 'black', // text color
      bg: 'white', // background color of whole tree
    }
  }
    
  const selectHandler = (e)=>{
    setTempParentId(e.target.value)
    if(!e.target.value){
      setTempParentTitle("없음")
    }else{
      let targetIndex = goalTitleList.findIndex((element)=>{
        if(element.goalId === e.target.value){
          return true
        }
      })
      setTempParentTitle(goalTitleList[targetIndex]["title"])
    }
  }

  return (
    <div>
      <div className="modal-goal-list">
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="목표선택"
            defaultValue=""
            name="radio-buttons-group"
            value={tempParentId}
            onChange={selectHandler}
          >
            <div className="none-choice">
              <FormControlLabel value="" control={<Radio />} label="없음" />
              <div>없음</div>
            </div>
            <div className="goal-choice">
              <Tree 
                nodes={nodes} 
                theme="modifiedDarkLarge"
                customTheme={myThemes}
                noDataString="목표를 등록해주세요."
                NodeRenderer={({ data, isOpen, level, selected }) => {
                  const classes = ['custom-node', isOpen ? 'open' : undefined, selected ? 'selected' : undefined].join(' ')
                  return (
                    <div className="goal-title-wrapper">
                      <FormControlLabel value={data.id} control={<Radio />} label={data.label} />
                      <div className={classes} style={{ ['--icon-pos']: `calc(2px + ${level * 25}px)`,backgroundColor : hexToRgba(data.color)}}>
                        <div className="goal-title" style={{paddingLeft: `calc(10px + ${level * 10}px)`}}>{data.label}</div>
                        <div className="color-tag" style={{ backgroundColor : data.color}}>
                          {data.dropdown ? <RiArrowDropDownLine className="arrow-icon"/> : null}
                        </div>
                      </div>
                    </div>
                  )
                }}
              >
              </Tree>
            </div>
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  )
}

// hex to rgba
function hexToRgba ( hexType ){ 
  if(!hexType){
    return "rgba(130,143,146, 0.08)";
  }else{
  /* 맨 앞의 "#" 기호를 삭제하기. */ 
  var hex = hexType.trim().replace( "#", "" ); 
  
  /* rgb로 각각 분리해서 배열에 담기. */ 
  var rgb = ( 3 === hex.length ) ? 
  hex.match( /[a-f\d]/gi ) : hex.match( /[a-f\d]{2}/gi );     
  
  rgb.forEach(function (str, x, arr){     
      /* rgb 각각의 헥사값이 한자리일 경우, 두자리로 변경하기. */ 
      if ( str.length === 1 ) str = str + str; 
      
      /* 10진수로 변환하기. */ 
      arr[ x ] = parseInt( str, 16 ); 
  }); 
  
  return "rgba(" + rgb.join(", ") + ", 0.1)"; 
  }
} 

export default GoalTitleListModal