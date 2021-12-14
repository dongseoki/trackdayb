import React, { useState } from 'react';
import "./Home.css"
import useTitle from '../hooks/useTitle';
import GuidePopup from '../components/GuidePopup';

function Home () {
    const titleUpdater = useTitle("trackDay");
    setTimeout(()=>titleUpdater("메인"), 100);
    
    const [showGuide, setShowGuide] = useState(true);
    return (
        <div className="home">
            <GuidePopup showGuide={showGuide} setShowGuide={setShowGuide}/>
            <div className="main-banner">
                <div className="img-wrapper">
                    <img className='pattern-design-jpg' src="img/fakurian-design-PjG_SXDkpwQ-unsplash.jpg" alt="main-background"></img>
                </div>
                <div className="main-slogan">
                    <p>Track Your Day</p>
                </div>
            </div>
            {/* <div className="main-illustrations">
                <img className="checking-box-svg" src="img/undraw_checking_boxes_re_9h8m.svg" alt="checking box"></img>
                <img className="dividing-time-svg" src="img/undraw_personal_goals_re_iow7.svg" alt="Time management"></img>
                <img className="progress-bar-svg" src="img/undraw_progress_overview_re_tvcl.svg" alt="Progress bar"></img>
                <img className="bulletin-board-svg" src="img/undraw_timeline_re_aw6g.svg" alt="Bulletin board"></img>
            </div> */}
        </div>
    )
}
export default Home;