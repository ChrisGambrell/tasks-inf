import { useState } from 'react'
import { useHotkeys } from '@mantine/hooks'
import { useTasks } from '../hooks'
import { View } from '../components'
import { menuItems } from '../components/SideMenu'
import { NewTask, TaskList } from '../components/Task'
import { Placeholder } from '.'

const Today = () => {
	const menuItem = menuItems
		.filter((sections) => sections.findIndex((menuItem) => menuItem.url === '/today') !== -1)[0]
		.find((menuItem) => menuItem.url === '/today')

	const { data: tasksCollection = [] } = useTasks.incomplete()

	const tasks = tasksCollection.filter((task) => task.when?.toLocaleDateString() === new Date().toLocaleDateString())

	const [showNewTask, setShowNewTask] = useState(false)

	useHotkeys([
		// TODO ['alt + n', () => setShowNewTask(true)],
		['escape', () => setShowNewTask(false)],
	])

	return tasks.length > 0 ? (
		<View>
			<View.Header title={menuItem.title} icon={menuItem.icon} color={menuItem.color} />
			<View.Content>
				{showNewTask && (
					<NewTask
						defaultChecklist={['first item', 'second item in checklist']}
						defaultTags={['foo', 'this is a test']}
						defaultWhen={new Date()}
					/>
				)}

				<TaskList tasks={tasks} showProject showWhen />
			</View.Content>
		</View>
	) : (
		<Placeholder {...menuItem} />
	)
}

export default Today
