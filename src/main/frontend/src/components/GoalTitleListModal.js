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
//Tree 
import Tree from '@naisutech/react-tree'

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
      const fetchGoalTitleListModal = async () => {
        try{
          const result = await axios.get(
            "/goalManage/goalTitleList");
            console.log("enqjsOEk---------------", result)
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
              <GoalTitleChoiceList goalTitleList= {goalTitleListModal}/>
              <button type="button" onClick={handleClose}>CLOSE</button>
            </div>
          </Fade>
        </Modal>
      </>
    )
  }


function GoalTitleChoiceList({goalTitleList}){
  console.log('goalTitleList', goalTitleList)
  const nodes = []
  goalTitleList.map((goal, index)=>{
      const goalObj = new Object();
      goalObj.label = goal.title
      goalObj.id = parseInt(goal.goalId)
      if(goal.parentId){
          goalObj.parentId = parseInt(goal.parentId)
      }else{
          goalObj.parentId = null
      }
      goalObj.color = goal.color
      nodes.push(goalObj)
  })
  console.log('nodes', nodes)

  const myThemes = {
      modifiedDarkLarge: {
        text: 'black', // text color
        bg: '#EFEFEF', // background color of whole tree
        indicator: null, // open folder indicator color
        separator: "white", // row seperator color
        icon: 'gold', // fill & stroke color of default icons - has no effect when using custom icons
        selectedBg: '#3f464e', // background of selected element
        selectedText: '#fafafa', // text color of selected element
        hoverBg: '#505a63', // background of hovered element
        hoverText: '#fafafa', // text color of hovered element
        accentBg: '#2d3439', // background of empty folder element
        accentText: '#999', // text color of empty folder element
        textSize: '13px' // preferred text size
      }
    }


  return (
      <div>
          <p>목표선택</p>
          <div className="goal-list">
  
    <div style={{ display: 'flex', flexWrap: 'nowrap', flexGrow: 1 }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Tree 
              nodes={nodes} 
              theme="modifiedDarkLarge"
              customTheme={myThemes}
              // NodeRenderer={({
              //     data: Node
              // }) => {
              //     return (
              //         <li key={Node.id}>
              //             <Checkbox {...label} defaultChecked />
              //             <p className="class-2">{Node.label}</p>
              //             <div className="color-tag" style={{ backgroundColor : Node.color}}></div>
              //         </li>
              //         )
              //     }
              // }
          >
</Tree>
      </div>
    </div>
    </div>
    </div>
  )
}

export default GoalTitleListModal