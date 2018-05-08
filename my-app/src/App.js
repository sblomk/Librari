import React, { Component } from 'react';
import { Route } from 'react-router-dom';
//import './App.css';
//import SearchResults from './SearchResults/SearchResults';
import Welcome from './Welcome/Welcome';
import Header from './Header/Header';
import { modelInstance } from './data/BookModel';
//import Search from './Search/Search';
import Book from './Book/Book';
import SearchView from './SearchView/SearchView';
import MyLibrari from './MyLibrari/MyLibrari';
import Navbar from './Navbar/Navbar';
import LogIn from './LogIn/LogIn';



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
        <Route path="/" component={Navbar} /> 
        <Route exact path="/(|profile|login)" component={Header}/>
        <Route path="/login" render={() => <LogIn />} />
        <Route exact path="/" render={()=> <SearchView model={modelInstance}/>}/>
        <Route path="/book/:value" render={()=> <Book model={modelInstance}/>}/>
        <Route path="/profile" render={()=> <MyLibrari model={modelInstance}/>}/>

      </div>
    );
  }
}

export default App;
