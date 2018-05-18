import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MyLibrari.css';
import placeholder from './../images/placeholder.png';


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
		// error message is enabled after 2500 ms
		this.timer = setTimeout(this.enableMessage, 2500);
	}

	componentDidMount() {
		this.props.model.addObserver(this);
		this.getAllShelves();
	}
	componentWillUnmount() {
		this.props.model.removeObserver(this);
		clearTimeout(this.timer);
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

	handleRemove = (shelfID, bookID) => {
		this.props.model.removeBookFromShelf(shelfID, bookID);
	}

	update() {
		this.getAllShelves();
	}

	render(){
		let shelfList = null;
		const {displayMessage} = this.state;

		// If the user is not logged in, a message is shown.
		// The message is delayed to avoid it showing after a refresh of the page, when one is actually logged in.
		if (this.props.model.getUserStatus() === 'LoggedOut'){
            if (!displayMessage){
                return shelfList = <em><p className="loading">Loading...</p></em>
            }
            return shelfList = <p className='loginmsg'>Please log in to use the full features of Librari!</p>
		}

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
							bookList = shelf.books.map((book, i) => {
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
									<div className="booktitle">
										<div className="removediv">
											<span title="Remove book from shelf" className="removebtn glyphicon glyphicon-remove-circle" onClick = { () =>this.handleRemove(shelf.id, book.id)}></span>
										</div>
										<div> 
											{book.volumeInfo.title} 
										</div>
									</div>
								</div>)});
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
				// delayed message to avoid it from showing a moment before established connection,
				// but still showing when actually disconnected
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
