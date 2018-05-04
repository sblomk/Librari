import React, { Component } from 'react';
import { Route } from 'react-router-dom';
//import './App.css';
//import SearchResults from './SearchResults/SearchResults';
import Header from './Header/Header';
import { modelInstance } from './data/BookModel'
//import Search from './Search/Search';
import Book from './Book/Book';
import SearchView from './SearchView/SearchView';
import MyLibrari from './MyLibrari/MyLibrari';
import Navbar from './Navbar/Navbar';


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
    //Exempel på push av object till firebase
    //itemsRef.push(item);

    return (
      <div className='App'>
        <Route path="/" component={Navbar}/> 
        <Route exact path="/(|profile)" component={Header}/>
        <Route exact path="/" render={()=> <SearchView model={modelInstance}/>}/>
        <Route path="/book/:value" render={()=> <Book model={modelInstance}/>}/>
        <Route path="/profile" render={()=> <MyLibrari model={modelInstance}/>}/>
      </div>
    );
  }
}

export default App;
