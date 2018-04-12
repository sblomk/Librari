import React, { Component } from 'react';
import { Link } from 'react-router-dom';

var id;

class Book extends Component {
    constructor(props){
        super(props);

        //this.props.model.addObserver(this);
        
        this.state = {
            status: 'INITIAL',
            id: window.location.href.toString().split("book/")[1]
        }
    }

    render(){
        let chosen = this.props.model.getSearch(this.state.id)
        return(
            <div className="shelf">      
            </div>
            );
    }
}
export default Book;