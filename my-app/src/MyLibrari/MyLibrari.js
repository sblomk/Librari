import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import './MyLibrari.css';

//var shelves;

class MyLibrari extends Component {
    constructor(props){
        super(props);

        //this.props.model.addObserver(this);
        this.handleRemove = this.handleRemove.bind(this)
        this.getShelves = this.getShelves.bind(this)

        this.state = {
            status: 'INITIAL',
            shelves: this.getShelves()
        }
    }
    getShelves() {
      this.props.model.getShelves((shelves) => {
        console.log(shelves + '!!!!!!!!!!!!!!!!!!')
        var a = shelves;
        for (var i=0; i < a.length; i++){
          console.log(a[i].name)
        }
        this.setState({
          shelves: shelves,
          status: 'LOADED'
        })
      }, (errordata) => {
        console.log("The read failed: ");}
      )
      }
    
    componentDidMount() {
      this.props.model.addObserver(this)
      this.getShelves();
    }

    handleRemove = (sID, bID) => {
      //console.log("försöker ta bort en bok " + sID + ' ' + bID)
      this.props.model.removeBookFromShelf(sID, bID);
    }

    handleEdit = () => {
      // ??
    }

    update(){
      this.getShelves();
      //this.setState({
        //shelves: this.getShelves()
      //})
      //console.log('före forceupdate yo')
      //this.forceUpdate();
    }

    render(){
      console.log('i render på mylibrari')
      if(this.state.status === 'LOADED'){

      console.log('i mylibrari, shelves är: '+ this.state.shelves);
      let shelfList = null;
      shelfList = this.state.shelves.map((shelf) => {
         console.log("Books are",shelf)
        var bookList = shelf.books.map((book, i) => 
          <div className="collectionBook" key={i}>
            <img className="bookimg" src={book.volumeInfo.imageLinks.thumbnail} alt=''/>
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
            <div className="shelfname">{shelf.name}
              <span className="editbtn glyphicon glyphicon-pencil" onClick = {this.handleEdit}></span>
            </div> 
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
else {
  return 'hej';
}
}
}

export default MyLibrari;
