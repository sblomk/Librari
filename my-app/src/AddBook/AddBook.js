import React, { Component } from 'react';
import CreateShelf from '../BookHandle/CreateShelf/CreateShelf';
import ChooseShelf from '../BookHandle/ChooseShelf/ChooseShelf';
import './AddBook.css';

// This view displays the chosen book, after clicking on it in the Landing view.
// Here, the book can be added to one of the shelves.


class AddBook extends Component {
    
    constructor(props){
        super(props);

        this.state = { 
            newShelfName: "", 
            activeShelf: null,
            status: 'INITIAL'
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
            if (shelves){
                this.setState({
                    shelves: shelves,
                    feature: "ChooseShelf",
                    status: 'LOADED'
                })
            }
            else{
                this.setState({
                    feature: "CreateShelf",
                    
                })
            }
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
            if (!(this.state.activeShelf)){
                this.setState({
                    status: 'noShelf'
                })
            }
            else {
                this.props.model.addToShelf(
                    parseInt(this.state.activeShelf, 10),
                    this.props.book); 
            }


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
        if (this.props.model.getUserStatus() === 'LoggedOut'){
            feature = <p className='loginmsg'>Please log in to use the full features of Librari!</p>
        }
        else{
            switch (this.state.status) {  
                case "INITIAL":
                    feature = <em><p className="loading">Loading<span>.</span><span>.</span><span>.</span></p></em>
                break;
                case 'LOADED':
                    if(feature === "CreateShelf"){
                        feature = <CreateShelf 
                                    handleChange={this.handleInputChange} 
                                    submit={this.submitBook}/>
                    }
                    else if(feature === "ChooseShelf"){
                        feature = <ChooseShelf 
                                    shelves={this.state.shelves} 
                                    activeShelf={this.state.activeShelf}
                                    handleChange={this.handleDropdownChange} 
                                    submit={this.submitBook} />
                    }
                    return(
                        // displaying information about the book, as well as the option of shelves
                            <div className="AddBook">
                                {feature}
                                <div className="linkDiv" onClick={this.handleFeatureChange}>Click here.</div>
                            </div>
                            );

                default:
                //return 'hej';
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
