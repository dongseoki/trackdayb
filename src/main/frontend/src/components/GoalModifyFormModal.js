import React, { useState, useContext, useEffect } from "react";
//css
import { makeStyles } from '@material-ui/core/styles';
import "./GoalInsertFormModal.css"
import axios from "axios";
//icon
import { BiEdit } from "react-icons/bi";
//modal
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import GoalInsertForm from "./GoalInsertForm";

import { GoalTotalTitleListContext } from "../context/GoalTotalTitleListContext";

function GoalModifyFormModal({modifyData}){
  console.log("모달 수정데이터", modifyData)
  console.log("모달 수정 타이틀", modifyData.title)
  
    const [ goalTotalTitleList, setGoalTotalTitleList ] = useContext(GoalTotalTitleListContext);
    const YNtoTF = (value)=>{
        if(value === "Y"){
            return true
        }else{
            return false
        }
    }
    // 부모 목표의 제목 찾기
    const pIdtoTitle= (pId)=>{
        if(pId){
            let targetIndex = goalTotalTitleList.findIndex((element) =>{
                if(element.goalId == pId){
                    return true
                }
            })
            return goalTotalTitleList[targetIndex]["title"]
        }else{
            return "없음"
        }
    }
    const [startDatetime, setStartDatetime] = useState(new Date(modifyData.startDatetime));
    const [endDatetime, setEndDatetime] = useState(new Date(modifyData.endDatetime));
    const [shareStatus, setshareStatus] = useState(!YNtoTF(modifyData.shareStatus));
    const [title, setTitle] = useState(modifyData.title);
    const [content, setContent] = useState(modifyData.content);
    const [kind, setKind] = useState(modifyData.kind);
    //주기정보
    const [timeUnit, setTimeUnit] = useState(modifyData.periodicityInfo.timeUnit);
    const [type, setType] = useState(modifyData.periodicityInfo.type);
    const [count, setCount] = useState(modifyData.periodicityInfo.count);
    const [sun, setSun] = useState(YNtoTF(modifyData.periodicityInfo.sunYn))
    const [mon, setMon] = useState(YNtoTF(modifyData.periodicityInfo.monYn))
    const [tue, setTue] = useState(YNtoTF(modifyData.periodicityInfo.tueYn))
    const [wed, setWed] = useState(YNtoTF(modifyData.periodicityInfo.wedsYn))
    const [thu, setThu] = useState(YNtoTF(modifyData.periodicityInfo.thurYn))
    const [fri, setFri] = useState(YNtoTF(modifyData.periodicityInfo.fryYn))
    const [sat, setSat] = useState(YNtoTF(modifyData.periodicityInfo.satYn))
    const [progressRate, setProgressRate] = useState(parseInt(modifyData.progressRate));
    const [ parentId, setParentId ] = useState(modifyData.parentId);
    const [ parentGoalTitle, setParentGoalTitle ] = useState(pIdtoTitle(modifyData.parentId));
    const [color, setColor] = useState(modifyData.color);
    const defaultSearchTime = " 09:00:00";

    const useStyles = makeStyles((theme) => ({
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          backgroundColor: theme.palette.background.paper,
          // border: '2px solid #000',
          borderRadius: "10px",
          boxShadow: theme.shadows[5],
          padding: theme.spacing(1, 3, 2),
        },
      }));

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = async (evt) =>{
        evt.preventDefault();

        const formData = {
            "goalId" : modifyData.goalId,
            "parentId": parentId,
            "title": title,
            "kind":kind,
            "content":content,
            "startDatetime": makeYYMMDD(startDatetime) + defaultSearchTime,
            "endDatetime":makeYYMMDD(endDatetime) + defaultSearchTime,
            "progressRate":progressRate,
            "color":color,
            "shareStatus": shareStatus ? "N":"Y",
        }
        if(kind === "regular"){
            formData['periodicityInfo'] = {
            "timeUnit":timeUnit,
            "type":type,
            "count":count,
            "sunYn":sun ? "Y":"N",
            "monYn":mon ? "Y":"N",
            "tueYn":tue ? "Y":"N",
            "wedsYn":wed ? "Y":"N",
            "thurYn":thu ? "Y":"N",
            "friYn":fri ? "Y":"N",
            "satYn":sat ? "Y":"N"
            }
        }
        console.log('제출', formData)
        try{
            const result = await axios.put("/goalManage/goal", formData);
            console.log("제출결과", {result})
            setOpen(false);
            // setGoalFullList([...goalFullList, result.data])
        }catch(err){
            console.error(err)
        }

    }
    return (
        <>
          <button className="modifyBtn" variant="outlined" onClick={handleOpen}>
            <BiEdit style={{verticalAlign:"middle"}} title="수정"/>
          </button>
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
              <div className={classes.paper}>
                <h3 id="transition-modal-title">목표 수정</h3>
                <GoalInsertForm
                  startDatetime = {startDatetime}
                  setStartDatetime = {setStartDatetime}
                  endDatetime={endDatetime}
                  setEndDatetime = {setEndDatetime}
                  shareStatus={shareStatus}
                  setshareStatus={setshareStatus}
                  title={title}
                  setTitle={setTitle}
                  content = {content}
                  setContent = {setContent}
                  kind={kind}
                  setKind={setKind}
                  timeUnit={timeUnit}
                  setTimeUnit={setTimeUnit}
                  type={type}
                  setType={setType}
                  count={count}
                  setCount={setCount} 
                  sun={sun} setSun={setSun}
                  mon={mon} setMon={setMon}
                  tue={tue} setTue={setTue}
                  wed={wed} setWed={setWed}
                  thu={thu} setThu={setThu}
                  fri={fri} setFri={setFri}
                  sat={sat} setSat={setSat}  
                  progressRate={progressRate}
                  setProgressRate={setProgressRate}
                  parentId={parentId}
                  setParentId={setParentId}
                  parentGoalTitle={parentGoalTitle}
                  setParentGoalTitle={setParentGoalTitle}
                  color={color}
                  setColor={setColor}
                />
                <div className="button-wrapper">
                  <button type="submit" className="submitBtn" onClick={handleSubmit}>제출</button>
                  <button type="button" className="cancleBtn" onClick={handleClose}>취소</button>
                </div>
              </div>
            </Fade>
          </Modal>
        </>
      );
}

  // YYYY-MM-DD 형태로 반환
  function makeYYMMDD(value){
    return value.toISOString().substring(0,10);
}
export default GoalModifyFormModal;