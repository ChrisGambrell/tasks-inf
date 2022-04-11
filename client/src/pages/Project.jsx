import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHotkeys } from '@mantine/hooks'
import { projects, tasks as taskCollection } from '../app/mockData'
import { View } from '../components'
import { NewTask, TaskList } from '../components/Task'
import Placeholder from './Placeholder'

const Project = () => {
	// TODO show new task even when there's a placeholder
	// TODO click on toolbar to add extra items to task
	const { projectId } = useParams()
	const project = projects.find((project) => project.id === Number(projectId))

	const tasks = taskCollection.filter((task) => task.projectId === project.id && !task.completed)
	const loggedTasks = taskCollection
		.filter((task) => task.projectId === project.id && task.completed)
		.sort((a, b) => b.completedWhen - a.completedWhen)

	const [selectedTask, setSelectedTask] = useState(0)

	const [showNewTask, setShowNewTask] = useState(false)
	const [showLoggedItems, setShowLoggedItems] = useState(false)

	useHotkeys([
		['alt + n', () => setShowNewTask(true)],
		[
			'escape',
			() => {
				setSelectedTask(0)
				setShowNewTask(false)
			},
		],
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
						{showLoggedItems && <TaskList tasks={loggedTasks} secondary showCompletedWhen />}
					</div>
				)}
			</View.Content>
		</View>
	) : (
		<Placeholder title={project.title} icon={project.icon} color='text-blue-600' />
	)
}

export default Project
