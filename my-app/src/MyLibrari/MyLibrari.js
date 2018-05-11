import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import './MyLibrari.css';

//var shelves;
var newShelfname;

class MyLibrari extends Component {

	constructor(props){
		super(props);
		this.props.model.addObserver(this);
		this.handleRemove = this.handleRemove.bind(this)
		this.handleSave = this.handleSave.bind(this)
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
 		}, (errordata) => {
 			console.log("The read failed")
 			;})
 	}


	handleRemove = (sID, bID) => {
		this.props.model.removeBookFromShelf(sID, bID);
	}

	handleRemoveShelf = (sID) => {
		this.props.model.removeShelf(sID);
	}
	
	handleEdit = (sID) => {
		this.setState({
			status: 'EDIT',
			editShelf: sID
		})
	}

	handleInput = (event) => {
		newShelfname = event.target.value;
	}
	handleSave() {
		this.props.model.changeShelfName(this.state.editShelf, newShelfname);
		newShelfname = '';
	}

	update(details) {
		this.setState({
			status: 'INITIAL'
		})
		if (details !== 'user') {
			this.getAllShelves();
		}
	}

	render(){
		let shelfList = null;

		switch (this.state.status) {
			case "INITIAL":
				shelfList = <em><p className="loading">Loading...</p></em>
			break;

			case 'EDIT':
				var shelf = this.props.model.getShelfByID(this.state.shelves, parseInt(this.state.editShelf));
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
						<button onClick = { () => this.handleRemoveShelf(shelf.id)}>Delete shelf</button>
						<div className="collection">
							{bookList}
						</div>
					</div>
				);
			break;

	    case "LOADED":
				if (!(this.state.shelves)){
						shelfList = 'Finns inga hyllor';
				}
				else{
					shelfList = this.state.shelves.map((shelf) => {

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
										<div className="col-md-12"> {book.volumeInfo.title} 
										</div>
									</div>
								</div>);
						}
						return(
							<div className="personalShelf" id={shelf.id} key={shelf.id}>
								<div className="shelfname">{shelf.name}
									<span className="editbtn glyphicon glyphicon-pencil" id={shelf.id} onClick = { () => this.handleEdit(shelf.id)}></span>
								</div> 
								<div className="collection"> {bookList} 
								</div>
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
