import React, { Component } from 'react';
import logo from './logo.svg';
//import '../App.css';
import './Landing.css';
import { debounce } from 'lodash';

class Landing extends Component {
	constructor(props) {
    super(props);

		this.props.model.addObserver(this)
		
    this.state = {
			status: 'INITIAL'
		}
		this.update();
	}

	getBooks = () => {
		console.log("hallååååå" + this.status);
    this.props.model.getAllBooks().then(books => {
			console.log(books);
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
		console.log("i update")
		this.getBooks();
		//debounce(this.getBooks,500);
		console.log('sho')


  }

	render() {
		let bookList = null;
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case 'INITIAL':
				bookList = <em><p className="loading">Loading<span>.</span><span>.</span><span>.</span></p></em>
        break;
      case 'LOADED':
				bookList = this.state.books.items.map((book) => 
					//if(book.volumeInfo.imageLinks.thumbnail)
						<div className="bookfound col-md-1"key={book.id}><img className="bookimg" src="https://ia.media-imdb.com/images/M/MV5BMGMxMmRkNzctMWQzYy00MTY3LWEzMDAtMzEzMDhkZWI4MjZlXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SY1000_CR0,0,703,1000_AL_.jpg"/>
						<h3 className="booktitle">{book.volumeInfo.title}</h3></div>
        )
        break;
      default:
        bookList = <b>Failed to load data, please try again</b>
        break;
    }
		return (
				<div className="bookresults row">
					{bookList}
				</div>
	     );
	}
}
export default Landing;
