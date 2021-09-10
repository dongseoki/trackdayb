import React from "react";
import "./Time.css";
import { Lookup_period, Goal_list } from '../components/index';

function Time(props) {
  console.log(props);
  return (
    <div className="time">
      {/* 사이드 */}
      <aside className="side">
        <div>타임라인 검색</div>
        <Lookup_period />
        <Goal_list />
        <div>검색</div>
        <input type="text" />
      </aside>


      {/* 참조데이터 */}
      <div className="timeline">타임라인</div>

      {/* 기록 */}
      <div className="write">
        <div>
          2021-09-12
          <input type="date"/>
        </div>
        <div>
          <span>시간입력</span>
          <span>12:30 ~ 14:50</span>
          <span>목표선택</span>
          <span>목표 리스트 모달창</span>
          <div>내용</div>
          <textarea></textarea>
          <div>평가</div><span>점수선택(80%)</span>
        </div>
      </div>
    </div>
  );
}

export default Time;