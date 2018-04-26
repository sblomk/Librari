import React, { Component } from 'react';
import logo from './logo.svg';
//import '../App.css';
import './SearchResults.css';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';

//In this view, the books that corresponds to the user's search are displayed

class SearchResults extends Component {
	constructor(props) {
    super(props);

		this.props.model.addObserver(this)
		this.handleClick = this.handleClick.bind(this);

    this.state = {
			status: 'INITIAL'
		}
		this.update();
	}

	// handleClick will save the book object chosen by the user
	handleClick = (event) => {
		this.props.model.setChosen(event.target);
	}

	getBooks = () => {
    this.props.model.getAllBooks().then(books => {
			this.props.model.setSearch(books.items);
      this.setState({
        status: 'LOADED',
        books: books
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
	}

	update = () => {
    // when data is retrieved we update the state
		// this will cause the component to re-render
		this.getBooks();
		//debounce(this.getBooks,500);
  }

	render() {
		let bookList = null;
		// For different cases, we display either a message or the returned books
    switch (this.state.status) {
      case 'INITIAL':
				bookList = <em><p className="loading">Loading<span>.</span><span>.</span><span>.</span></p></em>
        break;
			case 'LOADED':
				for (let i = 0; i < this.state.books.items.length; i++){
					// Checking if there are any books that are missing an image, adding a placeholder img in those cases
					if (this.state.books.items[i].volumeInfo.imageLinks == null) {
						this.state.books.items[i].volumeInfo.imageLinks = {thumbnail: 'https://www.orionbooks.co.uk/assets/img/newsletter_placeholder.jpg'};
					}
				}
				// Each book item gets a link to a more detailed view (the book view)
				bookList = this.state.books.items.map((book) =>
						<Link to={'/book/' + book.id} key={book.id} onClick={this.handleClick}>
							<div className="bookfound" >
								<img className="bookimg" src={book.volumeInfo.imageLinks.thumbnail}/>
								<div id="hej" className="booktitle">{book.volumeInfo.title}</div>
							</div>
						</Link>
        )
        break;
      default:
        bookList = <b>Failed to load data, please try again</b>
        break;
    }
		return (
				<div className="bookresults">
					{bookList}
				</div>
	     );
	}
}
export default SearchResults;
