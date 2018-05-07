import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
//import './MyLibrari.css';

//var shelves;
var shelfname;
var id = window.location.href.toString().split("edit/")[1];

class Shelf extends Component {
    constructor(props){
        super(props);

        //this.props.model.addObserver(this);
        this.handleRemove = this.handleRemove.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleSave = this.handleSave.bind(this)

        this.state = {
            status: 'INITIAL',
            shelfID: window.location.href.toString().split("edit/")[1],
            //name: this.props.model.getShelfByID(parseInt(id)).name
            
        }
    }

    componentDidMount() {
      this.props.model.addObserver(this)
    }


    handleRemove = (sID, bID) => {
      //console.log("försöker ta bort en bok " + sID + ' ' + bID)
      this.props.model.removeBookFromShelf(sID, bID);
    }
    handleInput = (event) => {
      shelfname = event.target.value;
      console.log(shelfname);
    }

    handleSave = (event) => {
     this.setState({
        status: 'INITIAL',
        name: shelfname
      })
      //console.log(this.state.status);
    }
    
    handleEdit = (event) => {
      console.log(event.target.id)
      this.setState({
        status: 'EDIT',
        editShelf: event.target.id
      })
      console.log(this.state.status);
    }

    update(){
      this.setState({
        shelves: this.props.model.getShelves()
      })
      //console.log('före forceupdate yo')
      //this.forceUpdate();
    }

    render(){
      let shelfList = null;
      console.log('status är: '+this.state.status)
      console.log('id är: '+this.state.editShelf)
      switch(this.state.status){
        case 'EDIT':
        var shelf = this.props.model.getShelfByID(parseInt(this.state.shelfID));


        break;

        case 'INITIAL':


        break;
      }
      

      return (
        <div className="myLibrari">
          {shelfList}
        </div>

      );
}
}
export default Shelf;
