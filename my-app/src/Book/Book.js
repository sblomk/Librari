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
        console.log(chosen + "chosen")
        return(
            <div className="book row">
                <div className="col-sm-6 col-lg-6 bookImage"></div>
                    <img src={chosen.volumeInfo.imageLinks.thumbnail}/>
                <div className="col-sm-6 col-lg-6 bookInformation">
                    <h1>{chosen.volumeInfo.title}</h1>
                    <h2>{chosen.volumeInfo.subtitle}</h2>
                    <h3>{chosen.volumeInfo.authors[0]}</h3>
                    <button>Add to MyLibrari</button>
                </div>
                
            </div>
            );
    }
}
export default Book;