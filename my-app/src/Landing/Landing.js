import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import Search from '../Search/Search';
import SearchResults from '../SearchResults/SearchResults';


class Landing extends Component {
  render() {
    return (
      <div className="Landing col-md-12">
        <div className="col-md-12">
          <div className="col-md-2">
            <Link to="/profile" className="btn btn-info btn-lg">
                <span className="glyphicon glyphicon-user"></span> User
            </Link>
          </div>
          <Search model={this.props.model}/>
        </div>
        <SearchResults model={this.props.model}/>


      </div>
    );
  }
}

export default Landing;
