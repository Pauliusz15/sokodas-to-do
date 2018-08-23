import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchTasks } from "../actions/fetch";
import { loadTask } from "../actions/load";
import { changeLoadingState } from "../actions/loader";
import {
  setEditTaskVisibility,
  setTaskInfoState
} from "../actions/modal-visibility";
import { deleteTask } from "../actions/delete";
import { loadTableFilter } from "../actions/table-data";
import "../css/App.css";
import { Table, Divider, Popconfirm, message, Input, Button, Icon } from "antd";

const { Column } = Table;

class TaskTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      filteredData: [],
      clientSearchText: ""
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onClientSearchInputChange = this.onClientSearchInputChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.props.fetchTasks();
  }

  getClient(id) {
    return this.props.fetchedClients.find(item => {
      return item.id === id;
    });
  }

  convertToTableData(data) {
    return data.map(task => {
      let description = removeHTMLtags(task.description);
      if (description.length > 30) {
        description = description.substring(0, 30) + "...";
      }

      let title;
      if (task.name.length > 60) {
        title = task.name.substring(0, 70) + "...";
      } else {
        title = task.name;
      }

      let clientName;
      if (this.getClient(task.client_id)) {
        clientName = this.getClient(task.client_id).name;
      } else {
        clientName = "-";
      }
      return {
        key: task.id,
        title: title,
        clientName: clientName,
        date: task.date,
        price: task.price + " " + task.currency,
        progress: task.progress,
        description: description
      };
    });
  }

  checkFilterType() {
    if (this.props.filteredTasks) {
      switch (this.props.filteredTasks.type) {
        case "id":
          return this.props.filteredTasks.text.map(item => {
            return this.props.fetchedTasks
              .filter(fItem => {
                return fItem.id.toLowerCase().indexOf(item.toLowerCase()) > -1;
              })
              .reduce((array = [], fItem) => {
                return array.push(fItem);
              });
          });
        case "title":
          return this.props.fetchedTasks.filter(item => {
            return (
              item.name
                .toLowerCase()
                .indexOf(this.props.filteredTasks.text.toLowerCase()) > -1
            );
          });
        case "client":
          return this.props.fetchedTasks.filter(item => {
            return (
              this.getClient(item.client_id)
                .name.toLowerCase()
                .indexOf(this.props.filteredTasks.text.toLowerCase()) > -1
            );
          });
        case "clear":
          return this.props.fetchedTasks;
        default:
          return [];
      }
    } else {
      return this.props.fetchedTasks;
    }
  }

  handleInfoClick(id) {
    this.props.setTaskInfoState(true);
    this.props.loadTask(
      this.props.fetchedTasks.find(item => {
        return item.id === id;
      })
    );
  }

  handleEditClick(id) {
    this.props.setEditTaskVisibility(true);
    this.props.loadTask(
      this.props.fetchedTasks.find(item => {
        return item.id === id;
      })
    );
  }

  handleDelete(id) {
    this.props.deleteTask(id);
    message.success("Task deleted", 2);
  }

  onInputChange(e) {
    this.setState({ searchText: e.target.value });
  }

  onClientSearchInputChange(e) {
    this.setState({ clientSearchText: e.target.value });
  }

  onCancel() {
    this.setState({
      searchText: "",
      clientSearchText: ""
    });
    this.props.loadTableFilter("", "clear");
  }

  render() {
    let tableData = this.convertToTableData(this.checkFilterType());

    tableData.length > 0
      ? this.props.changeLoadingState(false)
      : this.props.changeLoadingState(true);

    return (
      <div className="task_table_container">
        <Table
          bordered={true}
          dataSource={tableData}
          expandRowByClick={true}
          scroll={{ x: 1000 }}
          pagination={{ position: "both" }}
          loading={this.props.isLoading}
        >
          <Column
            title="Title"
            dataIndex="title"
            key="title"
            sorter={(a, b) => sorter(a, b, "title")}
            filterDropdown={
              <div className="custom_filter_dropdown">
                <Input
                  placeholder="Search title"
                  value={this.state.searchText}
                  onChange={this.onInputChange}
                  onPressEnter={() =>
                    this.props.loadTableFilter(this.state.searchText, "title")
                  }
                />
                <Button
                  className="search_btn"
                  type="primary"
                  onClick={() =>
                    this.props.loadTableFilter(this.state.searchText, "title")
                  }
                  icon="search"
                >
                  Search
                </Button>
                <Button type="secondary" onClick={this.onCancel}>
                  <Icon type="close-circle" />
                  Cancel
                </Button>
              </div>
            }
            filterIcon={
              <Icon
                type="search"
                style={{ color: this.state.filtered ? "#108ee9" : "#aaa" }}
              />
            }
          />
          <Column
            title="Client name"
            dataIndex="clientName"
            key="clientName"
            sorter={(a, b) => sorter(a, b, "clientName")}
            filterDropdown={
              <div className="custom_filter_dropdown">
                <Input
                  placeholder="Search title"
                  value={this.state.clientSearchText}
                  onChange={this.onClientSearchInputChange}
                  onPressEnter={() =>
                    this.props.loadTableFilter(
                      this.state.clientSearchText,
                      "client"
                    )
                  }
                />
                <Button
                  className="search_btn"
                  type="primary"
                  onClick={() =>
                    this.props.loadTableFilter(
                      this.state.clientSearchText,
                      "client"
                    )
                  }
                  icon="search"
                >
                  Search
                </Button>
                <Button type="secondary" onClick={this.onCancel}>
                  <Icon type="close-circle" />
                  Cancel
                </Button>
              </div>
            }
            filterIcon={
              <Icon
                type="search"
                style={{ color: this.state.filtered ? "#108ee9" : "#aaa" }}
              />
            }
          />
          <Column
            title="Date to be done"
            dataIndex="date"
            key="date"
            sorter={(a, b) => sorter(a, b, "date")}
          />
          <Column
            title="Price"
            dataIndex="price"
            key="price"
            sorter={(a, b) => sorter(a, b, "price")}
          />
          <Column
            title="Description"
            dataIndex="description"
            key="description"
          />
          <Column
            render={text => {
              return {
                props: {
                  className: findClass(text)
                },
                children: text
              };
            }}
            title="Progress"
            dataIndex="progress"
            key="progress"
          />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <span>
                <a onClick={() => this.handleInfoClick(record.key)}>
                  More info
                </a>
                <Divider type="vertical" />
                <a onClick={() => this.handleEditClick(record.key)}>Edit</a>
                <Divider type="vertical" />
                <Popconfirm
                  title="Are you sure delete this task?"
                  onConfirm={() => this.handleDelete(record.key)}
                  onCancel={null}
                  okText="Yes"
                  cancelText="No"
                >
                  <a>Delete</a>
                </Popconfirm>
              </span>
            )}
          />
        </Table>
      </div>
    );
  }
}

