import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TaskTable from './TaskTable';
import AddTask from './AddTask';
import AddClient from './AddClient';
import TaskInfo from './TaskInfo';
import EditTask from './EditTask';
import Clients from './Clients';
import ExpireAlert from './ExpireAlert';
import {
	setClientsVisibility,
	setAddClientVisibility,
	setAddTaskVisibility
} from '../actions/modal-visibility';
import { fetchClients } from '../actions/fetch';
import { Button } from 'antd';
import '../css/App.css';

class Home extends Component {
	componentDidMount() {
		this.props.fetchClients();
	}

	render() {
		return (
			<div>
				<div className="header_container">
					<h1 className="main_header">Tasks</h1>
					<Button
						className="green add_btn"
						type="primary"
						icon="plus-circle-o"
						onClick={() => this.props.setAddTaskVisibility(true)}
					>
						Add task
					</Button>
					<Button
						className="green add_btn"
						type="primary"
						icon="plus-circle-o"
						onClick={() => this.props.setAddClientVisibility(true)}
					>
						Add client
					</Button>
					<Button
						className="add_btn"
						type="primary"
						onClick={() => this.props.setClientsVisibility(true)}
					>
						View clients
					</Button>
				</div>
				<AddTask />
				<AddClient />
				<TaskTable />
				<TaskInfo />
				<EditTask />
				<Clients />
				<ExpireAlert />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		loadedTask: state.loadedTask,
		editTaskVisibility: state.editTaskVisibility
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			setAddTaskVisibility: setAddTaskVisibility,
			fetchClients: fetchClients,
			setAddClientVisibility: setAddClientVisibility,
			setClientsVisibility: setClientsVisibility
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(Home);
