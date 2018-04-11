import React, { Component } from 'react';
import './Search.css';


var filter = '';
class Search extends Component {
    constructor(props){
        super(props);
        
    
        this.state = {
            status: 'INITIAL'
        }
        filter = '';
    }

    handleChange = (event) => {
        console.log(event.target.value);
        filter = event.target.value;
        this.props.model.setFilter(filter);

    }

    render(){
        return(
            <div className="col-md-12 searchbar">
                <input name="filter" type="text" value={this.state.value}  className="searchWindow" id="filter" placeholder="Enter key words" onChange={this.handleChange}/>
            </div>
        )
    }
}
export default Search;