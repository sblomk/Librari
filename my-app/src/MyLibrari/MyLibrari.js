import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import './MyLibrari.css';

//var shelves;
var shelfname;

class MyLibrari extends Component {

	constructor(props){
		super(props);
		this.handleRemove = this.handleRemove.bind(this)
		this.getAllShelves = this.getAllShelves.bind(this);
		this.state = {
			status: 'INITIAL'
		}
	}

	componentDidMount() {
    	this.getAllShelves()
 	}

 	getAllShelves() {
 		this.props.model.getShelves((shelves) => {
 			this.setState({
 				shelves: shelves,
 				status: 'LOADED'
 			})
 			console.log(this.state.shelves + "hyllor i MyLibrari.js");
 		}, (errordata) => {
 			console.log("The read failed: ")
 			;})
 	}


	handleRemove = (sID, bID) => {
		var shelves = this.props.model.removeBookFromShelf(sID, bID);
		this.setState({
			shelves: shelves
		})
		this.getAllShelves()
	}

	handleEdit = () => {
	// ??
	}

	render(){

		let shelfList = null;

		switch (this.state.status) {

			case "INITIAL":
				shelfList = <em><p className="loading">Loading...</p></em>
	        	break;

	        case "LOADED":
		        console.log((this.state.shelves))
   				if (!(this.state.shelves)){
            		console.log('inga hyllor')
           		shelfList = 'Finns inga hyllor';
       			}
       			else{
	        	console.log(this.state.shelves)
				shelfList = this.state.shelves.map((shelf) => {

					//console.log(shelf);
					//console.log(shelf[0].books);
					if (shelf.books === undefined){
						var booklist = "There are no books in this shelf";
					}
					else{
					var bookList = shelf.books.map((book, i) => 
						<div className="collectionBook" key={i}>
						<img className="bookimg" src={book.volumeInfo.imageLinks.thumbnail} alt=''/>
						<div className="booktitle">
						<div className="col-md-1">
							<span className="removebtn glyphicon glyphicon-remove-circle" onClick = { () =>this.handleRemove(shelf.id, book.id)}></span>
						</div>
						<div className="col-md-12"> {book.volumeInfo.title} </div>
						</div>
						</div>);
					}
					return(

						<div className="personalShelf" id={shelf.id} key={shelf.id}>
						<div className="shelfname">{shelf.name}
						<span className="editbtn glyphicon glyphicon-pencil" onClick = {this.handleEdit}></span>
						</div> 
						<div className="collection"> {bookList} </div>
						</div>
					);
				});
			}
				break;
		};

		return ( <div className="myLibrari"> {shelfList} </div> );
	}
}
export default MyLibrari;
