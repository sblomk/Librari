import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Book.css';

var id;

class Book extends Component {
    constructor(props){
        super(props);

        //this.props.model.addObserver(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.getShelfId = this.getShelfId.bind(this)
        
        this.state = {
            status: 'INITIAL',
            id: window.location.href.toString().split("book/")[1]  
        }
    }

    handleDropdownChange(e) {
        this.setState({ 
            activeShelf: e.target.value
        }, this.update)
    }

    handleInputChange(e) {
        this.setState({
            newShelfName: e.target.value
        }, this.update)
    }

    getShelfId(){
        if(this.state.activeShelf!=null){
            return parseInt(this.state.activeShelf)
        } else {
            let shelfId = this.props.model.createShelfId()
            this.props.model.createShelf(shelfId, this.state.newShelfName)
            return shelfId
        }
    }

    /*
    update(){
        var urlType = new URL(window.location.href).toString();
        id = urlType.split("book/")[1]
        console.log("coolt id " + id);
    }
    */

    render(){
        let chosen = this.props.model.getSearch(this.state.id);
        let shelves = this.props.model.getShelves();
        let shelfList = shelves.map((shelf) => 
            <option value={shelf.id} key={shelf.id}>
                {shelf.name}
            </option>
            
        )
        console.log(this.state.activeShelf)
        return(
            <div className="book row">
                <div className="col-sm-6 col-lg-6 bookImage">
                    <img src={chosen.volumeInfo.imageLinks.thumbnail}/>
                </div>
                <div className="col-sm-6 col-lg-6 bookInformation">
                    <h1>{chosen.volumeInfo.title}</h1>
                    <h2>{chosen.volumeInfo.subtitle}</h2>
                    <h3>{chosen.volumeInfo.authors[0]}</h3>
                    <select onChange={this.handleDropdownChange} id="choiceOfLibrary">
                        <option value="">Select a shelf</option>
                        {shelfList}
                        </select>
                        <input onChange={this.handleInputChange} placeholder="Create new shelf"/>
                    <button onClick={() => this.props.model.addToShelf(this.getShelfId(), chosen.id)}>Add to shelf</button>
                </div>
            </div>
            );
    }
}
export default Book;