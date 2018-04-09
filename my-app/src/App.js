import React, { Component } from 'react';
import { Route } from 'react-router-dom';
//import './App.css';
import Landing from './Landing/Landing';
import Header from './Header/Header';
import { modelInstance } from './data/BookModel'
import Search from './Search/Search';
import Book from './Book/Book';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: 'Librari'
    }
  }

  render() {
    return (
      <div className='App'>
        <Route exact path="/" component={Header}/>
        <Route exact path="/" render={()=> <Search model ={modelInstance}/>}/>
        <Route exact path="/" render={()=> <Landing model ={modelInstance}/>}/>
        <Route path="/book/:value" render={()=> <Book model = {modelInstance}/>}/>
      </div>
    );
  }
}

export default App;
