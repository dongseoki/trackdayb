import React, { useState, useEffect } from "react"
import Checkbox from '@mui/material/Checkbox';
import "./GoalTitleList.css"
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function GoalTitleList({goalTitleList}){
    // 목표-부모&자식 묶기
    const argGoalTitleObject = ArrangeGoalTitleList(goalTitleList)

    return (
        <div>
            <p>목표선택</p>
            <div className="goal-list">
                <ul>
                    {argGoalTitleObject && Object.keys(argGoalTitleObject).map((key, index) => {
                        
                        if(argGoalTitleObject[key].children.length === 0){
                            return (
                                <GoalTitleParentCards 
                                    key={argGoalTitleObject[key].goalId}
                                    goalId = {argGoalTitleObject[key].goalId}
                                    title={argGoalTitleObject[key].title}
                                    parentId={argGoalTitleObject[key].parentId}
                                    color ={argGoalTitleObject[key].color}
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
                </ul>
            </div>
        </div>
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

// YYYY-MM-DD 형태로 반환
function makeYYMMDD(value){
    return value.toISOString().substring(0,10);
}


export default GoalTitleList;