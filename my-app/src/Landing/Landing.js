import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import './Landing.css';
import Search from '../Search/Search';
import SearchResults from '../SearchResults/SearchResults';


class Landing extends Component {

  render() {

    return (
      <div className="landing">
        <Search model={this.props.model}/>
        <SearchResults model={this.props.model}/>
      </div>

    );
  }
}

export default Landing;
