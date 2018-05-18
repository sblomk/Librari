import React, { Component } from 'react';
import CreateShelf from '../AddBook/CreateShelf/CreateShelf';
import ChooseShelf from '../AddBook/ChooseShelf/ChooseShelf';
import './AddBook.css';

//This component enables creating new shelves as well as adding books to shelves within
//the parent component Book.js
class AddBook extends Component {
   constructor(props){
        super(props);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.enableMessage = this.enableMessage.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getAllShelves = this.getAllShelves.bind(this);
        this.submitBook = this.submitBook.bind(this);
        this.handleFeatureChange = this.handleFeatureChange.bind(this);
	 
        this.state = { 
            newShelfName: "", 
            activeShelf: null,
            status: 'INITIAL',
	    displayMessage: false
	}
        this.timer = setTimeout(this.enableMessage, 2500);
    }

    componentDidMount() {
        this.getAllShelves();
      }
    
    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    //Retrieves shelves from firebase db.
    //Also sets type of "feature" component in accordance with what has been retrieved
    getAllShelves() {
        this.props.model.getShelves((shelves) => {
            //If the user has previously made shelves
            if (shelves){
		//If the user is connected
                if (shelves !== 'error'){
                    this.setState({
                        shelves: shelves,
                        feature: "ChooseShelf", //"ChooseShelf" is set if previously made shelves is retrieved from firebase db
                        status: 'LOADED'
                    })
                }
		//If the user is disconnected
                else{ 
                    this.setState({
                        status: 'ERROR'
                    })
                }
            }
	    //If the user no previously made any shelves
            else{
                this.setState({
                    feature: "CreateShelf", //"CreateShelf" is set if the user does not have any previously made shelves
                    status: 'LOADED'
                })
            }
        })
    }

    enableMessage() {
		this.setState({
			displayMessage: true
		});
	}

    //Handler listening to what shelf is chosen in the dropdown menu
    handleDropdownChange(e) {
        this.setState({
            activeShelf: e.target.value
        })
    }

    //Handler for the input field of creating new shelves
    handleInputChange(e) {
        this.setState({
            newShelfName: e.target.value
        })
    }

    //Returns a shelf id, and creates an id in the case that there is none
    submitBook(){
	//If the user wants to add book to an existing shelf
        if (this.state.feature ==="ChooseShelf"){
            this.props.model.addToShelf(parseInt(this.state.activeShelf, 10), this.props.book, () => {
                alert("This book is already in this shelf! If you want to store this book again, create or choose a new shelf.")}
            )
        }
	//If the user wants to create a new shelf for the book
        else if(this.state.feature ==="CreateShelf"){
            this.props.model.createNewShelfAndAddBook(
                this.state.newShelfName,
                this.props.book);
        }
    }
    //Enables the user to switch between features for either adding book to shelf or creating a new shelf
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
        let feature = this.state.feature;
        const {displayMessage} = this.state;

	//If the parent component Book.js is used with no logged in user    
        if (this.props.model.getUserStatus() === 'LoggedOut'){
            if (!displayMessage){
                return feature = <em><p className="loading">Loading...</p></em>
            }
            feature = <p className='recommendLogin'>Please log in to use the full features of Librari!</p>
        }
	//If the parent component Book.js is used with by a logged in user  
        else{
            switch (this.state.status) {  
                case "INITIAL":
                    feature = <em><p className="loading">Loading<span>.</span><span>.</span><span>.</span></p></em>
                break;
                case 'LOADED':
		    //If the feature is "CreateShelf", pass the CreateShelf-component into AddBook.js
                    if(feature === "CreateShelf"){
                        feature = <CreateShelf 
                                    handleChange={this.handleInputChange} 
                                    submit={this.submitBook}
                                    />
                    }
		    //If the feature is "ChooseShelf", pass the ChooseShelf-component into AddBook.js
                    else if(feature === "ChooseShelf"){
                        feature = <ChooseShelf 
                                    shelves={this.state.shelves} 
                                    activeShelf={this.state.activeShelf}
                                    handleChange={this.handleDropdownChange} 
                                    submit={this.submitBook} 
                                    alreadyExist={this.state.exists}/>
                    }
                    return(
                        // Displays information about the book, as well as the features
                            <div className="AddBook">
                                {feature}
                                <div className="linkDiv" onClick={this.handleFeatureChange}>Click here.</div>
                            </div>
                            );

                default:
		    //If the user is disconnected
                    if (!displayMessage){
                        return feature = <em><p className="loading">Loading...</p></em>
                    }
                    feature = <b>Failed to load data, please try again</b>
            }
        }
                return(
                // displaying information about the book, as well as the option of shelves
                    <div className="AddBook">
                        {feature}
                    </div>
                    );


    }

}
export default AddBook;
