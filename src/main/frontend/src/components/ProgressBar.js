import React from "react";
import "./ProgressBar.css"

const ProgressBar = (props) => {
    return (
        <div className="progress-bar-boundary">
            <div style={{width:`${props.percent}%`}}>{props.percent}%</div>
        </div>
    )
}

export default ProgressBar;