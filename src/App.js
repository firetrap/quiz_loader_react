import './App.css';
import axios from 'axios';
import Quiz from 'react-quiz-component';
import React, {useState} from 'react';
import mockQuiz from "./mockQuiz";
import LoadingSpinner from "./components/progress/loading";

function App() {

    const [quiz, setQuiz] = useState(null);
    const [quizResult, setQuizResult] = useState();
    const [isLoading, setIsLoading] = useState(false);

    // setIsLoading(false)
    const handleFetch = () => {
        setIsLoading(true);
        fetch("https://63f7492d833c7c9c60809ea5.mockapi.io/exams")
            .then(response => response.json())
            .then(response => {

                const quizi = (<Quiz
                    quiz={mockQuiz}
                    shuffle
                    // showInstantFeedback
                    // continueTillCorrect
                    onComplete={setQuizResult}
                    onQuestionSubmit={(obj) => console.log('user question results:', obj)}
                    disableSynopsis
                    // revealAnswerOnSubmit
                    allowNavigation
                />)
                setQuiz(quizi)
                setIsLoading(false)
            })
            .catch(() => {
                setIsLoading(false);
            });
    };


    return (<div className="App">
        {isLoading ? <LoadingSpinner/> : quiz}
        <button onClick={handleFetch} disabled={isLoading}>
            Fetch Users
        </button>
    </div>);
}

export default App;
