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
        <div className="bookfound">
          <img className="bookimg" src={book.volumeInfo.imageLinks.thumbnail}/>
          <div id="hej" className="booktitle">{book.volumeInfo.title}></div>
        </div>);
          return(
            <div className="shelf" id={shelf.id} key={shelf.id}>
              <h1 className="shelfname">{shelf.name}</h1>
              <div className="books">
                {bookList}
              </div>
            </div>
              );
      })
      return (
        <div className="MyLibrari">
          {shelfList}

        </div>

      );
}
}
export default MyLibrari;
