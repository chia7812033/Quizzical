import React from "react";
import { nanoid } from 'nanoid'
import Start from "./components/Start";
import Question from "./components/Question";

function App() {

  const [questions, setQuestions] = React.useState([])

  const questionsElements = questions.map(q => <Question key={q.id} question={q} onClick={clickAnswer} />)

  const [start, setStart] = React.useState(false)

  let initialRender = true;
  React.useEffect(() => async () => {
    const response = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
    const fetchQuestions = await response.json()
    const newQuestions = await fetchQuestions.results.map(q => {
      return {
        ...q, answers: [...q.incorrect_answers, q.correct_answer].map(answer =>
        { return { text: answer, selected: false, id: nanoid() } }), id: nanoid()
      }
    })
    if (initialRender) {
      initialRender = false
    } else {
      setQuestions(newQuestions)
    }
  }
    , [start])

  function clickAnswer(event, quenstionId, answerId) {
    console.log(quenstionId, answerId)
  }

  return (
    <div className="App">
      {!start && <Start onClick={setStart} />}
      {start && <div className="questions">{questionsElements}</div>}
    </div>
  );
}

export default App;
