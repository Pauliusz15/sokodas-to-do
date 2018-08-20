import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RichTextEditor from 'react-rte';

import { setDescriptionEditInput } from '../actions/input-values';

class DraftEditorEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: RichTextEditor.createValueFromString(this.props.loadedTask.description, 'html')
		};
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		this.props.setDescriptionEditInput(this.state.value);
	}

	onChange(value) {
		this.setState({ value: value });
		this.props.setDescriptionEditInput(value);
	}

	render() {
		const toolbarConfig = config;
		return (
			<RichTextEditor
				value={this.state.value}
				onChange={this.onChange}
				toolbarConfig={toolbarConfig}
			/>
		);
	}
}

const config = {
	// Optionally specify the groups to display (displayed in the order listed).
	display: [
		'INLINE_STYLE_BUTTONS',
		'BLOCK_TYPE_BUTTONS',
		'LINK_BUTTONS',
		'BLOCK_TYPE_DROPDOWN',
		'HISTORY_BUTTONS'
	],
	INLINE_STYLE_BUTTONS: [
		{ label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
		{ label: 'Italic', style: 'ITALIC' },
		{ label: 'Underline', style: 'UNDERLINE' }
	],
	BLOCK_TYPE_DROPDOWN: [
		{ label: 'Normal', style: 'unstyled' },
		{ label: 'Heading Large', style: 'header-one' },
		{ label: 'Heading Medium', style: 'header-two' },
		{ label: 'Heading Small', style: 'header-three' }
	],
	BLOCK_TYPE_BUTTONS: [
		{ label: 'UL', style: 'unordered-list-item' },
		{ label: 'OL', style: 'ordered-list-item' }
	]
};

function mapStateToProps(state) {
	return {
		loadedTask: state.loadedTask
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			setDescriptionEditInput: setDescriptionEditInput
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(DraftEditorEdit);
