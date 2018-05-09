import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Book.css';

// This view displays the chosen book, after clicking on it in the Landing view.
// Here, the book can be added to one of the shelves.


class Book extends Component {
    
    constructor(props){
        super(props);

        //this.props.model.addObserver(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.getAllShelves = this.getAllShelves.bind(this);
        this.submitBook = this.submitBook.bind(this)

        this.state = {
            status: 'INITIAL',
            id: window.location.href.toString().split("book/")[1],  // Fetching the id from the URL
            //shelves: this.getAllShelves(),
            chosenBook: this.props.model.getBookFromSearchResults(
                window.location.href.toString().split("book/")[1])
        }
    }

    componentDidMount() {
        //this.props.model.addObserver(this)
        this.getAllShelves()
      }

    getAllShelves() {
        this.props.model.getShelves((shelves) => {
            this.setState({
                shelves: shelves,
                status: 'LOADED'
            })

        }, (errordata) => {
            console.log("The read failed: ")
            ;})
    }
    update() {
      this.setState({
        shelves: this.getAllShelves()
      })
    }
    // handler listening to what shelf is chosen in the dropdown menu
    handleDropdownChange(e) {
        this.setState({
            activeShelf: e.target.value
        })
    }

    // handler for creating new shelves
    handleInputChange(e) {
        this.setState({
            newShelfName: e.target.value
        })
    }

    // returns a shelf id, and creates an id in the case that there is none
    submitBook(){
        if (this.state.activeShelf != null){
            this.props.model.addToShelf(
                parseInt(this.state.activeShelf),
                this.state.chosenBook); 

        } else {
            this.props.model.createNewShelfAndAddBook(
                this.state.newShelfName,
                this.state.chosenBook);

        }
    }


    render(){
        let shelfList = null;


        switch (this.state.status) {

            case "INITIAL":
                shelfList = <option value="loading"key="loading">Loading...</option>
                break;

            case "LOADED":
                console.log(this.state.shelves);
                if( this.state.shelves[0] === null ){
                    shelfList = <option value="error" key="error">You need to create a new shelf</option>
                }
                else{
                console.log('***'+this.state.shelves)
                console.log(this.state.shelves)
                shelfList = this.state.shelves.map((shelf) => 
                    //arr.push(shelf);
                    <option value={shelf.id} key={shelf.id}>
                        {shelf.name}
                    </option>
                );
        // checking if the chosen book is missing the thumbnail, and in that case adding a placeholder image
                if (this.state.chosenBook.volumeInfo.imageLinks == null) {
                    this.state.chosenBook.volumeInfo.imageLinks = {thumbnail: 'https://www.orionbooks.co.uk/assets/img/newsletter_placeholder.jpg'};
                    }
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
                            <select onChange={this.handleDropdownChange} id="choiceOfLibrary">
                                <option value="">Select a shelf</option>
                                {shelfList}
                                </select>
                                <input onChange={this.handleInputChange} placeholder="Create new shelf"/>
                            <button onClick={this.submitBook}>Add to shelf</button>
                        </div>
                    </div>
                    );
    }
}
export default Book;
