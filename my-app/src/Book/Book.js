import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Book.css';
import AddBook from '../AddBook/AddBook'
import placeholder from './../images/placeholder.png'

// This view displays the chosen book, after clicking on it in the Landing view.
// Here, the book can be added to one of the shelves.
class Book extends Component {
    
    constructor(props){
        super(props);

        // Get the selected book's ID from the URL.
        this.state = {
            chosenBook: this.props.model.getBookFromSearchResults(window.location.href.toString().split("book/")[1]),
            status: 'INITIAL'
        }
    }

    componentDidMount(){
        this.checkState();
    }
    
    // Check state of a book. Defualt values are assigned if they are missing.
    checkState(){
        var img= this.state.chosenBook.volumeInfo.imageLinks;
        var title = this.state.chosenBook.volumeInfo.title;
        var subtitle = this.state.chosenBook.volumeInfo.subtitle;
        var authors = this.state.chosenBook.volumeInfo.authors;

        var imgState = img ? img : {thumbnail: placeholder};
        var titleState = title ? title : "Could not find a title for this book";
        var subtitleState = subtitle ? subtitle : "";
        var authorState = authors ? authors : ["Could not find an author for this book"];

        this.setState({
            img: imgState,
            title: titleState,
            subtitle: subtitleState,
            authors: authorState,
            status: 'LOADED'
        })
    }

    render(){
        switch(this.state.status){

            // Initial rendering while data is loading.
            case 'INITIAL':
                return (
                    <div className="bookWindow">
                        <em><p className="loading">Loading...</p></em>
                    </div>
                )
            
            // Renders the book and the AddBook component which handles where
            // the new book should be stored.
            case 'LOADED':
                return(
                    <div className="bookWindow">
                        <div className="windowHeader">
                            <Link to="/">
                                <span id="exitbtn" className="glyphicon glyphicon-remove-circle"></span>
                            </Link>
                        </div>
                        <div className="left">
                            <img className="bookthumb" src={this.state.img.thumbnail} alt=''/>
                        </div>
                        <div className="right">
                            <h2>{this.state.title}</h2>
                            <h3>{this.state.subtitle}</h3>
                            <h4>{this.state.authors[0]}</h4>
                            <AddBook book={this.state.chosenBook} model={this.props.model} />
                        </div>
                    </div>
                );

            // Default rendering in case loading of data failed.
            default: 
                return (
                    <div className="bookWindow">
                        <b>Failed to load data, please try again</b>
                    </div>
                )
        }
    }
}
export default Book;
