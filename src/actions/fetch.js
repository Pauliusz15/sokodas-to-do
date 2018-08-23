import { baseUrl } from "./base_url";

export const fetchTasks = () => {
  return function(dispatch) {
    fetch(baseUrl + "get_tasks.php")
      .then(res => res.json())
      .then(data => dispatch({ type: "FETCH_TASKS", payload: data }));
  };
};

export const fetchClients = () => {
  return function(dispatch) {
    fetch(baseUrl + "get_clients.php")
      .then(res => res.json())
      .then(data => dispatch({ type: "FETCH_CLIENTS", payload: data }));
  };
};
