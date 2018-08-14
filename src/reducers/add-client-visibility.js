export default function(state = false, action) {
	switch (action.type) {
		case 'SET_ADD_CLIENT_VISIBILITY':
			return action.payload;
		default:
			return state;
	}
}
