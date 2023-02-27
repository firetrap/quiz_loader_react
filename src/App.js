import './App.css';
import Quiz from 'react-quiz-component';
import React, {useEffect, useState} from 'react';
import DragAndDrop from "./components/dragAndDrop/dragAndDrop"

let jsonArray = null;
let isReloading = false;

function App() {

    const [quiz, setQuiz] = useState(null);
    const [quizResult, setQuizResult] = useState();

    useEffect(() => {
        if (!isReloading) return;

        setQuiz(buildQuiz(setQuizResult))
        isReloading = false
    }, [quiz]);
    const onDrop = acceptedFiles => {
        const file = acceptedFiles[0];
        const reader = new FileReader()
        reader.onload = () => {

            jsonArray = JSON.parse(reader.result.toString())
            setQuiz(buildQuiz(setQuizResult))
        }
        reader.readAsText(file)
    };

    const renderDropZone = <div className="react-quiz-container">
        <br/>
        <h4>This Drag 'n' drop will load a random "quiz" element inside the json array uploaded bellow.</h4>
        <h5>
            You can inspect or download an example of the quiz.json file to use <a
            href="https://raw.githubusercontent.com/firetrap/quiz_loader_react/main/QuestionsExample.json">here</a>
        </h5>
        <DragAndDrop onDrop={onDrop}>
        </DragAndDrop>
    </div>

    const renderQuizSummaryOptions = <div className="react-quiz-container">

        <div className="summaryOptions">
            <button onClick={() => {

                isReloading = true
                setQuiz(null)
                setQuizResult(null)
            }} className="btnSummaryOptionNewQuestions">
                Load new questions
            </button>
            <button onClick={() => {

                window.location.reload()
            }} className="btnSummaryOptionNewJson">
                Upload new json file
            </button>

        </div>
    </div>

    return (<div className="App">
        {quiz == null ? renderDropZone : quiz}
        {quizResult != null ? renderQuizSummaryOptions : null}
    </div>);
}

function buildQuiz(onComplete) {
    const randomQuizObject = jsonArray[Math.floor(Math.random() * jsonArray.length)];

    return <Quiz
        quiz={randomQuizObject}
        shuffle
        // showInstantFeedback
        // continueTillCorrect
        onComplete={onComplete}
        onQuestionSubmit={(obj) => console.log('user question results:', obj)}
        // disableSynopsis
        // revealAnswerOnSubmit
        // allowNavigation
    />
}

export default App;
