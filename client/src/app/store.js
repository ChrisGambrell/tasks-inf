const initialState = { open: -1, selected: [], showAddTask: false }

const reducer = (state, action) => {
	switch (action.type) {
		case 'set':
			return { ...state, ...action.payload }
		case 'reset':
			return initialState
		default:
			return state
	}
}

export default { initialState, reducer }
