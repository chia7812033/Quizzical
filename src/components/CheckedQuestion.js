import React from "react";

export default function CheckedQuestion(props) {

  const correct_style = {
    backgroundColor: "#94D7A2",
    border: "none"
  }

  const incorrect_style = {
    backgroundColor: "#F8BCBC",
    border: "none",
    opacity: "0.5"
  }

  const answers = props.question.answers
  const answerElements = answers.map(answer => {
    return <div className="q--answer"
      key={answer.id}
      style={answer.selected ? answer.correct ? correct_style : incorrect_style : {opacity: "0.5"}}
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
