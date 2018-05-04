import React, { Component } from 'react';
import './SearchResults.css';
//import { debounce } from 'lodash';

//In this view, the books that corresponds to the user's search are displayed

class SearchResults extends Component {

	render() {
		return (
			<div className="searchResults">
				{this.props.results}
			</div>
	    );
	}
}
export default SearchResults;
