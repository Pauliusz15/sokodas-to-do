export const setAddClientVisibility = state => {
	return {
		type: 'SET_ADD_CLIENT_VISIBILITY',
		payload: state
	};
};

export const setAddTaskVisibility = state => {
	return {
		type: 'SET_ADD_TASK_VISIBILITY',
		payload: state
	};
};

export const setClientsVisibility = visibility => {
	return function(dispatch) {
		dispatch({ type: 'SET_CLIENTS_VISIBILITY', payload: visibility });
	};
};

export const setEditTaskVisibility = visibility => {
	return function(dispatch) {
		dispatch({ type: 'SET_EDIT_TASK_VISIBILITY', payload: visibility });
	};
};

export const setTaskInfoState = state => {
	return {
		type: 'SET_TASK_INFO_STATE',
		payload: state
	};
};

export const setClientInfoVisibility = state => {
	return {
		type: 'SET_CLIENT_INFO_VISIBILITY',
		payload: state
	};
};

export const setClientEditVisibility = state => {
	return {
		type: 'SET_CLIENT_EDIT_VISIBILITY',
		payload: state
	};
};
