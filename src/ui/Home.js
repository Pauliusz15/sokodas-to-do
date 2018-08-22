import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TaskTable from "./TaskTable";
import AddTask from "./AddTask";
import AddClient from "./AddClient";
import TaskInfo from "./TaskInfo";
import EditTask from "./EditTask";
import Clients from "./Clients";
import ExpireAlert from "./ExpireAlert";
import {
  setClientsVisibility,
  setAddClientVisibility,
  setAddTaskVisibility
} from "../actions/modal-visibility";
import { changeLoadingState } from "../actions/loader";
import { fetchClients, fetchTasks } from "../actions/fetch";
import { loadTableFilter } from "../actions/table-data";
import { Menu, Icon } from "antd";
import "../css/App.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleReloadClick = this.handleReloadClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchClients();
  }

  handleReloadClick() {
    this.props.changeLoadingState(true);
    this.props.fetchTasks();
    this.props.fetchClients();
    this.props.loadTableFilter("", "title");
  }

  render() {
    return (
      <div>
        <Menu mode="horizontal" selectable={false}>
          <Menu.Item onClick={() => this.props.setAddTaskVisibility(true)}>
            <Icon type="plus" />Add Task
          </Menu.Item>
          <Menu.Item onClick={() => this.props.setAddClientVisibility(true)}>
            <Icon type="plus" />AddClient
          </Menu.Item>
          <Menu.Item onClick={() => this.props.setClientsVisibility(true)}>
            View clients
          </Menu.Item>
          <Menu.Item onClick={this.handleReloadClick}>
            <Icon type="reload" />Reload
          </Menu.Item>
        </Menu>
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
      fetchTasks: fetchTasks,
      changeLoadingState: changeLoadingState
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Home);
