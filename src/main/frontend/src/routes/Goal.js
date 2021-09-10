import React from "react";
import "./Goal.css";
import { Lookup_period, Goal_list } from '../components/index';

function Goal(props) {
  console.log(props);
  return (
    <div className="goal">
      {/* 사이드 */}
      <aside className="side">
        <div>목표 검색</div>
        <Lookup_period />
        <Goal_list />
        <div>검색</div>
        <input type="text" />
      </aside>
    
    <div className="about__container">
      <span>
        목표관리
      </span>
    </div>

    </div>
  );
}

export default Goal;