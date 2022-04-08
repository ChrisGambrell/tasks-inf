import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHotkeys } from '@mantine/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faArrowRight,
	faCalendarDays,
	faCheckToSlot,
	faFile,
	faFlag,
	faListUl,
	faStar,
	faTag,
	faTrash,
	faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'
import { headers, projects, tasks as taskCollection } from '../app/mockData'
import { Dropdown, View, WhenSelect } from '../components'
import Placeholder from './Placeholder'

const CompletedWhenDisplay = ({ when }) => {
	return (
		<div className='px-1 text-xs font-semibold text-blue-600'>
			{when?.toLocaleDateString() === new Date().toLocaleDateString()
				? 'today'
				: when.toLocaleDateString('en-us', { month: 'short', day: 'numeric' })}
		</div>
	)
}

const WhenDisplay = ({ when }) => {
	return when?.toLocaleDateString() === new Date().toLocaleDateString() ? (
		<FontAwesomeIcon className='ml-1 w-3 h-3 text-yellow-400' icon={faStar} />
	) : when ? (
		<div className='ml-1 px-2 rounded text-xs font-semibold text-gray-600 bg-gray-200 select-none'>
			{when.toLocaleDateString(
				'en-us',
				when < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7)
					? { weekday: 'short' }
					: { month: 'short', day: 'numeric' }
			)}
		</div>
	) : null
}

export const Task = ({
	task,
	secondary = false,
	showCompletedWhen = false,
	showNotesIndicator = false,
	showProject = false,
	showWhen = false,
}) => {
	const project = projects.find((project) => project.id === task.projectId)

	return (
		<div className='flex items-center -mx-6 mt-1.5'>
			<WhenSelect
				target={<FontAwesomeIcon className='opacity-0 hover:opacity-100 w-3 h-3 p-1 -m-1 text-gray-400' icon={faCalendarDays} />}
			/>
			<input className='ml-3 mr-1' type='checkbox' defaultChecked={task.completed} />
			{showCompletedWhen && <CompletedWhenDisplay when={task.completedWhen} />}
			{showWhen && <WhenDisplay when={task.when} />}
			<div className='ml-1 mr-1'>
				<div className={`${secondary ? 'text-gray-400' : 'text-gray-800'} truncate`}>{task.title}</div>
				{showProject && project && <div className='text-xs text-gray-400 truncate'>{project.title}</div>}
			</div>
			{showNotesIndicator && task.notes && <FontAwesomeIcon className='w-3 h-3 text-gray-400' icon={faFile} />}
		</div>
	)
}

const NewTask = () => (
	<div className='flex flex-col mb-12 rounded p-4 space-y-1 border shadow-md'>
		<div className='flex space-x-2'>
			<div className='flex-none'>
				<input type='checkbox' />
			</div>
			<div className='flex-grow flex flex-col'>
				<input className='focus:outline-none' type='text' placeholder='New To-Do' />
				<textarea className='focus:outline-none' placeholder='Notes'></textarea>
			</div>
		</div>
		<div className='flex justify-end space-x-2'>
			<WhenSelect
				target={
					<button className='px-1 rounded border border-white text-gray-400 hover:border-gray-300 active:bg-gray-300'>
						<FontAwesomeIcon icon={faCalendarDays} />
					</button>
				}
			/>
			<div className='flex items-center w-36 px-1 space-x-1 rounded text-gray-400 bg-gray-100'>
				<div className='flex-none'>
					<FontAwesomeIcon icon={faTag} />
				</div>
				<div className='flex-grow'>
					<input className='w-full bg-transparent text-black focus:outline-none' type='text' placeholder='Tags' />
				</div>
			</div>
			{/* <button
				className='px-1 rounded border border-white text-gray-400 hover:border-gray-300 active:bg-gray-300'
				onClick={() => console.log('TODO')}>
				<FontAwesomeIcon icon={faTag} />
			</button> */}
			<button
				className='px-1 rounded border border-white text-gray-400 hover:border-gray-300 active:bg-gray-300'
				onClick={() => console.log('TODO')}>
				<FontAwesomeIcon icon={faListUl} />
			</button>
			<button
				className='px-1 rounded border border-white text-gray-400 hover:border-gray-300 active:bg-gray-300'
				onClick={() => console.log('TODO')}>
				<FontAwesomeIcon icon={faFlag} />
			</button>
		</div>
	</div>
)

const Project = () => {
	const { projectId } = useParams()
	const project = projects.find((project) => project.id === Number(projectId))

	const tasks = taskCollection.filter((task) => task.projectId === project.id && !task.completed)
	const loggedTasks = taskCollection
		.filter((task) => task.projectId === project.id && task.completed)
		.sort((a, b) => b.completedWhen - a.completedWhen)

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

				{/* Tasks w/o headers */}
				<div className='mb-8'>
					{tasks.map((task) => (
						<Task key={task.title} task={task} showNotesIndicator showWhen />
					))}
				</div>

				{headers
					.filter((header) => header.projectId === project.id)
					.map((header) => (
						<div key={header.title} className='mb-8'>
							{/* Header */}
							<div
								key={header.title}
								className='flex justify-between items-center pb-0.5 border-b border-gray-200 text-blue-600 font-semibold select-none'>
								<div>{header.title}</div>
								<Dropdown color='text-blue-600'>
									<Dropdown.Item label='Archive' icon={faCheckToSlot} onClick={() => console.log('TODO')} />

									<Dropdown.Divider />

									<Dropdown.Item label='Move' icon={faArrowRight} onClick={() => console.log('TODO')} />
									<Dropdown.Item
										label='Convert to Project...'
										icon={faUpRightFromSquare}
										onClick={() => console.log('TODO')}
									/>
									<Dropdown.Item label='Delete' icon={faTrash} onClick={() => console.log('TODO')} />
								</Dropdown>
							</div>

							{/* Tasks */}
							{tasks
								.filter((task) => task.headerId === header.id)
								.map((task) => (
									<Task key={task.title} task={task} showNotesIndicator showWhen />
								))}
						</div>
					))}

				{/* Logged tasks */}
				{loggedTasks.length > 0 && (
					// TODO show headers with task
					<div>
						<button
							className='px-1 rounded border border-white font-semibold text-xs text-gray-400 hover:border-gray-300 active:bg-gray-300'
							onClick={() => setShowLoggedItems(!showLoggedItems)}>
							{showLoggedItems ? 'Hide logged items' : `Show ${loggedTasks.length} logged items`}
						</button>
						{showLoggedItems && loggedTasks.map((task) => <Task key={task.title} task={task} secondary showCompletedWhen />)}
					</div>
				)}
			</View.Content>
		</View>
	) : (
		<Placeholder title={project.title} icon={project.icon} color='text-blue-600' />
	)
}

export default Project
