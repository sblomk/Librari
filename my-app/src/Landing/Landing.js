import React, { Component } from 'react';
import logo from './logo.svg';
import '../App.css';

class Landing extends Component {
	constructor(props) {
    super(props);

    //this.props.model.addObserver(this)
    this.state = {
			status: 'INITIAL'
		}
		this.update();
	}
	
	update = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render

    console.log("hallå" + this.status);
    this.props.model.getAllBooks().then(books => {
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
          <div key={book.id}><img src={book.volumeInfo.imageLinks.thumbnail}/>
          <h3>{book.volumeInfo.title}</h3></div>
        )
        break;
      default:
        bookList = <b>Failed to load data, please try again</b>
        break;
    }
		return (
				<div>
					{bookList}
				</div>
	     );
	}
}
export default Landing;