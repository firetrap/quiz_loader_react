import './App.css';
import axios from 'axios';
import Quiz from 'react-quiz-component';
import React, {useState} from 'react';
import mockQuiz from "./mockQuiz";

var quizz = null

function App() {

    const [quizResult, setQuizResult] = useState();

    // fetchQuiz()

    axios.get("https://63f7492d833c7c9c60809ea5.mockapi.io/exams").then(response => {

        quizz = <Quiz
            quiz={mockQuiz}
            shuffle
            // showInstantFeedback
            // continueTillCorrect
            onComplete={setQuizResult}
            onQuestionSubmit={(obj) => console.log('user question results:', obj)}
            disableSynopsis
            // revealAnswerOnSubmit
            allowNavigation
        />;
        setQuizResult(null)

    }).catch(error => {
        quizz = <Quiz
            quiz={mockQuiz}
            shuffle
            // showInstantFeedback
            // continueTillCorrect
            onComplete={setQuizResult}
            onQuestionSubmit={(obj) => console.log('user question results:', obj)}
            disableSynopsis
            // revealAnswerOnSubmit
            allowNavigation
        />;
        setQuizResult(null)
    })

    return quizz

    // return (
    //     <div className="App">
    //         <header className="App-header">
    //             <img src={logo} className="App-logo" alt="logo"/>
    //             <p>
    //                 Edit <code>src/App.js</code> and save to reload.
    //             </p>
    //             <a
    //                 className="App-link"
    //                 href="https://reactjs.org"
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //             >
    //                 Learn React
    //             </a>
    //         </header>
    //     </div>
    // );
}

function ShowQuiz() {
    const [quizResult, setQuizResult] = useState();

    return <Quiz
        quiz={mockQuiz}
        shuffle
        // showInstantFeedback
        // continueTillCorrect
        onComplete={setQuizResult}
        onQuestionSubmit={(obj) => console.log('user question results:', obj)}
        disableSynopsis
        // revealAnswerOnSubmit
        allowNavigation
    />;
}

function fetchQuiz(response) {
    axios.get("https://63f7492d833c7c9c60809ea5.mockapi.io/exams").then(response => {

        console.log(response);
        ShowQuiz()
    })
        .catch(error => {

            console.log(error);
            ShowQuiz()
        })
}

export default App;
