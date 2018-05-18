import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MyLibrari.css';

class MyLibrari extends Component {

	constructor(props){
		super(props);
		this.handleRemove = this.handleRemove.bind(this);
		this.enableMessage = this.enableMessage.bind(this);
		this.getAllShelves = this.getAllShelves.bind(this);
		this.state = {
			status: 'INITIAL',
			displayMessage: false
		}
		this.timer = setTimeout(this.enableMessage, 2500);
	}

	componentDidMount() {
		this.props.model.addObserver(this);
		this.getAllShelves()
	}
	componentWillUnmount() {
		this.props.model.removeObserver(this);
		clearTimeout(this.timer);
	}
	 
 	getAllShelves() {
 		this.props.model.getShelves((shelves) => {
			if (shelves === 'error'){
				this.setState({
					status: 'ERROR'
				})
			}
			else{
				this.setState({
					shelves: shelves,
					status: 'LOADED'
				})
			}
 		})
 	}

	enableMessage() {
		this.setState({
			displayMessage: true
		});
	}

	handleRemove = (sID, bID) => {
		this.props.model.removeBookFromShelf(sID, bID);
	}

	update(details) {
		this.getAllShelves()
	}

	render(){
		let shelfList = null;
		const {displayMessage} = this.state;

		switch (this.state.status) {
			case "INITIAL":
				shelfList = <em><p className="loading">Loading...</p></em>
			break;

	    	case "LOADED":
				if (!(this.state.shelves)){
					shelfList = <p className="noShelves">You have not created any shelves yet. Go to Search to explore books and create shelves.</p>;
				}
				else{
					let bookList;
					shelfList = this.state.shelves.map((shelf) => {

						if (shelf.books === undefined){
							bookList = <p className="noBooks">There are no books in this shelf</p>;
						}
						else{
							bookList = shelf.books.map((book, i) => 
								<div className="collectionBook" key={i}>
									<img className="bookimg" src={book.volumeInfo.imageLinks.thumbnail} alt=''/>
									<div className="booktitle">
										<div className="removediv">
											<span title="Remove book from shelf" className="removebtn glyphicon glyphicon-remove-circle" onClick = { () =>this.handleRemove(shelf.id, book.id)}></span>
										</div>
										<div className="col-md-12"> {book.volumeInfo.title} 
										</div>
									</div>
								</div>);
						}
						return(
							<div className="personalShelf" id={shelf.id} key={shelf.id}>
								<div className="shelfName">
									{shelf.name}
									<Link to={'/edit_shelf/' + shelf.id}>
										<span className="editbtn glyphicon glyphicon-pencil" id={shelf.id} title="Edit shelf"></span>
									</Link>
								</div> 
								<div className="collection"> 
									{bookList} 
								</div>
							</div>
						);
					});
				}
			break;
			default:
				if (!displayMessage){
					return shelfList = <em><p className="loading">Loading...</p></em>
				}
				shelfList = <b>Failed to load data, please try again</b>
			break;
		};
		return ( <div className="myLibrari"> {shelfList} </div> );
	}
}
export default MyLibrari;
