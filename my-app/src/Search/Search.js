import React, { Component } from 'react';
import './Search.css';

// This view contains the search bar

var filter = '';
class Search extends Component {
    constructor(props){
        super(props);

        this.state = {
            status: 'INITIAL'
        }
        filter = '';
    }

    // on change, this handler will update the search string set by the user
    handleChange = (event) => {
        console.log(event.target.value);
        filter = event.target.value;
        this.props.model.setFilter(filter);
    }

    render(){
        return(
            <div className="searchbar">
                <input name="filter" type="text" value={this.state.value} className="searchWindow" id="filter" placeholder="Enter key words to search for books..." onChange={this.handleChange}/>
            </div>
        )
    }
}
export default Search;
