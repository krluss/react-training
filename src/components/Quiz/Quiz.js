import React, { useState } from 'react';
import Questionaire from './Questionaire';
import SelectQuiz from './SelectQuiz';
import './index.css';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [showAnswers, setShowAnswers] = useState(false);


    const handleAnswer = (answer) => {
        if(!showAnswers){
            if(answer === questions[currentIndex].correct_answer) {
                setScore(score + 1)
            }
        }

        setShowAnswers(true);
    }

    const handleGameState = (category, difficulty) => {
        const API_URL = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
        fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const questions = data.results.map((question) => 
            ({
                ...question,
                answers: [question.correct_answer, ...question.incorrect_answers]
                .sort( () => Math.random() - 0.5)
            }));
            setQuestions(questions)
        })
        setGameStarted(true);
    }

    const handleNextQuestion = () => {
        setCurrentIndex(currentIndex + 1);
        setShowAnswers(false);
    }
    
    const resetGame = () => {
        setCurrentIndex(0);
        setGameStarted(false)
        setScore(0);
    }
        

    return (
        !gameStarted ? (<SelectQuiz handleGameState={handleGameState}/>) 
        :
            questions.length > 0 ? (
            <div>
                    {currentIndex >= questions.length ? (
                        <div>
                            <h1>Your score was {score}</h1>
                            <button onClick={resetGame} className='quizBtn' style={{color: 'white'}}>Play again</button>
                     </div>
                 ) :  <Questionaire 
                        data={questions[currentIndex]} 
                        handleAnswer={handleAnswer} 
                        showAnswers={showAnswers} 
                        handleNextQuestion={handleNextQuestion} 
                        currentIndex={currentIndex}
                        maxIndex={questions.length}
                        />
                }
        </div>
        ) : (
                <h1> Loading...</h1>
        )
    )
}

export default Quiz;