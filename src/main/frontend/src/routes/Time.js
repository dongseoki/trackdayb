import React from "react";
import "./Time.css";

function Time(props) {
  console.log(props);
  return (
    <div className="about__container">
      <span>
        시간관리
      </span>

      <div>
        제목
        <input type="text" />
      </div>

      <div>
        내용
        <textarea></textarea>
      </div>
    </div>
  );
}

export default Time;