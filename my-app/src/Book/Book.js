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
            chosenBook: this.props.model.getBookFromSearchResults(window.location.href.toString().split("book/")[1]),
            status: 'INITIAL'
        }
    }
    componentDidMount(){
        this.checkState();
    }
    
    checkState(){
        var img= this.state.chosenBook.volumeInfo.imageLinks;
        var title = this.state.chosenBook.volumeInfo.title;
        var subtitle = this.state.chosenBook.volumeInfo.subtitle;
        var authors = this.state.chosenBook.volumeInfo.authors;

        var imgState = img ? img : {thumbnail: 'https://www.orionbooks.co.uk/assets/img/newsletter_placeholder.jpg'};
        var titleState = title ? title : "Could not find a title for this book";
        var subtitleState = subtitle ? subtitle : "Could not find a subtitle for this book";
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
            case 'INITIAL':
                return (
                    <div className="bookWindow">
                        <em><p className="loading">Loading...</p></em>
                    </div>
                )
                
            case 'LOADED':
                return(
                    // displaying information about the book, as well as the option of shelves
                    <div className="bookWindow">
                        <div className="windowHeader">
                            <Link to="/">
                                <span id="exitbtn" className="glyphicon glyphicon-remove-circle"></span>
                            </Link>
                        </div>
                        <div className="left">
                            <img src={this.state.img.thumbnail} alt=''/>
                        </div>
                        <div className="right">
                            <h2>{this.state.title}</h2>
                            <h3>{this.state.subtitle}</h3>
                            <h4>{this.state.authors[0]}</h4>
                            <AddBook book={this.state.chosenBook} model={this.props.model} />
                        </div>
                    </div>
                );
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
