import './App.css';
import Quiz from 'react-quiz-component';
import React, {useState} from 'react';
import ProgressSpinner from "./components/progress/progress";

function App() {

    const [quiz, setQuiz] = useState(null);
    const [quizResult, setQuizResult] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleFetch = () => {

        setIsLoading(true);
        fetch("https://63f7492d833c7c9c60809ea5.mockapi.io/exams").then(response => response.json())
            .then(response => {

                const randomQuiz = response[Math.floor(Math.random() * response.length)];

                const quizRenderer = (<Quiz
                    quiz={randomQuiz}
                    shuffle
                    // showInstantFeedback
                    // continueTillCorrect
                    onComplete={setQuizResult}
                    onQuestionSubmit={(obj) => console.log('user question results:', obj)}
                    disableSynopsis
                    // revealAnswerOnSubmit
                    allowNavigation
                />)
                setQuiz(quizRenderer)
                setIsLoading(false)
            })
            .catch(error => {
                setIsLoading(false);
                console.log('Error fetching data:', error)
            });
    };


    return (<div className="App">
        {isLoading ? <ProgressSpinner/> : quiz}
        <div className="react-quiz-container">
            <button onClick={handleFetch} disabled={isLoading} className="btnLoadQuestions">
                Load new questions
            </button>
        </div>
    </div>);
}

export default App;
