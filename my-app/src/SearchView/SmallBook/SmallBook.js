import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SmallBook extends Component {

	render() {

		if (this.props.book.volumeInfo.imageLinks == null) {
			this.props.book.volumeInfo.imageLinks = {thumbnail: 'https://www.orionbooks.co.uk/assets/img/newsletter_placeholder.jpg'};
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
