import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Modal, Button } from "antd";
import { setClientInfoVisibility } from "../actions/modal-visibility";
import "../css/App.css";

class ClientInfo extends Component {
  render() {
    if (this.props.loadedClient) {
      return (
        <Modal
          title="Client Info"
          visible={this.props.clientInfoVisibility}
          onCancel={() => this.props.setClientInfoVisibility(false)}
          footer={
            <Button
              type="primary"
              onClick={() => this.props.setClientInfoVisibility(false)}
            >
              OK
            </Button>
          }
        >
          <h1 className="info_h1">{this.props.loadedClient.name}</h1>
          <p>Company code: {this.props.loadedClient.code}</p>
          <p>Value-added tax code: {this.props.loadedClient.pvm_code}</p>
          <p>{this.props.loadedClient.comment}</p>
        </Modal>
      );
    } else {
      return (
        <Modal
          title="Client info"
          visible={this.props.clientInfoVisibility}
          onCancel={() => this.props.setClientInfoVisibility(false)}
          onOk={() => this.props.setClientInfoVisibility(false)}
        >
          <p>Something went wrong</p>
        </Modal>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    clientInfoVisibility: state.clientInfoVisibility,
    loadedClient: state.loadedClient
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    { setClientInfoVisibility: setClientInfoVisibility },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(ClientInfo);
