import React, { Component } from 'react';
import { Route } from 'react-router-dom';
//import './App.css';
import Landing from './Landing/Landing';
import Header from './Header/Header';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Route exact path="/" component={Header}/>
      </div>
    );
  }
}

export default App;
