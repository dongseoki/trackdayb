import React from "react";
import "./Time.css";

function Time_left(props) {
  console.log(props);
  return (
    <div>
      <div>타임라인 검색</div>
      <div className="about__container">
        <div>
          <div>조회기간</div>
          <input type="date"></input>
        </div>
        <div>
          <div>목표선택</div>
          <div>
            <ul>
              <li>주1회 에세이 쓰기</li>
              <li>책 읽기</li>
            </ul>
          </div>
        </div>
        <div>
          <div>검색</div>
          <input type="text"></input>
        </div>
      </div>
    </div>
  );
}

export default Time_left;