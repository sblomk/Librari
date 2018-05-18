import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../AddBook.css";

class CreateShelf extends Component {
    
    render(){

        return(
            <div className="CreateShelf">
                <input onChange={this.props.handleChange} placeholder="Create a shelf name" title="Set name of new shelf"/>
                <Link to="/">
                    <button className="addbtn" onClick={this.props.submit} title="Add to new shelf">Create shelf and add book</button>
                </Link>
                <div>Do you want to add the book to an existing shelf?</div>
            </div>
        );
    }
}
export default CreateShelf;
