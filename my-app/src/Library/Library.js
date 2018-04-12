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

    /*
    update(){
        var urlType = new URL(window.location.href).toString();
        id = urlType.split("book/")[1]
        console.log("coolt id " + id);
    }
    */

    render(){
        let chosen = this.props.model.getSearch(this.state.id)
        return(
            <div className="library">
            </div>
            );
    }
}
export default Book;