import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import './MyLibrari.css';

//var shelves;
var shelfname;

class MyLibrari extends Component {
    constructor(props){
        super(props);

        //this.props.model.addObserver(this);
        this.handleRemove = this.handleRemove.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleSave = this.handleSave.bind(this)

        this.state = {
            status: 'INITIAL',
            shelves: this.props.model.getShelves(),
            editShelf: '',
        }
    }

    componentDidMount() {
      this.props.model.addObserver(this)
      //var title = document.getElementById('booktitle');
      //console.log(title+'!!!');
    }


    handleRemove = (sID, bID) => {
      //console.log("försöker ta bort en bok " + sID + ' ' + bID)
      this.props.model.removeBookFromShelf(sID, bID);
    }
    handleInput = (event) => {
      shelfname = event.target.value;
      console.log(shelfname);
    }

    handleSave = (event) => {
      for (let i = 0; i < this.state.shelves.length; i++){
        if (this.state.shelves[i].id == this.state.editShelf) {
          console.log('name: ' + this.state.shelves[i].name);
          this.state.shelves[i] = {name: shelfname}
          console.log('name: ' + this.state.shelves[i].name);
        }
      }

      this.setState({
          //shelves: {name: shelfname},
          status: 'INITIAL'
        })
        console.log(this.state.status);
    }
    
    handleEdit = (event) => {
      console.log(event.target.id)
      this.setState({
        status: 'EDIT',
        editShelf: event.target.id
      })
      console.log(this.state.status);
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
      console.log('status är: '+this.state.status)
      console.log('id är: '+this.state.editShelf)

      switch(this.state.status){
        case 'EDIT':
        var shelf = this.props.model.getShelfByID(parseInt(this.state.editShelf));
          var bookList = shelf.books.map((book, i) => 
            <div className="collectionBook" key={i}>
              <img className="bookimg" src={book.volumeInfo.imageLinks.thumbnail} alt=''/>
              <div className="booktitle" id="booktitle" ref="title">
                <div>
                    <span className="removebtn glyphicon glyphicon-remove-circle" onClick = { () =>this.handleRemove(shelf.id, book.id)}></span>
                  </div>
                  <div className="col-md-12">
                    {book.volumeInfo.title}
                  </div>
              </div>
            </div>)
  
          return(
            <div className="personalShelf" id={shelf.id} key={shelf.id}>
              <input id="inputChange" onChange={this.handleInput} type="text" placeholder={shelf.name}/>
              <button onClick={this.handleSave}>Save</button>
              <div className="collection">
                {bookList}
              </div>
            </div>
          );
        
        break;

        case 'INITIAL':
        shelfList = this.state.shelves.map((shelf) => {
          var bookList = shelf.books.map((book, i) => 
            <div className="collectionBook" key={i}>
              <img className="bookimg" src={book.volumeInfo.imageLinks.thumbnail} alt=''/>
              <div className="booktitle" id="booktitle" ref="title">
                <div>
                  <span className="removebtn glyphicon glyphicon-remove-circle" onClick = { () =>this.handleRemove(shelf.id, book.id)}></span>
                </div>
                <div className="col-md-12">
                  {book.volumeInfo.title}
                </div>
              </div>
            </div>)
  
          return(
            <div className="personalShelf" id={shelf.id} key={shelf.id}>
              <div className="shelfname">{shelf.name}
                <span id={shelf.id} className="editbtn glyphicon glyphicon-pencil" onClick ={this.handleEdit}></span>
              </div> 
              <div className="collection">
                {bookList}
              </div>
            </div>
          );
        })

        break;
      }
      

      return (
        <div className="myLibrari">
          {shelfList}
        </div>

      );
}
}
export default MyLibrari;
