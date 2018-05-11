import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CreateShelf from '../CreateShelf/CreateShelf';
import ChooseShelf from '../ChooseShelf/ChooseShelf';

// This view displays the chosen book, after clicking on it in the Landing view.
// Here, the book can be added to one of the shelves.


class AddBook extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            feature: "ChooseShelf", 
            newShelfName: "", 
            activeShelf: null
        }

        //this.props.model.addObserver(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.getAllShelves = this.getAllShelves.bind(this);
        this.submitBook = this.submitBook.bind(this);
        this.handleFeatureChange = this.handleFeatureChange.bind(this);
    }

    componentDidMount() {
        this.getAllShelves()
      }

    getAllShelves() {
        this.props.model.getShelves((shelves) => {
            this.setState({
                shelves: shelves
            })
        }, (errordata) => {
            console.log("The read failed: ")
            ;})
    }

    // handler listening to what shelf is chosen in the dropdown menu
    handleDropdownChange(e) {
        console.log("handle dropdown")
        this.setState({
            activeShelf: e.target.value
        })
    }

    // handler for creating new shelves
    handleInputChange(e) {
        this.setState({
            newShelfName: e.target.value
        })
    }

    // returns a shelf id, and creates an id in the case that there is none
    submitBook(){  
        if (this.state.feature ==="ChooseShelf"){
            this.props.model.addToShelf(
                parseInt(this.state.activeShelf),
                this.props.book); 

        } 
        else if(this.state.feature ==="CreateShelf"){
            this.props.model.createNewShelfAndAddBook(
                this.state.newShelfName,
                this.props.book);
        }
    }

    handleFeatureChange(){
		if(this.state.feature === "CreateShelf"){
			this.setState({
                feature: "ChooseShelf",
                newShelfName: ""
            })
		}
		else{
			this.setState({
                feature: "CreateShelf", 
                activeShelf: null
			})
		}
	}


    render(){
        let feature = this.state.feature
        console.log("Feature" +  feature)

        if(feature === "CreateShelf"){

            feature = <CreateShelf 
                        handleChange={this.handleInputChange} 
                        submit={this.submitBook}/>

        }
        else if(feature === "ChooseShelf")

            feature = <ChooseShelf 
                        shelves={this.state.shelves} 
                        handleChange={this.handleDropdownChange} 
                        submit={this.submitBook} />
        return(
        // displaying information about the book, as well as the option of shelves
        <div className="AddBook">
            {feature}
            <div className="linkDiv" onClick={this.handleFeatureChange}>Click here.</div>
        </div>
        );
    }
}
export default AddBook;
