import { Badge, Checkbox } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faFile, faStar } from '@fortawesome/free-solid-svg-icons'
import { projects } from '../app/mockData'
import { WhenSelect } from '.'

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
		<Badge classNames={{ root: 'ml-1 px-1.5 text-gray-600 bg-gray-200' }} radius='sm'>
			{when.toLocaleDateString(
				'en-us',
				when < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7)
					? { weekday: 'short' }
					: { month: 'short', day: 'numeric' }
			)}
		</Badge>
	) : null
}

const Task = ({
	task,
	secondary = false,
	selected = false,
	showCompletedWhen = false,
	showNotesIndicator = false,
	showProject = false,
	showWhen = false,
	onClick = () => {},
}) => {
	const project = projects.find((project) => project.id === task.projectId)

	return (
		<div className='flex items-center -mx-6 mt-1.5' onClick={onClick}>
			<WhenSelect
				target={
					<FontAwesomeIcon className='opacity-0 hover:opacity-100 w-3 h-3 p-1 -m-1 -ml-2 text-gray-400' icon={faCalendarDays} />
				}
			/>
			<div className={`flex-grow flex items-center ml-1 ${selected && 'rounded-md bg-blue-200'}`}>
				<Checkbox className='ml-3 mr-1' size='xs' defaultChecked={task.completed} />
				{showCompletedWhen && <CompletedWhenDisplay when={task.completedWhen} />}
				{showWhen && <WhenDisplay when={task.when} />}
				<div className='ml-1 mr-1'>
					<div className={`${secondary ? 'text-gray-400' : 'text-gray-800'} truncate`}>{task.title}</div>
					{showProject && project && <div className='text-xs text-gray-400 truncate'>{project.title}</div>}
				</div>
				{showNotesIndicator && task.notes && <FontAwesomeIcon className='w-3 h-3 text-gray-400' icon={faFile} />}
			</div>
		</div>
	)
}

export default Task
