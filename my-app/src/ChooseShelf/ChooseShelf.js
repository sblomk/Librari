import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class ChooseShelf extends Component {

    render(){
        let shelfList;

        if(this.props.shelves != null){
            shelfList = this.props.shelves.map((shelf) => 
                <option value={shelf.id} key={shelf.id}>
                {shelf.name}
                </option>
        )}
        else{
            shelfList = <option value="">You don't have any shelves</option>
        }

        return(
            <div className="ChooseShelf">
                <select onChange={this.props.handleChange} id="choiceOfLibrary">
                    <option value="">Select a shelf</option>
                    {shelfList}
                </select>
                <button onClick={this.props.submit}>Add</button>
                <div>Do you want to create a new shelf?</div>
            </div>
        );
    }
}
export default ChooseShelf;
