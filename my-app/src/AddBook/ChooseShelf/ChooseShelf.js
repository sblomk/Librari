import React, { Component } from 'react';
import "../AddBook.css";
import { Link } from 'react-router-dom';

class ChooseShelf extends Component {

    render(){
        let shelfList;
        let btn;
           
        //If feature is set to ChooseSelf in parent component AddBook.js and the
        //user has previously saved shelves
        if(this.props.shelves != null){
            shelfList = this.props.shelves.map((shelf) => 
                <option value={shelf.id} key={shelf.id}>
                {shelf.name}
                </option>
        )}
        //Else if the user has no previously saved shelves
        else{
            shelfList = <option value="">You don\'t have any shelves</option>
        }
        //If the user has selected a shelf in the dropdown menu of AddBook.js
        if (this.props.activeShelf){
            btn = <button id="addbtn" className="addbtn" title="Add to shelf" onClick={this.props.submit}>Add</button>
        }
        //Else do not enable the button
        else{
            btn = <button id="addbtn" className="addbtn" disabled title="You need to select a shelf!" onClick={this.props.submit}>Add</button>
        }
        
        return(
            <div className="ChooseShelf">
                <select onChange={this.props.handleChange} id="choiceOfLibrary" title="Select an existing shelf to add book to">
                    <option value="">Select a shelf</option>
                    {shelfList}
                </select>
                <Link to="/">
                    {btn}
                </Link>
                <div>Do you want to create a new shelf?</div>
            </div>
        );
    }
}
export default ChooseShelf;
