import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Book extends Component {
    constructor(props){
        super(props);
        
    
        this.state = {
            status: 'INITIAL',
            
        }
    }

    render(){
        console.log(this.props);
        return(<h1> {this.props.params.value.volumeInfo.title}</h1>);
    }
}
export default Book;