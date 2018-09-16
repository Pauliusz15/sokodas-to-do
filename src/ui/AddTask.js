import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DraftEditorAdd from "./DraftEditorAdd";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  message,
  Icon,
  Select,
  TimePicker
} from "antd";
import { setAddTaskVisibility } from "../actions/modal-visibility";
import { setDescriptionAddInput } from "../actions/input-values";
import { postTask } from "../actions/post";
import "../css/App.css";

const FormItem = Form.Item;
const Option = Select.Option;

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleInput: "",
      dateInput: "",
      timeInput: "",
      progressInput: "Active",
      titleInputError: false,
      currency: "€",
      clientInputError: false
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
    this.setState({ clientInput: value, clientInputError: false });
  }

  handleCurrencyChange(value) {
    this.setState({ currency: value });
  }

  handleProgressChange(value) {
    this.setState({ progressInput: value });
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
    this.props.setAddTaskVisibility(false);
    this.setState({
      titleInput: "",
      dateInput: "",
      timeInput: "",
      priceInput: "",
      clientInput: null,
      progressInput: null,
      currency: "€",
      titleInputError: false,
      clientInputError: false
    });
    this.props.setDescriptionAddInput(null);
  }

  showExpired() {
    if (this.state.progressInput !== "Completed") {
      if (getCurrentDate() > this.state.dateInput + " " + this.state.timeInput)
        return 1;
    } else {
      return 0;
    }
  }

  handleOk() {
    if (this.state.titleInput === "") {
      this.setState({ titleInputError: true });
    }
    if (
      this.state.clientInput === null ||
      this.state.clientInput === undefined
    ) {
      this.setState({ clientInputError: "true" });
    }
    if (this.state.titleInput !== "" && this.state.clientInput != null) {
      this.props.postTask(
        this.state.clientInput,
        this.state.titleInput,
        this.props.descriptionAddInput.toString("html"),
        this.state.dateInput
          ? this.state.dateInput + " " + this.state.timeInput
          : getCurrentDate(),
        this.state.priceInput,
        this.state.currency,
        this.state.progressInput ? this.state.progressInput : "Active",
        this.showExpired()
      );
      this.setState({
        titleInput: "",
        dateInput: "",
        timeInput: "",
        priceInput: "",
        clientInput: null,
        currency: "€",
        progressInput: null
      });
      this.props.setDescriptionAddInput(null);
      this.props.setAddTaskVisibility(false);
      message.success("New task added", 1);
    }
  }

  render() {
    const suffixTitle = this.state.titleInput ? (
      <Icon
        type="close-circle"
        onClick={() => this.setState({ titleInput: "" })}
      />
    ) : null;
    const suffixDescription = this.state.priceInput ? (
      <Icon
        type="close-circle"
        onClick={() => this.setState({ priceInput: "" })}
      />
    ) : null;

    const clientMenu = this.createClientsMenu();

    return (
      <Modal
        style={{ top: 10 }}
        title="Add a new task"
        visible={this.props.addTaskVisibility}
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
            validateStatus={this.state.titleInputError ? "error" : ""}
            help={this.state.titleInputError ? "You must enter a title" : ""}
            label="Title"
            required={true}
          >
            <Input
              value={this.state.titleInput}
              onChange={this.changeTitleVal}
              suffix={suffixTitle}
            />
          </FormItem>
          <FormItem label="Description">
            <DraftEditorAdd />
          </FormItem>
          <FormItem
            label="Client"
            required={true}
            validateStatus={this.state.clientInputError ? "error" : ""}
            help={this.state.clientInputError ? "You must select a client" : ""}
          >
            <Select
              showSearch
              placeholder="Select a client from the list"
              onChange={this.handleClientChange}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {clientMenu}
            </Select>
          </FormItem>
          <FormItem
            style={{ marginRight: 10 }}
            className="inline_block"
            label="Date to be done"
          >
            <DatePicker onChange={this.changeDateVal} />
          </FormItem>
          <FormItem className="inline_block" label="Time to be done">
            <TimePicker format={"HH:mm"} onChange={this.changeTimeVal} />
          </FormItem>
          <FormItem label="Price">
            <Input
              onKeyPress={this.checkIfNumbers}
              value={this.state.priceInput}
              onChange={this.changePriceVal}
              addonAfter={
                <Select defaultValue="€" onChange={this.handleCurrencyChange}>
                  <Option value="€">€</Option>
                  <Option value="$">$</Option>
                </Select>
              }
              suffix={suffixDescription}
            />
          </FormItem>
          <FormItem label="Progress" required={true}>
            <Select defaultValue="Active" onChange={this.handleProgressChange}>
              <Option value="Active">Active</Option>
              <Option value="Completed">Completed</Option>
              <Option value="Canceled">Canceled</Option>
              <Option value="On hold">On hold</Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const addZero = i => {
  if (i < 10) {
    i = "0" + i;
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

  return yyyy + "-" + mm + "-" + dd + " " + hours + ":" + mins;
};

function mapStateToProps(state) {
  return {
    addTaskVisibility: state.addTaskVisibility,
    fetchedClients: state.fetchedClients,
    descriptionAddInput: state.descriptionAddInput
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setAddTaskVisibility: setAddTaskVisibility,
      postTask: postTask,
      setDescriptionAddInput: setDescriptionAddInput
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(AddTask);
