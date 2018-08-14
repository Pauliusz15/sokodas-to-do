export default function(state = null, action) {
	switch (action.type) {
		case 'LOAD_FILTERED_TABLE_DATA':
			return action.payload;
		default:
			return state;
	}
}
