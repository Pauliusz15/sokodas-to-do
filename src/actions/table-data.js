export const loadTableFilter = (text, type) => {
	return {
		type: 'LOAD_FILTERED_TABLE_DATA',
		payload: {
			text: text,
			type: type
		}
	};
};
