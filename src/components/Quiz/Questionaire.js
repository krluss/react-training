import React from 'react'


const Questionaire = ({ 
    maxIndex,
    currentIndex,
    showAnswers,
    handleNextQuestion,
    handleAnswer, 
    data: { question, correct_answer, answers}}) => {


    return (
        <div className='container'>
            <div className='question'>
                <h3>{currentIndex + 1}/{maxIndex}</h3>
                <h2 className='questionText' dangerouslySetInnerHTML={{ __html : question}} />
            </div>
                <div className='answers'>
                    {answers.map((answer, id) => {
                        const colorName = showAnswers
                            ? answer === correct_answer
                                ? 'green'
                                : 'red'
                            : 'white'
                        return(
                            <button 
                            key={id} 
                            className='quizBtn'
                            style={{color: `${colorName}`}}
                            onClick={() =>handleAnswer(answer)}
                            dangerouslySetInnerHTML={{ __html : answer}}
                            />
                        );
                    })}
                </div>
                {showAnswers && (
                <button 
                    onClick={handleNextQuestion}
                    className='quizBtn' style={{marginLeft: 'auto'}}>
                    Next Question
                </button>
                )}
        </div>
    )
}

export default Questionaire;