import { createContext, useReducer } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { NotificationsProvider } from '@mantine/notifications'
import store from './app/store'
import { TaskList, TaskToolbar } from './archive'
import { menuItems, SideMenu } from './components'

export const TasksContext = createContext()

const App = () => {
	const [state, dispatch] = useReducer(store.reducer, store.initialState)

	return (
		<div className='App'>
			<NotificationsProvider>
				<TasksContext.Provider value={[state, dispatch]}>
					<div className='flex h-screen'>
						<SideMenu />

						<Routes>
							{menuItems.map((section) =>
								section.map(({ component: Component, ...menuItem }) => (
									<Route exact path={menuItem.url} element={<Component {...menuItem} />} />
								))
							)}
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
