import { baseUrl } from "./base_url";

export const deleteTask = id => {
  return function(dispatch) {
    fetch(baseUrl + "delete_task.php", {
      method: "post",
      headers: {
        Accept: "application/json"
      },
      body: JSON.stringify({
        id: id
      })
    })
      .then(request => {
        fetch("http://localhost/get_tasks.php")
          .then(res => res.json())
          .then(data => dispatch({ type: "FETCH_TASKS", payload: data }));
      })
      .catch(error => console.error(`Fetch Error =\n`, error));
  };
};

export const deleteClient = id => {
  return function(dispatch) {
    fetch(baseUrl + "delete_client.php", {
      method: "post",
      headers: {
        Accept: "application/json"
      },
      body: JSON.stringify({
        id: id
      })
    })
      .then(request => {
        fetch(baseUrl + "get_clients.php")
          .then(res => res.json())
          .then(data => dispatch({ type: "FETCH_CLIENTS", payload: data }));
      })
      .catch(error => console.error(`Fetch Error =\n`, error));
  };
};
