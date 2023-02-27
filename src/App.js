import './App.css';
import Quiz from 'react-quiz-component';
import React, {useState} from 'react';
import DragAndDrop from "./components/dragAndDrop/dragAndDrop"

function App() {

    const [quiz, setQuiz] = useState(null);
    const [quizResult, setQuizResult] = useState();

    const onDrop = acceptedFiles => {
        const file = acceptedFiles[0];
        const reader = new FileReader()
        reader.onload = () => {

            const jsonArray = JSON.parse(reader.result.toString())
            const randomQuizObject = jsonArray[Math.floor(Math.random() * jsonArray.length)];

            const quizRenderer = (<Quiz
                quiz={randomQuizObject}
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
        }
        reader.readAsText(file)
    };

    const renderDropZone = <div className="react-quiz-container">
        <br/>
        <h4>This Drag 'n' drop will load a random "quiz" element inside the json array uploaded bellow.</h4>
        <h6>
            You can inspect or download an example of the quiz.json file to use <a
            href="http://www.stopsweats.org">here</a>
        </h6>
        <DragAndDrop onDrop={onDrop}>
        </DragAndDrop>
    </div>

    return (<div className="App">
        {quiz == null ? renderDropZone : quiz}
    </div>);
}

export default App;
