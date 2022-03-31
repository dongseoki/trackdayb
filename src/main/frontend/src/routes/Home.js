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
                <div className='link-box'>
                    <a href="https://forms.gle/zJmLVMoKX6nFWbuw6" target="_blank" rel="noopener noreferrer">
                        <p>&#127856; 피드백 남기러 가기 &#127856;</p>
                    </a>
                    <a href="https://open.kakao.com/o/gu0EefLd" target="_blank" rel="noopener noreferrer">
                        <p>&#128073; FAQ (개발자 오픈카톡) &#128072;</p>
                    </a>
                </div> 
            </div>
        </div>
    )
}
export default Home;