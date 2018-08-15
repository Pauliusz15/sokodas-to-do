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
import { fetchClients, fetchTasks } from '../actions/fetch';
import { loadTableFilter } from '../actions/table-data';
import { Button } from 'antd';
import '../css/App.css';

class Home extends Component {
	constructor(props) {
		super(props);

		this.handleReloadClick = this.handleReloadClick.bind(this);
	}

	componentDidMount() {
		this.props.fetchClients();
	}

	handleReloadClick() {
		this.props.fetchTasks();
		this.props.fetchClients();
		this.props.loadTableFilter('', 'title');
	}

	render() {
		return (
			<div>
				<div className="header_container">
					<h1 className="main_header">Tasks</h1>
					<Button
						className="add_btn"
						type="primary"
						icon="plus"
						onClick={() => this.props.setAddTaskVisibility(true)}
					>
						Add task
					</Button>
					<Button
						className="add_btn"
						type="primary"
						icon="plus"
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
					<Button className="add_btn" type="primary" icon="reload" onClick={this.handleReloadClick}>
						Reload
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
		filteredTasks: state.filteredTasks
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			setAddTaskVisibility: setAddTaskVisibility,
			fetchClients: fetchClients,
			setAddClientVisibility: setAddClientVisibility,
			setClientsVisibility: setClientsVisibility,
			loadTableFilter: loadTableFilter,
			fetchTasks: fetchTasks
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(Home);
