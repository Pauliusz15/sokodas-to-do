import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DraftEditorEdit from './DraftEditorEdit';
import { Modal, Form, Input, DatePicker, message, Icon, Select, TimePicker } from 'antd';
import { setDescriptionEditInput } from '../actions/input-values';
import { setEditTaskVisibility } from '../actions/modal-visibility';
import { loadTask } from '../actions/load';
import { editTask } from '../actions/edit';
import '../css/App.css';

import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

class EditTask extends Component {
	constructor(props) {
		super(props);

		this.state = {
			titleInput: null,
			dateInput: null,
			timeInput: null,
			priceInput: null,
			clientInput: null,
			titleInputError: false,
			currency: null
		};

		this.changeTitleVal = this.changeTitleVal.bind(this);
		this.changeDateVal = this.changeDateVal.bind(this);
		this.changeTimeVal = this.changeTimeVal.bind(this);
		this.changePriceVal = this.changePriceVal.bind(this);
		this.handleClientChange = this.handleClientChange.bind(this);
		this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
		this.handleProgressChange = this.handleProgressChange.bind(this);
		this.checkIfNumbers = this.checkIfNumbers.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleOk = this.handleOk.bind(this);
	}

	changeTitleVal(e) {
		this.setState({ titleInput: e.target.value, titleInputError: false });
	}

	changeDateVal(date, dateString) {
		this.setState({ dateInput: dateString });
	}

	changeTimeVal(time, timeString) {
		this.setState({ timeInput: timeString });
	}

	changePriceVal(e) {
		this.setState({ priceInput: e.target.value });
	}

	handleClientChange(value) {
		this.setState({ clientInput: value });
	}

	handleCurrencyChange(value) {
		this.setState({ currency: value });
	}

	handleProgressChange(value) {
		this.setState({ progressInput: value });
	}

	checkIfNumbers(e) {
		let key;
		if (e.type === 'paste') {
			key = e.clipboardData.getData('text/plain');
		} else {
			key = e.keyCode || e.which;
			key = String.fromCharCode(key);
		}
		let regex = /[0-9]|\./;
		if (!regex.test(key)) {
			e.returnValue = false;
			if (e.preventDefault) e.preventDefault();
		}
	}

	createClientsMenu() {
		try {
			return this.props.fetchedClients.map(item => {
				return (
					<Option key={item.id} value={item.id}>
						{item.name}
					</Option>
				);
			});
		} catch (e) {}
	}

	handleCancel() {
		this.props.setEditTaskVisibility(false);
		this.setState({
			titleInput: null,
			dateInput: null,
			timeInput: null,
			priceInput: null,
			clientInput: null,
			currency: null,
			progressInput: null
		});
		this.props.setDescriptionEditInput(null);
	}

	handleOk() {
		if (this.state.titleInput === '') {
			this.setState({ titleInputError: true });
		}
		if (this.state.titleInput !== '') {
			this.props.editTask(
				this.props.loadedTask.id,
				this.state.clientInput ? this.state.clientInput : this.props.loadedTask.client_id,
				this.state.titleInput ? this.state.titleInput : this.props.loadedTask.name,
				this.props.descriptionEditInput.toString('html'),
				checkDateTime(this.state.dateInput, this.state.timeInput, this.props.loadedTask.date),
				this.state.priceInput
					? this.state.priceInput
					: this.props.loadedTask.price + this.state.currency,
				this.state.currency ? this.state.currency : '€',
				this.state.progressInput ? this.state.progressInput : this.props.loadedTask.progress
			);
			this.setState({
				titleInput: null,
				dateInput: null,
				timeInput: null,
				priceInput: null,
				clientInput: null,
				currency: null,
				progressInput: null
			});
			this.props.setDescriptionEditInput(null);
			this.props.setEditTaskVisibility(false);
			message.success('Task edited', 1);
		}
	}

