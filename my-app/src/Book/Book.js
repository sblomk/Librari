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
        //console.log(this.state.id);
        let chosen = this.props.model.getSearch(this.state.id)
        //console.log(chosen);
        //console.log("i books, id för vald bok är: " + chosen.id);
        return(<h1>{chosen.volumeInfo.title}</h1>);
    }
}
export default Book;