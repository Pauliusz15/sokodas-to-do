export const postTask = (clientId, name, desc, date, price, currency, progress) => {
	if (desc === '' || desc === '<p><br></p>') {
		desc = '-';
	}
	return function(dispatch) {
		fetch('http://localhost/insert_task.php', {
			method: 'post',
			headers: {
				Accept: 'application/json'
			},
			body: JSON.stringify({
				client_id: clientId,
				name: name,
				description: desc,
				date: date,
				price: price,
				currency: currency,
				progress: progress
			})
		})
			.then(request => {
				fetch('http://localhost/get_tasks.php')
					.then(res => res.json())
					.then(data => dispatch({ type: 'FETCH_TASKS', payload: data }));
			})
			.catch(error => console.error(`Fetch Error =\n`, error));
	};
};

export const postClient = (name, code, pvmCode, comment) => {
	return function(dispatch) {
		fetch('http://localhost/insert_client.php', {
			method: 'post',
			headers: {
				Accept: 'application/json'
			},

			body: JSON.stringify({
				name: name,
				code: code,
				pvm_code: pvmCode,
				comment: comment
			})
		})
			.then(response => {
				fetch('http://localhost/get_clients.php')
					.then(res => res.json())
					.then(data => dispatch({ type: 'FETCH_CLIENTS', payload: data }));
			})
			.catch(error => console.error(`Fetch Error =\n`, error));
	};
};
