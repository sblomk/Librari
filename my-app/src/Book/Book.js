import React, { Component } from 'react';
import { Link } from 'react-router-dom';

var id;

class Book extends Component {
    constructor(props){
        super(props);

        //this.props.model.addObserver(this);
        
        this.state = {
            status: 'INITIAL',
            
        }
    }

    update(){
        var urlType = new URL(window.location.href).toString();
        id = urlType.split("book/")[1]
        console.log("coolt id " + id);
    }

    render(){
        let chosen = this.props.model.getSearch(id)
        console.log(chosen);
        //console.log("i books, id för vald bok är: " + chosen.id);
        return(<h1>{chosen.volumeInfo.title}</h1>);
    }
}
export default Book;