export default function(state = false, action) {
	switch (action.type) {
		case 'SET_CLIENTS_VISIBILITY':
			return action.payload;
		default:
			return state;
	}
}
