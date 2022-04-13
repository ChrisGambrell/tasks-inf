import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHotkeys } from '@mantine/hooks'
import { useProject, useTasks } from '../hooks'
import { View } from '../components'
import { NewTask, TaskList } from '../components/Task'
import Placeholder from './Placeholder'

const Project = () => {
	// TODO show new task even when there's a placeholder
	// TODO click on toolbar to add extra items to task
	const { projectId } = useParams()
	const { data: project = {} } = useProject(Number(projectId))
	const { data: tasksCollection = [] } = useTasks.all()

	const tasks = tasksCollection.filter((task) => task.project_id === project.id && !task.completed)
	const loggedTasks = tasksCollection
		.filter((task) => task.project_id === project.id && task.completed)
		.sort((a, b) => b.completed_when - a.completed_when)

	const [showNewTask, setShowNewTask] = useState(false)
	const [showLoggedItems, setShowLoggedItems] = useState(false)

	useHotkeys([
		['alt + n', () => setShowNewTask(true)],
		['escape', () => setShowNewTask(false)],
	])

	return tasks.length > 0 ? (
		<View>
			<View.Header title={project.title} description={project.description} icon={project.icon} color='text-blue-600' actionButton />
			<View.Content>
				{showNewTask && <NewTask />}

				<TaskList tasks={tasks} showHeaders showNotesIndicator showWhen />

				{/* Logged tasks */}
				{loggedTasks.length > 0 && (
					// TODO show headers with task
					<div>
						<button
							className='px-1 rounded border border-white font-semibold text-xs text-gray-400 hover:border-gray-300 active:bg-gray-300'
							onClick={() => setShowLoggedItems(!showLoggedItems)}>
							{showLoggedItems ? 'Hide logged items' : `Show ${loggedTasks.length} logged items`}
						</button>
						{showLoggedItems && <TaskList tasks={loggedTasks} secondary showCompletedWhen showHeader />}
					</div>
				)}
			</View.Content>
		</View>
	) : (
		<Placeholder title={project.title} icon={project.icon} color='text-blue-600' />
	)
}

export default Project
