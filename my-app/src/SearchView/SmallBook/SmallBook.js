import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import placeholder from './../../images/placeholder.png'


class SmallBook extends Component {

	render() {

		if (this.props.book.volumeInfo.imageLinks == null) {
			this.props.book.volumeInfo.imageLinks = {thumbnail: placeholder};
		}

		return (

			<Link to={'/book/' + this.props.book.id} key={this.props.book.id} onClick={this.handleClick}>
				<div className="bookfound" >
					<img className="bookimg" src={this.props.book.volumeInfo.imageLinks.thumbnail} alt=''/>
					<div className="booktitle">{this.props.book.volumeInfo.title}</div>
				</div>
			</Link>

		)
	}
}

export default SmallBook;
