import React from 'react';
import "./Home.css"

function Home () {
    return (
        <div className="home">
            <div className="main-slogan">
                <p>Track</p>
                <p>Your</p>
                <p>Day</p>
            </div>
            <div className="main-illustrations">
                <img className="checking-box-svg" src="img/undraw_checking_boxes_re_9h8m.svg" alt="checking box"></img>
                <img className="dividing-time-svg" src="img/undraw_personal_goals_re_iow7.svg" alt="Time management"></img>
                <img className="progress-bar-svg" src="img/undraw_progress_overview_re_tvcl.svg" alt="Progress bar"></img>
                <img className="bulletin-board-svg" src="img/undraw_timeline_re_aw6g.svg" alt="Bulletin board"></img>
            </div>
        </div>
    )
}
export default Home;