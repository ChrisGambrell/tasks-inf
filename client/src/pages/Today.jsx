import { incompleteTasks as taskCollection } from '../app/mockData'
import { View } from '../components'
import { menuItems } from '../components/SideMenu'
import { Placeholder } from '.'
import { Task } from './Project'

const Today = () => {
	const menuItem = menuItems
		.filter((sections) => sections.findIndex((menuItem) => menuItem.url === '/today') !== -1)[0]
		.find((menuItem) => menuItem.url === '/today')

	const tasks = taskCollection.filter((task) => task.when?.toLocaleDateString() === new Date().toLocaleDateString())

	return tasks.length > 0 ? (
		<View>
			<View.Header title={menuItem.title} icon={menuItem.icon} color={menuItem.color} />
			<View.Content>
				{tasks.map((task) => (
					<Task key={task.title} task={task} showProject showWhen />
				))}
			</View.Content>
		</View>
	) : (
		<Placeholder {...menuItem} />
	)
}

export default Today
