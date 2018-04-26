import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import './Shelf.css';


class Shelf extends Component {
    constructor(props){
        super(props);

        this.props.model.addObserver(this);

        this.state = {
            status: 'INITIAL',
            shelves: this.props.model.getShelves();
        }
    }


    update(){
      console.log('före forceupdate yo')
    }

    render(){
      let shelfList = null;
      shelfList = this.state.shelves.map((shelf) =>
      var books = shelf.map((books) =>
      <div className="bookfound">
        <img className="bookimg" src={book.volumeInfo.imageLinks.thumbnail}/>
        <div id="hej" className="booktitle">{book.volumeInfo.title}></div>
      </div>);
        return(
          <div className="shelf" id={shelf.id} key={shelf.id}>
            <h1>{shelf.name}</h1>
            <div className="MyLibrari">
              {bookList}
            </div>
          </div>
            );
    })
}
export default Shelf;
