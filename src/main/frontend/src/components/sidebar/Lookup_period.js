import React from "react";

class Lookup_period extends React.Component {
    render() {
      return (
        <div>
            <h1>Hello, {this.props.name}</h1>
            <div>조회기간</div>
            <input type="date"></input>
        </div>
      )
    }
  }