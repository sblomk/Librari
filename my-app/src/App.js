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
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';



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
        <Route path="/" component={Navbar}/> 
        <Route exact path="/(|profile)" component={Header}/>
        <Route exact path="/" render={()=> <SearchView model={modelInstance}/>}/>
        <Route path="/book/:value" render={()=> <Book model={modelInstance}/>}/>
        <Route path="/profile" render={()=> <MyLibrari model={modelInstance}/>}/>
        <Route path="/signup" render={()=> <SignUp model={modelInstance}/>}/>
        <Route path="/signin" render={()=> <SignIn model={modelInstance}/>}/>
      </div>
    );
  }
}

export default App;
