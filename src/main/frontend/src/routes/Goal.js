import React from "react";
import "./Goal.css";
import { LeftNavigation } from '../components/index';

function Goal(props) {
  console.log(props);
  return (
    <div className="goal">
      {/* 사이드 */}
      <aside className="side">
        <LeftNavigation />
      </aside>
    
    <div className="goal-content">
      <h3>목표관리</h3>
      <div className="goal-cards">
        <div className="card">
          책읽기
        </div>
        <div className="card">
          책읽기
        </div>
        <div className="card">
          책읽기
        </div>
      </div>
    </div>

    </div>
  );
}

export default Goal;