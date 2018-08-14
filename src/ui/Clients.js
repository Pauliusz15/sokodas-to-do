import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Modal, List, Button, Popconfirm, message, Input, Icon } from 'antd';
import {
	setClientsVisibility,
	setClientInfoVisibility,
	setClientEditVisibility
} from '../actions/modal-visibility';
import { deleteClient } from '../actions/delete';
import { loadClient } from '../actions/load';
import '../css/App.css';
import ClientInfo from './ClientInfo';
import EditClient from './EditClient';

class Clients extends Component {
	constructor(props) {
		super(props);
		this.state = { searchText: '' };

		this.changeSearchText = this.changeSearchText.bind(this);
		this.handleInfoClick = this.handleInfoClick.bind(this);
	}

	changeSearchText(e) {
		this.setState({ searchText: e.target.value });
	}

	handleDelete(id) {
		this.props.deleteClient(id);
		message.success('Client deleted', 2);
	}

	handleInfoClick(id) {
		this.props.setClientInfoVisibility(true);
		this.props.loadClient(
			this.props.fetchedClients.find(item => {
				return item.id === id;
			})
		);
	}

	handleEditClick(id) {
		this.props.setClientEditVisibility(true);
		this.props.loadClient(
			this.props.fetchedClients.find(item => {
				return item.id === id;
			})
		);
	}

	render() {
		const data = this.props.fetchedClients.filter(item => {
			return item.name.toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1;
		});
		return (
			<Modal
				title="Clients"
				style={{ top: 5 }}
				visible={this.props.clientsVisibility}
				footer={
					<Button type="primary" onClick={() => this.props.setClientsVisibility(false)}>
						OK
					</Button>
				}
				onCancel={() => this.props.setClientsVisibility(false)}
			>
				<Input
					value={this.state.searchText}
					onChange={this.changeSearchText}
					prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
					placeholder="Search"
				/>
				<List
					bordered
					dataSource={data}
					renderItem={item => (
						<List.Item
							actions={[
								<a onClick={() => this.handleInfoClick(item.id)}>More info</a>,
								<a onClick={() => this.handleEditClick(item.id)}>Edit</a>,
								<Popconfirm
									title="Are you sure delete this client?"
									onConfirm={() => this.handleDelete(item.id)}
									onCancel={null}
									okText="Yes"
									cancelText="No"
								>
									<a>Delete</a>
								</Popconfirm>
							]}
						>
							{item.name}
						</List.Item>
					)}
				/>
				<ClientInfo />
				<EditClient />
			</Modal>
		);
	}
}

function mapStateToProps(state) {
	return {
		clientsVisibility: state.clientsVisibility,
		fetchedClients: state.fetchedClients
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			setClientsVisibility: setClientsVisibility,
			deleteClient: deleteClient,
			setClientInfoVisibility: setClientInfoVisibility,
			loadClient: loadClient,
			setClientEditVisibility: setClientEditVisibility
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(Clients);
