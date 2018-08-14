export default function(state = null, action) {
	switch (action.type) {
		case 'LOAD_TASK':
			return action.payload;
		default:
			return state;
	}
}
