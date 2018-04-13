import React, { Component } from 'react';
import { Route } from 'react-router-dom';
//import './App.css';
import Landing from './Landing/Landing';
import Header from './Header/Header';
import { modelInstance } from './data/BookModel'
import Search from './Search/Search';
import Book from './Book/Book';

import firebase from './firebase.js';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: 'Librari'
    }
  }

  render() {

    //LÅT STÅ!!!!1
    //firebase.database().ref('items') hämtar det innehåll som finns under "items" i databasen. 
    //Just nu är databasen inte implementerad
    // https://console.firebase.google.com/project/librari-41dab/database/librari-41dab/data
    //Här kan en se hur databasen ser ut (I alla fall David)
    const itemsRef = firebase.database().ref('items');
    const item = {
      name: "David",
      age: 25
    }
    //Exempel på push av object till firebase
    //itemsRef.push(item);    

    return (
      <div className='App'>
        <Route exact path="/" component={Header}/>
        <Route exact path="/" render={()=> <Search model={modelInstance}/>}/>
        <Route exact path="/" render={()=> <Landing model={modelInstance}/>}/>
        <Route path="/book/:value" render={()=> <Book model={modelInstance}/>}/>
      </div>
    );
  }
}

export default App;
