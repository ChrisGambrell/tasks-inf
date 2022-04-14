import { useParams } from 'react-router-dom'
import { useArea, useProjects, useTasks } from '../hooks'
import { ProjectList, View } from '../components'
import { TaskList } from '../components/Task'
import Placeholder from './Placeholder'

const Area = () => {
	const { areaId } = useParams()
	const { data: area = {} } = useArea(Number(areaId))
	const { data: projectsCollection = [] } = useProjects()
	const { data: tasksCollection = [] } = useTasks()

	const projects = projectsCollection.filter((project) => project.area_id === area.id)
	const tasks = tasksCollection.filter((task) => task.area_id === area.id)

	return projects.length > 0 ? (
		<View>
			<View.Header title={area.title} icon='box' color='text-green-500' actionButton />
			<View.Content>
				<div className='mt-8'>
					<ProjectList projects={projects} />
					<TaskList tasks={tasks} />
				</div>
			</View.Content>
		</View>
	) : (
		<Placeholder title={area.title} icon={area.icon} color='text-blue-600' />
	)
}

export default Area
