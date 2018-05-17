import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
//import SearchResults from './SearchResults/SearchResults';
import Header from './Header/Header';
import { modelInstance } from './data/BookModel';
//import Search from './Search/Search';
import Book from './Book/Book';
import SearchView from './SearchView/SearchView';
import MyLibrari from './MyLibrari/MyLibrari';
import Navbar from './Navbar/Navbar';
import LogIn from './LogIn/LogIn';
import EditShelf from './EditShelf/EditShelf';



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
        <div className="Content">
          <center>
            <Route path="/" component={Header}/>
            <Route path="/login" render={() => <LogIn model={modelInstance} />} />
            <Route exact path="/" render={()=> <SearchView model={modelInstance}/>}/>
            <Route path="/book/:value" render={()=> <Book model={modelInstance}/>}/>
            <Route path="/profile" render={()=> <MyLibrari model={modelInstance}/>}/>
            <Route path="/edit_shelf/:value" render={()=> <EditShelf model={modelInstance}/>}/>
          </center>
        </div>
        <div className="Navbar">
          <Route path="/" render={() => <Navbar model={modelInstance}/>} /> 
        </div>
      </div>
    );
  }
}

export default App;
