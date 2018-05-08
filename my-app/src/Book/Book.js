import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Book.css';

// This view displays the chosen book, after clicking on it in the Landing view.
// Here, the book can be added to one of the shelves.

var newShelf;
class Book extends Component {
    constructor(props){
        super(props);

        //this.props.model.addObserver(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.getShelfId = this.getShelfId.bind(this)

        this.state = {
            status: 'INITIAL',
            id: window.location.href.toString().split("book/")[1],  // Fetching the id from the URL
            shelves: this.getShelves()
        }
    }
    componentDidMount() {
        this.props.model.addObserver(this)
      }

    getShelves() {
    this.props.model.getShelves((shelves) => {
        console.log(shelves + '!!!!!!!!!!!!!!!!!!')
        this.setState({
        shelves: shelves,
        status: 'LOADED'
        })
    }, (errordata) => {
        console.log("The read failed: ");}
    )
    }
    update() {
       this.getShelves()
    }
    // handler listening to what shelf is chosen in the dropdown menu
    handleDropdownChange(e) {
        this.setState({
            activeShelf: e.target.value
        }, this.update)
    }

    // handler for creating new shelves
    handleInputChange(e) {
        newShelf = e.target.value;
        /*this.setState({
            newShelfName: e.target.value
        }, this.update)*/
    }

    // returns a shelf id, and creates an id in the case that there is none
    getShelfId(){
        if(this.state.activeShelf!=null){
            // 8 är radix, blev ett error utan, inte helt hundra på användningen
            return parseInt(this.state.activeShelf)//, 8)
        } else {
            // ändra createSHelf så att den creatar ID också, gör bara ett anrop, skriv en callback eller ändra status här
            let shelfId = this.props.model.createShelfId()
            this.props.model.createShelf(shelfId, newShelf)
            return shelfId
        }
    }


    render(){
        console.log("i book");
        switch (this.state.status){
            case 'LOADED':
                let chosenBook = this.props.model.getSearch(this.state.id);
                //let shelves = this.props.model.getShelves();
                // for each shelf, display the value of shelf.name as the option in the dropdown menu
                //console.log(this.state.shelves[0].name)
                let shelfList = this.state.shelves.map((shelf) =>
                    <option value={shelf.id} key={shelf.id}>
                        {shelf.name}
                    </option>
        
                )
                // checking if the chosen book is missing the thumbnail, and in that case adding a placeholder image
                if (chosenBook.volumeInfo.imageLinks == null) {
                    chosenBook.volumeInfo.imageLinks = {thumbnail: 'https://www.orionbooks.co.uk/assets/img/newsletter_placeholder.jpg'};
                }
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
                            <img src={chosenBook.volumeInfo.imageLinks.thumbnail} alt=''/>
                        </div>
                        <div className="right">
                            <h1>{chosenBook.volumeInfo.title}</h1>
                            <h2>{chosenBook.volumeInfo.subtitle}</h2>
                            <h3>{chosenBook.volumeInfo.authors[0]}</h3>
                            <select onChange={this.handleDropdownChange} id="choiceOfLibrary">
                                <option value="">Select a shelf</option>
                                {shelfList}
                                </select>
                                <input onChange={this.handleInputChange} placeholder="Create new shelf"/>
                            <button onClick={() => this.props.model.addToShelf(this.getShelfId(), chosenBook.id)}>Add to shelf</button>
                        </div>
                    </div>
                    );

                default: return 'hej'

        }
        

    }
}
export default Book;
