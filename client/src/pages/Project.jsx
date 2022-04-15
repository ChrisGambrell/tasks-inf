import { useParams } from 'react-router-dom'
import { useProject, useTasks } from '../hooks'
import { View } from '../components'
import { TaskList } from '../components/Task'
import Placeholder from './Placeholder'

const Project = () => {
	const { projectId } = useParams()
	const { data: project = {} } = useProject(Number(projectId))
	const { data: tasksCollection = [] } = useTasks.all()

	const tasks = tasksCollection.filter((task) => task.project_id === project.id)

	return tasks.length > 0 ? (
		<View>
			<View.Header title={project.title} description={project.description} icon={project.icon} color='text-blue-600' actionButton />
			<View.Content>
				<TaskList tasks={tasks} projectId={project.id} showHeaders showLogged showNotesIndicator showWhen />
			</View.Content>
		</View>
	) : (
		<Placeholder title={project.title} icon={project.icon} color='text-blue-600' />
	)
}

export default Project
