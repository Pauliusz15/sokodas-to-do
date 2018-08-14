export default function(state = false, action) {
	switch (action.type) {
		case 'SET_CLIENT_INFO_VISIBILITY':
			return action.payload;
		default:
			return state;
	}
}
