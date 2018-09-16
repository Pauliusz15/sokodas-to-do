import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { loadTableFilter } from "../actions/table-data";
import { editTask } from "../actions/edit";
import { Alert } from "antd";

class ExpireAlert extends Component {
  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleMessageClick = this.handleMessageClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  getItems() {
    return this.props.fetchedTasks.filter(item => {
      return item.show_expired !== "0";
    });
  }

  handleItemClick(id) {
    const data = this.props.fetchedTasks.find(item => {
      return item.id === id;
    });
    this.props.loadTableFilter([data.id], "id");
  }

  handleMessageClick() {
    const data = this.getItems().filter(item => {
      return this.props.fetchedTasks.filter(fItem => {
        return fItem.id === item.id;
      });
    });
    this.props.loadTableFilter(
      data.map(item => {
        return item.id;
      }),
      "id"
    );
  }

  handleClose() {
    for (let i = 0; i < this.getItems().length; i++) {
      const item = this.getItems()[i];
      this.props.editTask(
        item.id,
        item.client_id,
        item.name,
        item.description,
        item.date,
        item.price,
        item.currency,
        item.progress,
        0
      );
    }
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
    const message = (
      <span className="warning_message" onClick={this.handleMessageClick}>
        Tasks behind schedule:
      </span>
    );
    const list = this.createList();

    if (this.getItems().length > 0) {
      return (
        <div className="expire_alert">
          <Alert
            message={message}
            description={list}
            type="warning"
            showIcon
            closable="true"
            onClose={this.handleClose}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  return { fetchedTasks: state.fetchedTasks };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    { loadTableFilter: loadTableFilter, editTask: editTask },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(ExpireAlert);
