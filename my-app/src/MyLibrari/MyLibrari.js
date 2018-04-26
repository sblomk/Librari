import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MyLibrari.css';

var shelves;

class MyLibrari extends Component {
    constructor(props){
        super(props);

        this.props.model.addObserver(this);

        this.state = {
            status: 'INITIAL',
            shelves: this.props.model.getShelves()
        }
    }


    update(){
      console.log('före forceupdate yo')
      this.forceUpdate();
    }

    render(){
      let shelfList = null;
      shelfList = this.state.shelves.map((shelf) => {
        var bookList = shelf.books.map((book) =>
          <div className="collectionBook">
            <img className="bookimg" src={book.volumeInfo.imageLinks.thumbnail}/>
            <div className="booktitle">{book.volumeInfo.title}></div>
          </div>);

        return(
          <div className="personalShelf" id={shelf.id} key={shelf.id}>
            <div className="shelfname">{shelf.name}</div>
            <div className="collection">
              {bookList}
            </div>
          </div>
        );
      })
      return (
        <div className="myLibrari">
          {shelfList}
        </div>

      );
}
}
export default MyLibrari;
