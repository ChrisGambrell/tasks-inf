import { useTasks } from '../hooks'
import { View } from '../components'
import { menuItems } from '../components/SideMenu'
import { TaskList } from '../components/Task'
import { Placeholder } from '.'

const Inbox = () => {
	const menuItem = menuItems
		.filter((sections) => sections.findIndex((menuItem) => menuItem.url === '/inbox') !== -1)[0]
		.find((menuItem) => menuItem.url === '/inbox')

	const { data: tasksCollection = [] } = useTasks.all()

	const tasks = tasksCollection.filter((task) => task.category === 'inbox')

	return tasks.length > 0 ? (
		<View>
			<View.Header title={menuItem.title} icon={menuItem.icon} color={menuItem.color} />
			<View.Content>
				<TaskList tasks={tasks} showLogged showNotesIndicator showWhen />
			</View.Content>
		</View>
	) : (
		<Placeholder {...menuItem} />
	)
}

export default Inbox
