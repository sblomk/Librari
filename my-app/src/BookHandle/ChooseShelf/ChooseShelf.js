import React, { Component } from 'react';
import "../BookHandle.css";
import { Link } from 'react-router-dom';

class ChooseShelf extends Component {

    render(){
        let shelfList;
        let btn;

        if(this.props.shelves != null){
            shelfList = this.props.shelves.map((shelf) => 
                <option value={shelf.id} key={shelf.id}>
                {shelf.name}
                </option>
        )}
        else{
            shelfList = <option value="">You don't have any shelves</option>
        }

        if (this.props.activeShelf){
            btn = <button id="addbtn" className="addbtn" title="Add to shelf" onClick={this.props.submit}>Add</button>
        }
        else{
            btn = <button id="addbtn" className="addbtn" disabled title="Select a shelf!" onClick={this.props.submit}>Add</button>
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
