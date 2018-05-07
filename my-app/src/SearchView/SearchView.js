import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import './SearchView.css';
import '../Book/Book.css'
import Search from '../Search/Search';
import SearchResults from '../SearchResults/SearchResults';
import Book from '../Book/Book'
import { Link } from 'react-router-dom';

class SearchView extends Component {

	constructor(props){
		super(props);

		this.handleChange = this.handleChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.handleClose = this.handleClose.bind(this)

		this.state = ({
			searchResults: this.props.model.getSearchResults(),
			status: 'INITIAL'
		})
	}

	componentDidMount() {
    	this.props.model.addObserver(this)
    	this.getBooks()
 	}

 	// on change, this handler will update the search string set by the user
  	handleChange(event) {
  	    let filter = event.target.value;
  	    this.props.model.setFilter(filter);
  	}

  	//When clicking on book
  	handleClick(event) {
  		console.log(event.target.id + "activeBookId")
  		console.log(document.getElementById('bookWindow').style.display + "display innan")
		//this.props.model.setChosen(event.target)
		this.setState({
			activeBookId: event.target.id
		})
		document.getElementById('bookWindow').style.display = "block";
		console.log(document.getElementById('bookWindow').style.display + "display efter")
	}

	handleClose(event) {
		this.setState({
			activeBookId: ''
		})
		document.getElementById('bookWindow').style.display = "none";
		document.getElementById('bajs').style.display ="none"
		document.getElementById('bajs2').style.display ="none"
	}
 
	getBooks() {
	    this.props.model.getAllBooks().then(books => {
			this.props.model.setSearch(books.items);
	      	this.setState({
	        	status: 'LOADED',
	        	searchResults: books
	     	})
	    }).catch(() => {
	      	this.setState({
	        	status: 'ERROR'
	      })
	    })
	}

	update(){
		this.getBooks()
	}

 	render() {

 		let bookList = null;
		// For different cases, we display either a message or the returned books
	    switch (this.state.status) {
	      	case 'INITIAL':
				bookList = <em><p className="loading">Loading...</p></em>
	        	break;
			case 'LOADED':
				for (let i = 0; i < this.state.searchResults.items.length; i++){
					// Checking if there are any books that are missing an image, adding a placeholder img in those cases
					if (this.state.searchResults.items[i].volumeInfo.imageLinks == null) {
							this.state.searchResults.items[i].volumeInfo.imageLinks = {thumbnail: 'https://www.orionbooks.co.uk/assets/img/newsletter_placeholder.jpg'};
					}
				}
				// Each book item gets a link to a more detailed view (the book view)
				bookList = this.state.searchResults.items.map((book, i) =>

					<div className="bookfound" key={i}>
						<img className="bookimg" src={book.volumeInfo.imageLinks.thumbnail} alt=''/>
						<div className="booktitle" id={book.id} onClick={this.handleClick}>{book.volumeInfo.title}</div>
					</div>

	        	)
	        	break;
	      	default:
	        	bookList = <b>Failed to load data, please try again</b>
	        break;
	    }

	    return (
	      <div className="SearchView">
	        <Search model={this.props.model} handleChange={this.handleChange} filter={this.state.filter}/>
	        <Book model={this.props.model} activeBookId={this.state.activeBookId} handleClose={this.handleClose}/>
	        <SearchResults results={bookList}/>
	   
	      </div>

	    );
  	}
}

export default SearchView;