	render() {
		const suffixTitle = this.state.titleInput ? (
			<Icon type="close-circle" onClick={() => this.setState({ titleInput: '' })} />
		) : null;
		const suffixPrice = this.state.priceInput ? (
			<Icon type="close-circle" onClick={() => this.setState({ priceInput: '' })} />
		) : null;

		const clientMenu = this.createClientsMenu();

		if (this.props.loadedTask) {
			return (
				<Modal
					style={{ top: 10 }}
					title="Edit a task"
					visible={this.props.editTaskVisibility}
					onOk={this.handleOk}
					okText="Submit"
					closable={false}
					maskClosable={false}
					keyboard={false}
					destroyOnClose={true}
					onCancel={this.handleCancel}
				>
					<Form layout="vertical">
						<FormItem
							validateStatus={this.state.titleInputError ? 'error' : ''}
							help={this.state.titleInputError ? 'You must enter a title' : ''}
							label="Title"
							required={true}
						>
							<Input
								value={
									this.state.titleInput !== null
										? this.state.titleInput
										: this.props.loadedTask.name
								}
								onChange={this.changeTitleVal}
								suffix={suffixTitle}
							/>
						</FormItem>
						<FormItem label="Description">
							<DraftEditorEdit />
						</FormItem>
						<FormItem
							value={
								this.state.clientInput !== null
									? this.state.clientInput
									: this.props.loadedTask.client_id
							}
							label="Client"
							required={true}
						>
							<Select
								showSearch
								filterOption={(input, option) =>
									option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								defaultValue={
									this.state.clientInput !== null
										? this.state.clientInput
										: this.props.loadedTask.client_id
								}
								onChange={this.handleClientChange}
							>
								{clientMenu}
							</Select>
						</FormItem>
						<FormItem style={{ marginRight: 10 }} className="inline_block" label="Date to be done">
							<DatePicker
								defaultValue={moment(this.props.loadedTask.date, 'YYYY-MM-DD')}
								onChange={this.changeDateVal}
							/>
						</FormItem>
						<FormItem className="inline_block" label="Time to be done">
							<TimePicker
								defaultValue={moment(
									this.props.loadedTask.date.substr(this.props.loadedTask.date.length - 5),
									'HH:mm'
								)}
								format={'HH:mm'}
								onChange={this.changeTimeVal}
							/>
						</FormItem>
						<FormItem label="Price">
							<Input
								onKeyPress={this.checkIfNumbers}
								value={
									this.state.priceInput !== null
										? this.state.priceInput
										: this.props.loadedTask.price
								}
								onChange={this.changePriceVal}
								suffix={suffixPrice}
								addonAfter={
									<Select
										defaultValue={
											this.props.loadedTask.currency ? this.props.loadedTask.currency : '€'
										}
										onChange={this.handleCurrencyChange}
									>
										<Option value="€">€</Option>
										<Option value="$">$</Option>
									</Select>
								}
							/>
						</FormItem>
						<FormItem label="Progress" required={true}>
							<Select
								defaultValue={this.props.loadedTask.progress}
								onChange={this.handleProgressChange}
							>
								<Option value="Active">Active</Option>
								<Option value="Completed">Completed</Option>
								<Option value="Canceled">Canceled</Option>
								<Option value="On hold">On hold</Option>
							</Select>
						</FormItem>
					</Form>
				</Modal>
			);
		} else {
			return (
				<Modal
					title="Info"
					visible={this.props.infoState}
					onCancel={() => this.props.setTaskInfoState(false)}
					onOk={() => this.props.setTaskInfoState(false)}
				>
					<p>Something went wrong</p>
				</Modal>
			);
		}
	}
}

const checkDateTime = (dateState, timeState, reduxDate) => {
	if (!dateState && timeState) {
		return reduxDate.substring(0, reduxDate.length - 5) + timeState;
	} else if (dateState && !timeState) {
		return dateState + ' ' + reduxDate.substring(10);
	} else if (dateState && timeState) {
		return dateState + ' ' + timeState;
	} else {
		return reduxDate;
	}
};

function mapStateToProps(state) {
	return {
		fetchedClients: state.fetchedClients,
		editTaskVisibility: state.editTaskVisibility,
		loadedTask: state.loadedTask,
		loadedTaskId: state.loadedTaskId,
		fetchedTasks: state.fetchedTasks,
		descriptionEditInput: state.descriptionEditInput
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			setEditTaskVisibility: setEditTaskVisibility,
			loadTask: loadTask,
			editTask: editTask,
			setDescriptionEditInput: setDescriptionEditInput
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(EditTask);
