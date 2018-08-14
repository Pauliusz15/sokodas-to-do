import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../css/App.css';

class Task extends Component {
	render() {
		return (
			<Link to={'/task/' + this.props.id} onClick={this.props.onClick}>
				<li className="task_container">
					{this.props.name}
					<br />
					<span className="client_name">{this.props.client}</span>
					<span className="date">{this.props.date}</span>
				</li>
			</Link>
		);
	}
}

export default Task;
