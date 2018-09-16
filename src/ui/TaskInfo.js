import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Modal, Button } from "antd";
import { setTaskInfoState } from "../actions/modal-visibility";
import "../css/App.css";

class TaskInfo extends Component {
  render() {
    if (this.props.loadedTask) {
      let clientName;
      const client = this.props.fetchedClients.find(client => {
        return this.props.loadedTask.client_id === client.id;
      });
      try {
        clientName = client.name;
      } catch (e) {
        clientName = "-";
      }
      return (
        <Modal
          title="Info"
          visible={this.props.taskInfoState}
          onCancel={() => this.props.setTaskInfoState(false)}
          footer={
            <Button
              type="primary"
              onClick={() => this.props.setTaskInfoState(false)}
            >
              OK
            </Button>
          }
        >
          <h1>{this.props.loadedTask.name}</h1>
          <div>
            <p
              dangerouslySetInnerHTML={{
                __html: this.props.loadedTask.description
              }}
            />
          </div>

          <p>Client: {clientName}</p>
          <p>Date to be done: {this.props.loadedTask.date}</p>
          <p>Price: {this.props.loadedTask.price}</p>
          <p>
            Created at:{" "}
            {this.props.loadedTask.created_at.substring(
              0,
              this.props.loadedTask.created_at.length - 3
            )}
          </p>
          <p>
            Last updated at:{" "}
            {this.props.loadedTask.updated_at.substring(
              0,
              this.props.loadedTask.created_at.length - 3
            )}
          </p>
        </Modal>
      );
    } else {
      return (
        <Modal
          title="Task info"
          visible={this.props.taskInfoState}
          onCancel={() => this.props.setTaskInfoState(false)}
          onOk={() => this.props.setTaskInfoState(false)}
        >
          <p>Something went wrong</p>
        </Modal>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    loadedTask: state.loadedTask,
    fetchedClients: state.fetchedClients,
    taskInfoState: state.taskInfoState
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ setTaskInfoState: setTaskInfoState }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(TaskInfo);
