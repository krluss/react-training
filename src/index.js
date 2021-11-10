import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './components/App';
import Jokes from './components/Jokes/Jokes';
import Header from './components/Header';
import TodoList from './components/TodoList/TodoList';
import Quiz from './components/Quiz/Quiz';

import './index.css';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path='/' render={() => <Header><App /></Header>}></Route>
            <Route path='/jokes' render={() => <Header><Jokes /></Header>}></Route>
            <Route path='/todo' render={() => <Header><TodoList /></Header>}></Route>
            <Route path='/quiz' render={() => <Header><Quiz /></Header>}></Route>
        </Switch>
    </Router>, 
    document.getElementById('root')
    );
