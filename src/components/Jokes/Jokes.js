import React, { useState, useEffect } from 'react'

const Joke = ({ joke }) => {
    const { setup, delivery } = joke;

    return <p style={{margin: 20}}>{setup} <em>{delivery}</em></p>
}

const Jokes = () => {
    const[joke, setJoke] = useState({})
    const[jokes, setJokes] = useState([])


    useEffect( () => {
        fetch('https://v2.jokeapi.dev/joke/Any?type=twopart')
            .then(response => response.json())
            .then(json => setJoke(json))
            .catch(error => alert(error.message));
    }, []);

    const fetchJokes = () => {
        fetch('https://v2.jokeapi.dev/joke/Any?type=twopart&amount=10')
            .then(response => response.json())
            .then(json => {
                setJokes(json.jokes);
            })
            .catch(error => alert(error.message));
    }

    return (
        <div>
            <h2>Highlighted Joke</h2>
            <Joke joke={joke}/>
            <hr />
            <h3>Want ten new jokes?</h3>
            <button onClick={fetchJokes}>Click me!</button>
            {jokes.map(joke => (<Joke key={joke.id} joke={joke} />))}
        </div>
    )
}

export default Jokes;
