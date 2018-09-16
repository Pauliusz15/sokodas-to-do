import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Modal, Form, Input, message, Icon } from "antd";
import { setAddClientVisibility } from "../actions/modal-visibility";
import { postClient } from "../actions/post";
import "../css/App.css";

const FormItem = Form.Item;
const { TextArea } = Input;

class AddClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      codeInput: "",
      pvmCodeInput: "",
      commentInput: "",
      nameInputError: false,
      codeInputError: false
    };

    this.changeNameVal = this.changeNameVal.bind(this);
    this.changeCodeVal = this.changeCodeVal.bind(this);
    this.changeCommentVal = this.changeCommentVal.bind(this);
    this.changePvmCodeVal = this.changePvmCodeVal.bind(this);
    this.checkIfNumbers = this.checkIfNumbers.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  changeNameVal(e) {
    this.setState({ nameInput: e.target.value, nameInputError: false });
  }

  changeCodeVal(e) {
    this.setState({ codeInput: e.target.value, codeInputError: false });
  }

  changePvmCodeVal(e) {
    this.setState({ pvmCodeInput: e.target.value });
  }

  changeCommentVal(e) {
    this.setState({ commentInput: e.target.value });
  }

  checkIfNumbers(e) {
    let key;
    if (e.type === "paste") {
      key = e.clipboardData.getData("text/plain");
    } else {
      key = e.keyCode || e.which;
      key = String.fromCharCode(key);
    }

    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      e.returnValue = false;
      if (e.preventDefault) e.preventDefault();
    }
  }

  handleCancel() {
    this.props.setAddClientVisibility(false);
    this.setState({
      nameInput: "",
      codeInput: "",
      pvmCodeInput: "",
      commentInput: "",
      nameInputError: false,
      codeInputError: false
    });
  }

  handleOk() {
    if (this.state.nameInput === "") {
      this.setState({ nameInputError: true });
    }
    if (this.state.codeInput === "") {
      this.setState({ codeInputError: true });
    }
    if (this.state.nameInput !== "" && this.state.codeInput !== "") {
      this.props.postClient(
        this.state.nameInput,
        this.state.codeInput,
        this.state.pvmCodeInput,
        this.state.commentInput
      );
      this.props.setAddClientVisibility(false);
      this.setState({
        nameInput: "",
        codeInput: "",
        pvmCodeInput: "",
        commentInput: ""
      });
      message.success("New client added", 1);
    }
  }

  render() {
    const suffixName = this.state.nameInput ? (
      <Icon
        type="close-circle"
        onClick={() => this.setState({ nameInput: "" })}
      />
    ) : null;
    const suffixCode = this.state.codeInput ? (
      <Icon
        type="close-circle"
        onClick={() => this.setState({ codeInput: "" })}
      />
    ) : null;
    const suffixPvmCode = this.state.pvmCodeInput ? (
      <Icon
        type="close-circle"
        onClick={() => this.setState({ pvmCodeInput: "" })}
      />
    ) : null;

    return (
      <Modal
        style={{ top: "5%" }}
        title="Add a new client"
        visible={this.props.addClientVisibility}
        onOk={this.handleOk}
        okText="Submit"
        closable={false}
        maskClosable={false}
        destroyOnClose={true}
        onCancel={this.handleCancel}
      >
        <Form layout="vertical">
          <FormItem
            validateStatus={this.state.nameInputError ? "error" : ""}
            help={this.state.nameInputError ? "You must enter a name" : ""}
            label="Name"
            required={true}
          >
            <Input
              value={this.state.nameInput}
              onChange={this.changeNameVal}
              suffix={suffixName}
            />
          </FormItem>
          <FormItem
            validateStatus={this.state.codeInputError ? "error" : ""}
            help={
              this.state.codeInputError ? "You must enter a company code" : ""
            }
            label="Company code"
            required={true}
          >
            <Input
              onKeyPress={this.checkIfNumbers}
              value={this.state.codeInput}
              onChange={this.changeCodeVal}
              suffix={suffixCode}
            />
          </FormItem>
          <FormItem label="Value-added tax code">
            <Input
              value={this.state.pvmCodeInput}
              onChange={this.changePvmCodeVal}
              suffix={suffixPvmCode}
            />
          </FormItem>
          <FormItem label="Comment">
            <TextArea
              rows={4}
              value={this.state.commentInput}
              onChange={this.changeCommentVal}
            />
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    addClientVisibility: state.addClientVisibility
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    { setAddClientVisibility: setAddClientVisibility, postClient: postClient },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(AddClient);
