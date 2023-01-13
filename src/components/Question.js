import React from "react";

export default function (props) {

  const style = {
    backgroundColor: "#D6DBF5",
    border: "none"
  }

  const answers = props.question.answers
  const answerElements = answers.map(answer => {
    return <div className="q--answer"
      key={answer.id}
      onClick={(event) => props.onClick(event, props.question.id, answer.id)}
      style={answer.selected ? style : {}}
    >{answer.text}</div>
  })

  return (
    <div className="q">
      <div className="q--title">{props.question.question}</div>
      <div className="q--answers">
        {answerElements}
      </div>
      <hr></hr>
    </div>
  )
}
