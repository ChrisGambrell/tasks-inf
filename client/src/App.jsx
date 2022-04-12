import { createContext, useReducer } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { NotificationsProvider } from '@mantine/notifications'
import store from './app/store'
import { SideMenu, SpotlightWrapper } from './components'
import { menuItems } from './components/SideMenu'
import { Project } from './pages'

export const TasksContext = createContext()

const App = () => {
	const [state, dispatch] = useReducer(store.reducer, store.initialState)

	return (
		<div className='App'>
			<NotificationsProvider>
				<TasksContext.Provider value={[state, dispatch]}>
					<div className='flex h-screen'>
						<SideMenu />

						<SpotlightWrapper>
							<Routes>
								{menuItems.map((section) =>
									section.map(({ component: Component, ...menuItem }) => (
										<Route exact path={menuItem.url} element={<Component {...menuItem} />} />
									))
								)}
								<Route exact path='/projects/:projectId' element={<Project />} />

								<Route path='*' element={<Navigate to='/inbox' />} />
							</Routes>
						</SpotlightWrapper>
					</div>
				</TasksContext.Provider>
			</NotificationsProvider>
		</div>
	)
}

export default App
