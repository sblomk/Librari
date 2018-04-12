import React, { Component } from 'react';
import logo from './logo.svg';
//import '../App.css';
import './Landing.css';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';

class Landing extends Component {
	constructor(props) {
    super(props);

		this.props.model.addObserver(this)
		this.handleClick = this.handleClick.bind(this);
		
    this.state = {
			status: 'INITIAL'
		}
		this.update();
	}
	handleClick = (event) => {
		//console.log('!!!!!!!!!!' + event.target);
		this.props.model.setChosen(event.target);
	}

	getBooks = () => {
		//console.log("hallååååå" + this.status);
    this.props.model.getAllBooks().then(books => {
			//console.log(books.items);
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
		//console.log("i update")
		this.getBooks();
		//debounce(this.getBooks,500);


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
				for (let i = 0; i < this.state.books.items.length; i++){
				//	console.log(this.state.books.items[i].volumeInfo.imageLinks)
					if (this.state.books.items[i].volumeInfo.imageLinks == null) {
						this.state.books.items[i].volumeInfo.imageLinks = {thumbnail: 'https://www.orionbooks.co.uk/assets/img/newsletter_placeholder.jpg'};
					}
				}
				bookList = this.state.books.items.map((book) => 
						<Link to={'/book/' + book.id} key={book.id} onClick={this.handleClick}>
							<div className="bookfound col-md-1.5 col-lg-1.5" >
								<img className="bookimg" src={book.volumeInfo.imageLinks.thumbnail}/>
								<div className="booktitle">{book.volumeInfo.title}</div>
							</div>
						</Link>
        )
        break;
      default:
        bookList = <b>Failed to load data, please try again</b>
        break;
    }
		return (
				<div className="bookresults row" >
					{bookList}
				</div>
	     );
	}
}
export default Landing;
