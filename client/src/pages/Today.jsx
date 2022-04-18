import { useProjects, useTasks } from '../hooks'
import { View } from '../components'
import { ProjectList } from '../components'
import { TaskList } from '../components/Task'
import { menuItems } from '../components/SideMenu'
import { Placeholder } from '.'

const Today = () => {
	const menuItem = menuItems
		.filter((sections) => sections.findIndex((menuItem) => menuItem.url === '/today') !== -1)[0]
		.find((menuItem) => menuItem.url === '/today')

	const { data: projectsCollection = [] } = useProjects()
	const { data: tasksCollection = [] } = useTasks.incomplete()

	const projects = projectsCollection.filter((project) => project.when?.toLocaleDateString() === new Date().toLocaleDateString())
	const tasks = tasksCollection.filter((task) => task.when?.toLocaleDateString() === new Date().toLocaleDateString())

	return tasks.length > 0 ? (
		<View>
			<View.Header title={menuItem.title} icon={menuItem.icon} color={menuItem.color} />
			<View.Content>
				<ProjectList projects={projects} showArea showComplete />
				<TaskList tasks={tasks} showProject noMargin />
			</View.Content>
		</View>
	) : (
		<Placeholder {...menuItem} />
	)
}

export default Today
