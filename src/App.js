import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import SingleMovie from './SingleMovie';

class App extends React.Component{
  
  render(){
    return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/movies/:movieId">
        <SingleMovie />
      </Route>
    </Switch>
    )
  }
}

export default App;
