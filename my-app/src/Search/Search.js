import React, { Component } from 'react';


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
            <div className = "col-md-12">
            <input name="filter" type="text" value={this.state.value}  id="filter" placeholder="Enter key words" onChange={this.handleChange}/>
            </div>
        )
    }
}
export default Search;