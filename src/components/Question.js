import React from "react";

export default function (props) {
  const answers = props.question.answers
  const answerElements = answers.map(answer => <div className="q--answer">{answer}</div>)

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
