import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Book.css';
import AddBook from '../AddBook/AddBook'

// This view displays the chosen book, after clicking on it in the Landing view.
// Here, the book can be added to one of the shelves.


class Book extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            chosenBook: this.props.model.getBookFromSearchResults(window.location.href.toString().split("book/")[1])
        }
    }

    render(){
        let shelfList = null;

        switch (this.state.status) {

            case "INITIAL":
                shelfList = <option value="loading"key="loading">Loading...</option>

                let volInfo = this.state.chosenBook.volumeInfo;
        
                if (volInfo.imageLinks === undefined) {
                    this.state.chosenBook.volumeInfo.imageLinks = {thumbnail: 'https://www.orionbooks.co.uk/assets/img/newsletter_placeholder.jpg'}
                }
                if (volInfo.title === undefined) {
                    this.state.chosenBook.volumeInfo.title = "Could not find a title for this book"
                }
                if (volInfo.subtitle === undefined) {
                    this.state.chosenBook.volumeInfo.subtitle = "Could not find a subtitle for this book"
                }
                if (volInfo.authors === undefined) {
                    this.state.chosenBook.volumeInfo.authors = ["Could not find a author for this book"]
                }

                break;

            case "LOADED":
                console.log('i book loaded, shelves är '+this.state.shelves);
                if(!(this.state.shelves)){
                    shelfList = <option value="error" key="error">You need to create a new shelf</option>
                }
                else{
                console.log('***'+this.state.shelves)
                console.log(this.state.shelves)
                shelfList = this.state.shelves.map((shelf) => 
                    <option value={shelf.id} key={shelf.id}>
                        {shelf.name}
                    </option>
                );

                break;
                
                }

            };
        //console.log(this.state.activeShelf)

        return(
            // displaying information about the book, as well as the option of shelves
            <div className="bookWindow">
                <div className="windowHeader">
                    <Link to="/">
                        <span className="glyphicon glyphicon-remove-circle"></span>
                    </Link>
                 </div>
                <div className="left">
                    <img src={this.state.chosenBook.volumeInfo.imageLinks.thumbnail} alt=''/>
                </div>
                <div className="right">
                    <h1>{this.state.chosenBook.volumeInfo.title}</h1>
                    <h2>{this.state.chosenBook.volumeInfo.subtitle}</h2>
                    <h3>{this.state.chosenBook.volumeInfo.authors[0]}</h3>
                    <AddBook book={this.state.chosenBook} model={this.props.model} />
                </div>
            </div>
        );
    }
}
export default Book;