const findClass = progress => {
  switch (progress) {
    case "Active":
      return "color_active";
    case "Completed":
      return "color_completed";
    case "Canceled":
      return "color_canceled";
    case "On hold":
      return "color_on_hold";
    default:
      return null;
  }
};

const sorter = (a, b, type) => {
  switch (type) {
    case "title":
      return b.title.localeCompare(a.title);
    case "clientName":
      return b.clientName.localeCompare(a.clientName);
    case "date":
      let val1, val2;
      if (a.date === "-") {
        val1 = "z";
      } else {
        val1 = a.date;
      }
      if (b.date === "-") {
        val2 = "z";
      } else {
        val2 = b.date;
      }
      return val2.localeCompare(val1);
    case "price":
      return parseInt(b.price, 16) - parseInt(a.price, 16);
    default:
      return b.key.localeCompare(a.key);
  }
};

const removeHTMLtags = text => {
  const div = document.createElement("div");
  div.innerHTML = text;
  let desc = div.textContent || div.innerText || "";
  return desc;
};

function mapStateToProps(state) {
  return {
    fetchedTasks: state.fetchedTasks,
    fetchedClients: state.fetchedClients,
    filteredTasks: state.filteredTasks,
    isLoading: state.isLoading
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchTasks: fetchTasks,
      loadTask: loadTask,
      setTaskInfoState: setTaskInfoState,
      deleteTask: deleteTask,
      setEditTaskVisibility: setEditTaskVisibility,
      loadTableFilter: loadTableFilter,
      changeLoadingState: changeLoadingState
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(TaskTable);
