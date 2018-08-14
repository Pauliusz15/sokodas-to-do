export const fetchTasks = () => {
	return function(dispatch) {
		fetch('http://localhost/get_tasks.php')
			.then(res => res.json())
			.then(data => dispatch({ type: 'FETCH_TASKS', payload: data }));
	};
};

export const fetchClients = () => {
	return function(dispatch) {
		fetch('http://localhost/get_clients.php')
			.then(res => res.json())
			.then(data => dispatch({ type: 'FETCH_CLIENTS', payload: data }));
	};
};
