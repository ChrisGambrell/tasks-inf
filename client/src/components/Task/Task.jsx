import { Badge, Checkbox } from '@mantine/core'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { projects } from '../../app/mockData'
import { ContextMenu } from '..'
import { DateSelect } from '.'

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
		<FA className='ml-1 w-3 h-3 text-yellow-400' icon='star' />
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
		<div className='flex items-center' onClick={onClick}>
			<ContextMenu
				color='text-gray-900'
				background='bg-gray-100'
				target={
					<div className='flex items-center -mx-6 mt-1.5' onClick={onClick}>
						<DateSelect
							title='When'
							date={task.when}
							target={
								<FA className='opacity-0 hover:opacity-100 w-3 h-3 p-1 -m-1 -ml-2 text-gray-400' icon='calendar-days' />
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
							{showNotesIndicator && task.notes && <FA className='w-3 h-3 text-gray-400' icon='file' />}
						</div>
					</div>
				}>
				<ContextMenu.Item label='When...' hotKeys={['alt', 'S']} onClick={() => console.log('TODO')} />
				<ContextMenu.Item label='Move...' hotKeys={['alt', 'shift', 'M']} onClick={() => console.log('TODO')} />
				<ContextMenu.Item label='Tags...' hotKeys={['alt', 'shift', 'T']} onClick={() => console.log('TODO')} />
				<ContextMenu.Item label='Deadline...' hotKeys={['alt', 'shift', 'D']} onClick={() => console.log('TODO')} />
				<ContextMenu.Submenu label='Complete...' onClick={() => console.log('TODO')}>
					<ContextMenu.Item label='Mark as Completed' hotKeys={['alt', 'K']} onClick={() => console.log('TODO')} />
					{/* TODO Check next hotkey to make sure it isn't conflicting */}
					<ContextMenu.Item label='Mark as Canceled' hotKeys={['alt', 'shift', 'K']} onClick={() => console.log('TODO')} />
				</ContextMenu.Submenu>
				<ContextMenu.Submenu title='When' label='Shortcuts...' onClick={() => console.log('TODO')}>
					<ContextMenu.Item label='Today' hotKeys={['alt', 'T']} onClick={() => console.log('TODO')} />
					<ContextMenu.Item label='This Evening' hotKeys={['alt', 'E']} onClick={() => console.log('TODO')} />
					<ContextMenu.Item label='Someday' hotKeys={['alt', 'O']} onClick={() => console.log('TODO')} />
					<ContextMenu.Item label='Clear' hotKeys={['alt', 'R']} onClick={() => console.log('TODO')} />
				</ContextMenu.Submenu>

				<ContextMenu.Divider />

				<ContextMenu.Item label='Repeat...' hotKeys={['alt', 'shift', 'R']} onClick={() => console.log('TODO')} />
				<ContextMenu.Item label='Get Info...' hotKeys={[]} onClick={() => console.log('TODO')} />
				<ContextMenu.Item label='Duplicate To-Do...' hotKeys={['alt', 'D']} onClick={() => console.log('TODO')} />
				<ContextMenu.Item label='Convert to Project...' hotKeys={[]} onClick={() => console.log('TODO')} />
				<ContextMenu.Item label='Delete To-Do...' hotKeys={[]} onClick={() => console.log('TODO')} />

				<ContextMenu.Divider />

				<ContextMenu.Item label='Remove From Project...' hotKeys={[]} onClick={() => console.log('TODO')} />
			</ContextMenu>
		</div>
	)
}

export default Task
