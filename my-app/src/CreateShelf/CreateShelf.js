import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreateShelf extends Component {
    
    render(){

        return(
            <div className="CreateShelf">
                <input onChange={this.props.handleChange} placeholder="Create new shelf"/>
                <button onClick={this.props.submit}>Create and add</button>
                <div>Do you want to add the book to an existing shelf?</div>
            </div>
        );
    }
}
export default CreateShelf;
