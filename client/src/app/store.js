const initialState = {
	selectedProject: [],
	selectedTask: [],
	open: -1,
	contextedProject: -1,
	contextedTask: -1,
	move: -1,
}

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

const store = { initialState, reducer }
export default store
