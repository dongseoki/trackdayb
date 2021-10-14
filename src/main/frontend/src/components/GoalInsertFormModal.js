import React, { useState } from "react";
//css
import { makeStyles } from '@material-ui/core/styles';
import "./GoalInsertFormModal.css"
import axios from "axios";
//icon
import { FaPlus, FaLock } from "react-icons/fa";
//modal
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
//goalInsertForm
import randomColor from "randomcolor";
import GoalInsertForm from "./GoalInsertForm";


function GoalInsertFormModal({goalFullList, setGoalFullList}){
  const [startDatetime, setStartDatetime] = useState(new Date());
  const [endDatetime, setEndDatetime] = useState(new Date());
  const [shareStatus, setshareStatus] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [kind, setKind] = useState('regular');
  //주기정보
  const [timeUnit, setTimeUnit] = useState('D');
  const [type, setType] = useState('count');
  const [count, setCount] = useState('');
  const [sun, setSun] = useState(false)
  const [mon, setMon] = useState(false)
  const [tue, setTue] = useState(false)
  const [wed, setWed] = useState(false)
  const [thu, setThu] = useState(false)
  const [fri, setFri] = useState(false)
  const [sat, setSat] = useState(false)
  const [progressRate, setProgressRate] = useState("");
  
  const [ parentId, setParentId ] = useState("")
  const [ parentGoalTitle, setParentGoalTitle ] = useState("없음");
  const [color, setColor] = useState(randomColor());
  const defaultSearchTime = " 09:00:00";
  
  
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
  
    const handleSubmit = async (evt) => {
      evt.preventDefault();

      const formData = {
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
        const result = await axios.post("/goalManage/goal2", formData);
        console.log("제출결과", {result})
        setOpen(false);
        setGoalFullList([...goalFullList, result.data])
      }catch(err){
        console.error(err)
      }
    };
  
    return (
      <div>
        <button className="goal-insert-btn" onClick={handleOpen}><FaPlus /></button>
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
              <h3 id="transition-modal-title">목표 추가</h3>
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
                setColor = {setColor}
                          
              />
              <div className="button-wrapper">
                <button type="submit" className="submitBtn" onClick={handleSubmit}>제출</button>
                <button type="button" className="cancleBtn" onClick={handleClose}>취소</button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
  

  // YYYY-MM-DD 형태로 반환
function makeYYMMDD(value){
    return value.toISOString().substring(0,10);
}


  export default GoalInsertFormModal;