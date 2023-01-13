import React from "react";
import { nanoid } from 'nanoid'
import Start from "./components/Start";
import Question from "./components/Question";
import CheckedQuestion from "./components/CheckedQuestion";

function App() {

  const [questions, setQuestions] = React.useState([])

  const questionsElements = questions.map(q => <Question key={q.id} question={q} onClick={clickAnswer} />)

  const [start, setStart] = React.useState(false)

  function shuffleAnswer(question) {
    const NewQuestion = question.map(q => {
      return { ...q, answers: shuffle(q.answers) }
    })
    function shuffle(a) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    }
    return NewQuestion
  }

  // function formatQuestion(question) {
  //   let FormatedQuestion = question.map(q => {
  //     return { ...q, question: q.question.replace("&quot", "\"") }
  //   })
  //   FormatedQuestion = FormatedQuestion.map(q => {
  //     return { ...q, question: q.question.replace("&#039", "\'") }
  //   })
  //   return FormatedQuestion
  // }

  React.useEffect(() => {

    // const response = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
    // const fetchQuestions = await response.json()
    // const newQuestions = await fetchQuestions.results.map(q => {
    //   return {
    //     ...q, answers: [...q.incorrect_answers, q.correct_answer].map(answer => {
    //       return { text: answer, selected: false, id: nanoid() }
    //     }), id: nanoid()
    //   }
    // })
    if (start) {
      fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
        .then(response => response.json())
        .then(q => q.results.map(q => {
          return {
            ...q, answers: [...q.incorrect_answers, q.correct_answer].map(answer => {
              return { text: answer, selected: false, id: nanoid() }
            }), id: nanoid()
          }
        }))
        .then(q => shuffleAnswer(q))
        // .then(q => formatQuestion(q))
        .then(q => setQuestions(q))
    }
  }
    , [start])

  function clickAnswer(event, quenstionId, answerId) {
    setQuestions(prevState => prevState.map(q => {
      return q.id === quenstionId ?
        {
          ...q, answers: q.answers.map(answer => {
            return answer.id === answerId ?
              { ...answer, selected: !answer.selected } :
              { ...answer, selected: false }
          })
        } :
        q
    }))
  }

  const [checked, setChecked] = React.useState(false)

  const [checkedQuestionElements, setCheckedQuestionElements] = React.useState([])

  const [corrects, setCorrects] = React.useState(0)

  function checkAnswer() {
    const checkedQuestion = []
    let count = 0
    for (let i = 0; i < 5; i++) {
      const q = questions[i]
      const correct_answer = q.correct_answer
      const checkedAnswer = []
      for (let j = 0; j < 4; j++) {
        if (q.answers[j].selected) {
          if (q.answers[j].text !== correct_answer) {
            checkedAnswer.push({ ...q.answers[j], correct: false })
          } else {
            checkedAnswer.push({ ...q.answers[j], correct: true })
            count++
          }
        }
        else {
          checkedAnswer.push({ ...q.answers[j] })
        }
      }
      checkedQuestion.push({ ...q, answers: checkedAnswer })
    }
    setQuestions(checkedQuestion)
    setCheckedQuestionElements(checkedQuestion.map(q => {
      return <CheckedQuestion key={q.id} question={q} />
    }))
    setChecked(true)
    setCorrects(count)
  }

  function newGame(event) {
    setStart(false)
    setChecked(false)
    setQuestions([])
  }

  return (
    <div className="App">
      {!start && <Start onClick={setStart} />}
      {start && !checked &&
        <div className="q-page">
          <div className="questions">
            {questionsElements}
          </div>
          <button className="check-btn" onClick={checkAnswer}>Check answer</button>
        </div>
      }
      {
        start && checked &&
        <div className="questions">
            {checkedQuestionElements}
            <div className="checked-title">
              <p className="checked-point">You Scored {corrects}/5 correct answers</p>
              <button className="check-btn" onClick={newGame}>Play again</button>
            </div>
        </div>
      }
    </div>
  );
}

export default App;
