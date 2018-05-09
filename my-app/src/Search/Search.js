import React, { Component } from 'react';
import './Search.css';

// This view contains the search bar

class Search extends Component {

    render(){
        return(
            <div className="searchbar">
                <input name="filter" type="text" onChange={this.props.handleChange} className="searchWindow" id='' placeholder="Enter key words to search for books..."/>
            </div>
        )
    }
}
export default Search;
