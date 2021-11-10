import React, { useState, useEffect } from 'react';

export const TodoList = () => {
    const [ todo,  setTodo ] = useState('')
    const [ todos,  setTodos ] = useState([])
    const [ isEditing, setIsEditing ] = useState(false);
    const [ isAlert, setIsAlert ] = useState(false);
    const [ editId, setEditId ] = useState(null);

    useEffect( () => {
        const temp = localStorage.getItem('todos');
        const loadedTodos = JSON.parse(temp);
        if(loadedTodos){
            setTodos(loadedTodos)
        };
    }, [])

    useEffect( () => {
        const temp = JSON.stringify(todos);
        localStorage.setItem('todos', temp);
    }, [todos])

    const handleSubmit = e => {        
        e.preventDefault();
        if(!todo){
            setIsAlert(true);
        } else if(todo && isEditing) {
            setIsAlert(false);
            setTodos(todos.map((item) => {
                if(item.id === editId){
                    return {...item, text: todo}
                }
                return item;
            }))
            setTodo('')
            setEditId(null);
            setIsEditing(false);
        } else {
            setIsAlert(false);
            const newTodo = {
                id: new Date().getTime(),
                text: todo
            }
            setTodos([...todos, newTodo]);
            setTodo('');
        }   
    }

    const deleteTodo = id => {
        const updatedTodos = [...todos].filter( (item) => item.id !== id);
        setTodos(updatedTodos);
    }

    const editTodo = id => {
        const specificTodo = [...todos].find( (item) => item.id === id);
        setIsEditing(true);
        setEditId(id);
        setTodo(specificTodo.text);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' onChange={e => setTodo(e.target.value)} value={todo}/>
                <button type='submit'>{isEditing ? 'Edit' : 'Add Todo'}</button>
            </form>
            {isAlert ? <p style={{color: 'red'}}>Please enter value</p> : ''}
            {todos.map((item) => 
                <div key={item.id}>
                     <div>{item.text}
                        <button onClick={() => editTodo(item.id)}>Edit</button>
                        <button onClick={() => deleteTodo(item.id)}>Delete</button>
                     </div>
                     
                </div>
                )}
        </div>
    )
}

export default TodoList;