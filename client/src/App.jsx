import { createContext, useEffect, useReducer } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Grid } from '@mantine/core'
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
					dispatch({ type: 'set', payload: { open: -1, selected: [], showAddingTask: false } })
					break
				default:
					break
			}
		}

		const handleMouseDown = (e) => {
			let currElement = e.srcElement
			while (currElement.parentElement) {
				currElement = currElement.parentElement
				if (
					currElement.id === 'Toolbar' ||
					currElement.id.includes('task-') ||
					currElement.id === 'contextmenu' ||
					currElement.className?.includes('mantine-DatePicker')
				)
					return
			}

			dispatch({ type: 'set', payload: { open: -1, selected: [] } })
		}

		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('mousedown', handleMouseDown)
		return function cleanup() {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('mousedown', handleMouseDown)
		}
	}, [state.open])

	return (
		<div className='App'>
			<TasksContext.Provider value={[state, dispatch]}>
				<Routes>
					<Route
						exact
						path='/'
						element={
							<Grid>
								<Grid.Col span={3}>
									<SideMenu />
								</Grid.Col>
								<Grid.Col span={9} sx={() => ({ maxWidth: 600, margin: '0 auto' })}>
									<TaskList />
									<TaskToolbar />
								</Grid.Col>
							</Grid>
						}
					/>
					<Route
						path='/today'
						element={
							<Grid>
								<Grid.Col span={3}>
									<SideMenu />
								</Grid.Col>
								<Grid.Col span={9} sx={() => ({ maxWidth: 600, margin: '0 auto' })}>
									<TaskList query={{ when: new Date().toLocaleDateString() }} />
									<TaskToolbar />
								</Grid.Col>
							</Grid>
						}
					/>
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</TasksContext.Provider>
		</div>
	)
}

export default App
