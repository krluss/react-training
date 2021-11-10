import React, { useState } from 'react'
import Select from 'react-select'
import { options, struggling} from '../../data/categories'

const SelectQuiz = ( {handleGameState} ) => {
    const [category, setCategory] = useState('');
    const [difficulty, setDifiiculty]= useState('');

    return (
        <div>
            <form>
            <h2>Select category: </h2>
            <Select options={options} onChange={(data) => setCategory(data.value)}/>
            <h2>Select difficulty: </h2>
            <Select options={struggling} onChange={ (data) => setDifiiculty(data.value)}/>
            <hr/>
            <button onClick={ () => handleGameState(category, difficulty)}className='quizBtn' style={{ color: 'white' }}>Play</button>
            </form>
        </div>
    )
}

export default SelectQuiz