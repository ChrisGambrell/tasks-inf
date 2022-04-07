import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faArrowRight,
	faCalendarDays,
	faCheckToSlot,
	faFile,
	faStar,
	faTrash,
	faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'
import { headers, projects, tasks } from '../app/mockData'
import { Dropdown, View, WhenSelect } from '../components'
import Placeholder from './Placeholder'

const WhenDisplay = ({ when }) => {
	return when?.toLocaleDateString() === new Date().toLocaleDateString() ? (
		<FontAwesomeIcon className='ml-1 w-3 h-3 text-yellow-400' icon={faStar} />
	) : when ? (
		<div className='ml-1 px-2 rounded text-xs font-semibold text-gray-600 bg-gray-200 select-none'>
			{when.toLocaleDateString(
				'en-us',
				(when - new Date()) / (1000 * 60 * 60 * 24) < 6 ? { weekday: 'short' } : { month: 'short', day: 'numeric' }
			)}
		</div>
	) : null
}

export const Task = ({ task, specialDisplay = false }) => {
	const project = projects.find((project) => project.id === task.projectId)

	return (
		<div className='flex items-center -mx-6 mt-1.5'>
			<WhenSelect
				target={<FontAwesomeIcon className='opacity-0 hover:opacity-100 w-3 h-3 p-1 -m-1 text-gray-400' icon={faCalendarDays} />}
			/>
			<input className='ml-3 mr-1' type='checkbox' defaultChecked={task.completed} />
			{!specialDisplay && <WhenDisplay when={task.when} />}
			<div className='ml-1 mr-1'>
				<div className='text-gray-800 truncate'>{task.title}</div>
				{specialDisplay && project && <div className='text-xs text-gray-400 truncate'>{project.title}</div>}
			</div>
			{!specialDisplay && task.notes && <FontAwesomeIcon className='w-3 h-3 text-gray-400' icon={faFile} />}
		</div>
	)
}

const Project = () => {
	const { projectId } = useParams()
	const project = projects.find((project) => project.id === Number(projectId))

	return tasks.filter((task) => task.projectId === project.id).length > 0 ? (
		<View>
			<View.Header title={project.title} description={project.description} icon={project.icon} color='text-blue-600' actionButton />
			<View.Content>
				{/* Tasks w/o headers */}
				<div className='mb-8'>
					{tasks
						.filter((task) => task.projectId === project.id && !task.headerId)
						.map((task) => (
							<Task key={task.title} task={task} />
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
									<Task key={task.title} task={task} />
								))}
						</div>
					))}
			</View.Content>
		</View>
	) : (
		<Placeholder title={project.title} icon={project.icon} color='text-blue-600' />
	)
}

export default Project
