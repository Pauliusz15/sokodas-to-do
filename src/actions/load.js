export const loadTask = data => {
	return {
		type: 'LOAD_TASK',
		payload: data
	};
};

export const loadClient = data => {
	return {
		type: 'LOAD_CLIENT',
		payload: data
	};
};
