import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './EditShelf.css';
import placeholder from './../../images/placeholder.png';
import '../MyLibrari.css';

var newShelfname;

class EditShelf extends Component {

	constructor(props){
		super(props);
		this.handleRemove = this.handleRemove.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.getAllShelves = this.getAllShelves.bind(this);
		this.state = {
			status: 'INITIAL',
			id: window.location.href.toString().split("edit_shelf/")[1],
		}
	}

	componentDidMount() {
		this.props.model.addObserver(this);
		this.getAllShelves()
	 }

	componentWillUnmount() {
		this.props.model.removeObserver(this)
	  }
	
	// Getting all shelves from the database, setting the state to loaded if it is not an error
 	getAllShelves() {
 		this.props.model.getShelves((shelves) => {
			if (shelves === 'error'){
				this.setState({
					status: 'ERROR'
				})
			}
			else{
				// Shelf is the actual book object which we get with the book id
				var shelf = this.props.model.getShelfByID(shelves, parseInt(this.state.id, 10));
				this.setState({
					shelf: shelf,
					status: 'LOADED'
				})
			}
 		})
	}

	handleRemove = (shelfID, bookID) => {
		this.props.model.removeBookFromShelf(shelfID, bookID);
	}

	handleRemoveShelf = (shelfID) => {
		this.props.model.removeShelf(shelfID);
	}

	handleInput = (event) => {
		newShelfname = event.target.value;
	}
	handleSave() {
		this.props.model.changeShelfName(this.state.id, newShelfname);
		newShelfname = '';
	}

	update() {
		this.setState({
			status: 'INITIAL'
		})
		this.getAllShelves();
	}

	render(){
		let shelf = null;

		switch (this.state.status) {
			case "INITIAL":
				shelf = <em><p className="loading">Loading...</p></em>
			break;

			case 'LOADED':
				var bookList;
				if (this.state.shelf.books){
					bookList = this.state.shelf.books.map((book, i) => {
						//Checking the image attribute of each book and replaces it 
						// with a placeholder img if there is no thumbnail
						var img;
						if (!(book.volumeInfo.imageLinks)){
							img = <img className="bookimg" src={placeholder} alt=''/>;
						}
						else {
							img = <img className="bookimg" src={book.volumeInfo.imageLinks.thumbnail} alt=''/>;
						}

						return(
							<div className="collectionBook" key={i}>
								{img}
								<div className="booktitle" id="booktitle" ref="title">
									<div>
										<span title="Remove book from shelf" className="removebtn glyphicon glyphicon-remove-circle" onClick = { () =>this.handleRemove(this.state.shelf.id, book.id)}></span>
									</div>
									<div>
										{book.volumeInfo.title}
									</div>
								</div>
							</div>)})
				}												
				else{
					bookList = <p className="noBooks">There are no books in this shelf</p>;
				}

				return(
					<div className="personalShelf" id={this.state.shelf.id} key={this.state.shelf.id}>
						<div className="input">
							<input id="inputChange" onChange={this.handleInput} type="text" placeholder={this.state.shelf.name}/>
							<Link to="/profile">
								<button className='savebtn' onClick={this.handleSave}><span className="glyphicon glyphicon-ok"></span> Save</button>
							</Link>
						</div>
						<div className="collection">
							{bookList}
						</div>
						<Link to="/profile">
							<button className='trashbtn' onClick = { () => this.handleRemoveShelf(this.state.shelf.id)}><span className="glyphicon glyphicon-trash"></span> Delete shelf</button>
						</Link>
					</div>
				);

			default:
				shelf = <b>Failed to load data, please try again</b>
			break;
		};
		return ( <div className="editShelf"> {shelf} </div> );
	}
}
export default EditShelf;
