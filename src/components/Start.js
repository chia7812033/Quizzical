import React from "react";

export default function Start(props) {
  return (
    <div className="start">
      <h1 className="start--title">Quizzical</h1>
      <h3 className="start--description">Some discription if needed</h3>
      <button className="start--btn" onClick={() => props.onClick(true)}>Start quiz</button>
    </div>
  )
}
