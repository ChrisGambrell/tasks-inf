import { createContext, useEffect, useReducer } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { NotificationsProvider } from '@mantine/notifications'
import store from './app/store'
import { TaskList, TaskToolbar } from './archive'
import { ContentView, SideMenu } from './components'

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
			<NotificationsProvider>
				<TasksContext.Provider value={[state, dispatch]}>
					<div className='flex h-screen'>
						<SideMenu />
						<Routes>
							<Route exact path='/' element={<ContentView />} />

							<Route exact path='/inbox' element={<div>Inbox page - TODO</div>} />

							<Route exact path='/today' element={<div>Today page - TODO</div>} />
							<Route exact path='/upcoming' element={<div>Upcoming page - TODO</div>} />
							<Route exact path='/logbook' element={<div>Logbook page - TODO</div>} />
							<Route exact path='/anytime' element={<div>Anytime page - TODO</div>} />

							<Route exact path='/someday' element={<div>Someday page - TODO</div>} />
							<Route exact path='/trash' element={<div>Trash page - TODO</div>} />

							<Route exact path='/projects/:projectId' element={<div>Project page - TODO</div>} />

							<Route
								exact
								path='/archive'
								element={
									<>
										<TaskList />
										<TaskToolbar />
									</>
								}
							/>
							<Route
								path='/archive/today'
								element={
									<>
										<TaskList query={{ when: new Date().toLocaleDateString() }} />
										<TaskToolbar />
									</>
								}
							/>
							<Route path='*' element={<Navigate to='/' />} />
						</Routes>
					</div>
				</TasksContext.Provider>
			</NotificationsProvider>
		</div>
	)
}

export default App
