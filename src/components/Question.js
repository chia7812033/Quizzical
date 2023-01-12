import React from "react";

export default function (props) {
  const answers = props.question.answers
  const answerElements = answers.map(answer => {
    return <div className="q--answer"
      key={answer.id}
      onClick={(event) => props.onClick(event, props.question.id, answer.id)}
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
