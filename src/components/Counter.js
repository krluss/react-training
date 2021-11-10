import React, {useState, useEffect} from 'react'

const Counter = () => {
    const [counter, setCounter] = useState(0);
    const [randomUser, setRandomUser] = useState([]);

    useEffect(() => {
        fetch('https://randomuser.me/api')
        .then(response => response.json())
        .then(json => setRandomUser(json.results))
    }, [])

    const getFullUserName = userInfo =>{
        const { name: { first, last }} = userInfo;
        return ` ${first} ${last}`;
    }
    

    return (
        <div>
            <p> {counter}</p>
            <button onClick={ () => {setCounter(counter + 1)}}>Increase counter</button>
            {
                randomUser.map((userInfo, idx) => (
                    <div key={idx}>
                        <p >{getFullUserName(userInfo)}</p>
                        <img src={userInfo.picture.thumbnail} alt='randomUser'/>
                    </div>
                    )
                )
            }
        </div>
    )
}

export default Counter;