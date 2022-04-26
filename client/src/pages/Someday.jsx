import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { useProjects, useTasks } from '../hooks'
import { View } from '../components'
import { ProjectList } from '../components'
import { TaskList } from '../components/Task'
import { menuItems } from '../components/SideMenu'
import { Placeholder } from '.'

const Someday = () => {
	const menuItem = menuItems
		.filter((sections) => sections.findIndex((menuItem) => menuItem.url === '/someday') !== -1)[0]
		.find((menuItem) => menuItem.url === '/someday')

	const { data: projectsCollection = [] } = useProjects()
	const { data: tasksCollection = [] } = useTasks.incomplete()

	const projects = projectsCollection.filter((project) => project.category === 'someday')
	const tasks = tasksCollection.filter((task) => task.category === 'someday')

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

export default Someday
