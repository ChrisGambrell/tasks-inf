import { createContext, useEffect, useReducer } from 'react'
import { Col, Row } from 'antd'
import store from './app/store'
import { SideMenu, TaskList, TaskToolbar } from './components'
import './App.min.css'

export const TasksContext = createContext()

const App = () => {
	const [state, dispatch] = useReducer(store.reducer, store.initialState)

	useEffect(() => {
		const handleKeyDown = (e) => {
			switch (e.keyCode) {
				case 27:
					dispatch({ type: 'set', payload: { selected: -1 } })
					break
				default:
					break
			}
		}

		const handleMouseDown = (e) => {
			let currElement = e.srcElement
			while (currElement.parentElement) {
				currElement = currElement.parentElement
				if (currElement.id === 'Toolbar' || Number(currElement.id) === state.selected) return
			}

			dispatch({ type: 'set', payload: { selected: -1 } })
		}

		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('mousedown', handleMouseDown)
		return function cleanup() {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('mousedown', handleMouseDown)
		}
	}, [state.selected])

	return (
		<div className='App'>
			<TasksContext.Provider value={[state, dispatch]}>
				<Row style={{ margin: '25px 0' }}>
					<Col sm={5}>
						<SideMenu />
					</Col>
					<Col
						sm={19}
						style={{
							maxWidth: 600,
							margin: '0 auto',
						}}>
						<TaskList />
						<TaskToolbar />
					</Col>
				</Row>
			</TasksContext.Provider>
		</div>
	)
}

export default App
