import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MyLibrari.css';

var shelves;

class MyLibrari extends Component {
    constructor(props){
        super(props);

        //this.props.model.addObserver(this);
        this.handleRemove = this.handleRemove.bind(this)

        this.state = {
            status: 'INITIAL',
            shelves: this.props.model.getShelves()
        }
    }

    componentDidMount() {
      this.props.model.addObserver(this)
    }

    handleRemove = (sID, bID) => {
      console.log("försöker ta bort en bok" + sID + ' ' + bID)
      this.props.model.removeBookFromShelf(sID, bID);
    }

    update(){
      this.setState({
        shelves: this.props.model.getShelves()
      })
      //console.log('före forceupdate yo')
      //this.forceUpdate();
    }

    render(){
      let shelfList = null;
      shelfList = this.state.shelves.map((shelf) => {
        var bookList = shelf.books.map((book, i) => 
          <div className="collectionBook" key={i}>
            <img className="bookimg" src={book.volumeInfo.imageLinks.thumbnail}/>
            <div className="booktitle">
              <div className="col-md-1">
                <span className="removebtn glyphicon glyphicon-remove-circle" onClick = { () =>this.handleRemove(shelf.id, book.id)}></span>
              </div>
              <div className="col-md-12">
                {book.volumeInfo.title}
              </div>
            </div>
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
