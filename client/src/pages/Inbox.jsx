import { useState } from 'react'
import { useTasks } from '../hooks'
import { View } from '../components'
import { menuItems } from '../components/SideMenu'
import { TaskList } from '../components/Task'
import { Placeholder } from '.'

// TODO tasks can be assigned to areas eventually
// so needs to be filter => !task.project_id && !task.area_id
const Inbox = () => {
	const menuItem = menuItems
		.filter((sections) => sections.findIndex((menuItem) => menuItem.url === '/inbox') !== -1)[0]
		.find((menuItem) => menuItem.url === '/inbox')

	const { data: tasksCollectionIncomplete = [] } = useTasks.incomplete()
	const { data: tasksCollectionComplete = [] } = useTasks.complete()

	const tasks = tasksCollectionIncomplete.filter((task) => !task.project_id)
	const loggedTasks = tasksCollectionComplete.filter((task) => !task.project_id).sort((a, b) => b.completed_when - a.completed_when)

	const [showLoggedItems, setShowLoggedItems] = useState(false)

	return tasks.length > 0 || loggedTasks.length > 0 ? (
		<View>
			<View.Header title={menuItem.title} icon={menuItem.icon} color={menuItem.color} />
			<View.Content>
				<TaskList tasks={tasks} showNotesIndicator showWhen />

				{/* Logged tasks */}
				{/* TODO spacing issue with headers in task list going into logged items  Should be fixed if included in tasklist component */}
				{/* TODO can this be a component? maybe part of the task list to auto-include a flag for */}
				{loggedTasks.length > 0 && (
					<div>
						<button
							className='px-1 rounded border border-white font-semibold text-xs text-gray-400 hover:border-gray-300 active:bg-gray-300'
							onClick={() => setShowLoggedItems(!showLoggedItems)}>
							{showLoggedItems ? 'Hide logged items' : `Show ${loggedTasks.length} logged items`}
						</button>
						{showLoggedItems && <TaskList tasks={loggedTasks} secondary showCompletedWhen />}
					</div>
				)}
			</View.Content>
		</View>
	) : (
		<Placeholder {...menuItem} />
	)
}

export default Inbox
