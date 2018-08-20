import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RichTextEditor from 'react-rte';

import { setDescriptionAddInput } from '../actions/input-values';

class DraftEditorAdd extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		this.props.setDescriptionAddInput(RichTextEditor.createValueFromString('', 'html'));
	}

	onChange(value) {
		this.props.setDescriptionAddInput(value);
	}

	render() {
		const toolbarConfig = toolbar;
		return (
			<RichTextEditor
				style={{ minHeight: 300 }}
				value={this.props.descriptionAddInput}
				onChange={this.onChange}
				toolbarConfig={toolbarConfig}
			/>
		);
	}
}

const toolbar = {
	display: [
		'INLINE_STYLE_BUTTONS',
		'BLOCK_TYPE_BUTTONS',
		'LINK_BUTTONS',
		'BLOCK_TYPE_DROPDOWN',
		'HISTORY_BUTTONS'
	],
	INLINE_STYLE_BUTTONS: [
		{ label: 'Bold', style: 'BOLD' },
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
	return { descriptionAddInput: state.descriptionAddInput };
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			setDescriptionAddInput: setDescriptionAddInput
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	matchDispatchToProps
)(DraftEditorAdd);
