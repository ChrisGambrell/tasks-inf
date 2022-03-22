import { createContext, useEffect, useReducer, useState } from 'react'
import { useDeleteTask } from './hooks'
import { Button, Col, Row } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import store from './app/store'
import { SideMenu, TaskList } from './components'
import './App.min.css'

export const TasksContext = createContext()

const App = () => {
	const deleteTask = useDeleteTask().mutate

	const [state, dispatch] = useReducer(store.reducer, store.initialState)

	// const [showAddingTask, setShowAddingTask] = useState(false)
	// const [selectedTask, setSelectedTask] = useState(-1)

	const handleDeleteTask = async (taskId = state.selected) => {
		await deleteTask(taskId)
		dispatch({ type: 'set', payload: { selected: -1 } })
	}

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
						<div className='Toolbar' id='toolbar'>
							{state.selected > -1 || state.showAddingTask ? (
								<Button
									type='text'
									onClick={() => {
										if (state.showAddingTask) dispatch({ type: 'set', payload: { showAddingTask: false } })
										else handleDeleteTask()
									}}>
									<DeleteOutlined />
								</Button>
							) : (
								<Button type='text' onClick={() => dispatch({ type: 'set', payload: { showAddingTask: true } })}>
									<PlusOutlined />
								</Button>
							)}
						</div>
					</Col>
				</Row>
			</TasksContext.Provider>
		</div>
	)
}

export default App
