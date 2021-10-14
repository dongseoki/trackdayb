import React from "react"
import Checkbox from '@mui/material/Checkbox';
import "./GoalTitleList.css"
//Tree 
import Tree from '@naisutech/react-tree'
//checkbox
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function GoalTitleList({goalTitleList, searchGoalIdList, setSearchGoalIdList}) {
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
        goalObj.index = index
        nodes.push(goalObj)
    })

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

    const changeHandler = (e, checked, id) => {
        console.log('e.target', e.target)
        e.stopPropagation() //이벤트 버블링 막기
        e.preventDefault();
        if (checked) {
          setSearchGoalIdList([...searchGoalIdList, id]);
        } else {
          // 체크 해제
          setSearchGoalIdList(searchGoalIdList.filter((el) => el !== id));
        }
      };
      
    return (
        <div>
            <p>목표선택</p>
            <div className="goal-list">
      {/* <div style={{ display: 'flex', flexWrap: 'nowrap', flexGrow: 1 }}> */}
        {/* <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}> */}
            <Tree 
                nodes={nodes} 
                theme="modifiedDarkLarge"
                customTheme={myThemes}
                NodeRenderer={({
                    data: Node
                }) => {
                    return (
                        <li key={Node.id} >
                            <Checkbox {...label} 
                            onChange={(e)=>{changeHandler(e, e.currentTarget.checked, Node.id)}}
                            checked={searchGoalIdList.includes(Node.id) ? true : false} 
                            value={Node.id}/>
                            <p className="class-2" name={Node.label}>{Node.label}</p>
                            <div className="color-tag" style={{ backgroundColor : Node.color}}></div>
                        </li>
                        )
                    }
                }
            >
  </Tree>
        </div>
      </div>
    //   </div>
    //   </div>
    )
  }


function GoalTitleParentCards({title, goalId, color}) {
    return (
        <li key={goalId}>
            <Checkbox {...label} defaultChecked />
            <p className="class-2">{title}</p>
            <div className="color-tag" style={{ backgroundColor : color}}></div>
        </li>
    )
}

function GoalTitleChildCards({title, goalId}) {
    const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

    return (
        <li key={goalId}>
            <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            />
            <p className="class-2">{title}</p>
            <div className="none-tag"></div>
        </li>
    )
}


export default GoalTitleList;