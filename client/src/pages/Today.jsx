import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
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
	const dayTasks = tasks.filter((task) => task.when.getHours() === 0)
	const eveningTasks = tasks.filter((task) => task.when.getHours() === 18)

	return tasks.length > 0 ? (
		<View>
			<View.Header title={menuItem.title} icon={menuItem.icon} color={menuItem.color} />
			<View.Content>
				<ProjectList projects={projects} showArea showComplete />
				<TaskList tasks={dayTasks} showProject noMargin />

				{/* Evening tasks */}
				{eveningTasks.length > 0 && (
					<div>
						<div className='flex items-center space-x-2 pb-1 border-b'>
							<FA className='text-blue-400' icon='moon' />
							<div className='font-semibold'>This Evening</div>
						</div>
						<TaskList tasks={eveningTasks} showProject noMargin />
					</div>
				)}
			</View.Content>
		</View>
	) : (
		<Placeholder {...menuItem} />
	)
}

export default Today
