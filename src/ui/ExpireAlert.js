import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadTableFilter } from '../actions/table-data';
import { Alert } from 'antd';

class ExpireAlert extends Component {
	constructor(props) {
		super(props);

		this.handleItemClick = this.handleItemClick.bind(this);
	}

	getItems() {
		const currDate = getCurrentDate();
		return this.props.fetchedTasks.filter(item => {
			return currDate > item.date && item.progress !== 'Completed';
		});
	}

	handleItemClick(id) {
		const data = this.props.fetchedTasks.find(item => {
			return item.id === id;
		});
		this.props.loadTableFilter(data.id, 'id');
	}

	createList() {
		return (
			<ul className="warning_list">
				{this.getItems().map(item => {
					return (
						<li key={item.id}>
							<a onClick={() => this.handleItemClick(item.id)}>{item.name}</a>
						</li>
					);
				})}
			</ul>
		);
	}

	render() {
		const list = this.createList();
		if (this.getItems().length > 0) {
			return (
				<div className="expire_alert">
					<Alert
						message="Tasks behind schedule:"
						description={list}
						type="warning"
						showIcon
						closable="true"
					/>
				</div>
			);
		} else {
			return null;
		}
	}
}

const addZero = i => {
	if (i < 10) {
		i = '0' + i;
	}
	return i;
};

const getCurrentDate = () => {
	const today = new Date();
	let mins = addZero(today.getMinutes());
	let hours = addZero(today.getHours());
	let dd = addZero(today.getDate());
	let mm = addZero(today.getMonth() + 1);
	let yyyy = addZero(today.getFullYear());

	return yyyy + '-' + mm + '-' + dd + ' ' + hours + ':' + mins;
};

function mapStateToProps(state) {
	return { fetchedTasks: state.fetchedTasks };
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({ loadTableFilter: loadTableFilter }, dispatch);
}

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(ExpireAlert);
