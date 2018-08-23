import { baseUrl } from "./base_url";

export const postTask = (
  clientId,
  name,
  desc,
  date,
  price,
  currency,
  progress,
  showExpired
) => {
  if (desc === "" || desc === "<p><br></p>") {
    desc = "-";
  }
  return function(dispatch) {
    fetch(baseUrl + "insert_task.php", {
      method: "post",
      headers: {
        Accept: "application/json"
      },
      body: JSON.stringify({
        client_id: clientId,
        name: name,
        description: desc,
        date: date,
        price: price,
        currency: currency,
        progress: progress,
        show_expired: showExpired
      })
    })
      .then(request => {
        fetch(baseUrl + "get_tasks.php")
          .then(res => res.json())
          .then(data => dispatch({ type: "FETCH_TASKS", payload: data }));
      })
      .catch(error => console.error(`Fetch Error =\n`, error));
  };
};

export const postClient = (name, code, pvmCode, comment) => {
  return function(dispatch) {
    fetch(baseUrl + "insert_client.php", {
      method: "post",
      headers: {
        Accept: "application/json"
      },

      body: JSON.stringify({
        name: name,
        code: code,
        pvm_code: pvmCode,
        comment: comment
      })
    })
      .then(response => {
        fetch(baseUrl + "get_clients.php")
          .then(res => res.json())
          .then(data => dispatch({ type: "FETCH_CLIENTS", payload: data }));
      })
      .catch(error => console.error(`Fetch Error =\n`, error));
  };
};
