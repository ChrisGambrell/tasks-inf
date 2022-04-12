import { Badge, Checkbox } from '@mantine/core'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { useHeader, useProject, useCreateTask, useEditTask, useDeleteTask } from '../../hooks'
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
	showHeader = false,
	showNotesIndicator = false,
	showProject = false,
	showWhen = false,
	onClick = () => {},
}) => {
	// TODO maybe pass project from list but if no project then query?
	const { data: project = {} } = useProject(task.project_id, Boolean(showProject && task.project_id))
	const { data: header = {} } = useHeader(task.header_id, Boolean(showHeader && task.header_id))
	const createTask = useCreateTask().mutate
	const editTask = useEditTask().mutate
	const deleteTask = useDeleteTask().mutate

	return (
		<div className='flex items-center' onClick={onClick}>
			<ContextMenu
				color='text-gray-900'
				background='bg-gray-100'
				target={
					<div className='flex items-center -mx-6 mt-1.5' onClick={onClick}>
						<DateSelect
							title='When'
							taskId={task.id}
							date={task.when}
							target={
								<FA className='opacity-0 hover:opacity-100 w-3 h-3 p-1 -m-1 -ml-2 text-gray-400' icon='calendar-days' />
							}
						/>
						<div className={`flex-grow flex items-center ml-1 ${selected && 'rounded-md bg-blue-200'}`}>
							<Checkbox
								className='ml-3 mr-1'
								size='xs'
								defaultChecked={task.completed}
								onChange={() =>
									editTask({
										taskId: task.id,
										data: { completed: !task.completed },
									})
								}
							/>
							{showCompletedWhen && <CompletedWhenDisplay when={task.completed_when} />}
							{showWhen && <WhenDisplay when={task.when} />}
							<div className='ml-1 mr-1'>
								<div className={`${secondary ? 'text-gray-400' : 'text-gray-800'} truncate`}>{task.title}</div>
								{showProject && project && <div className='text-xs text-gray-400 truncate'>{project.title}</div>}
								{showHeader && header && <div className='text-xs text-gray-400 truncate'>{header.title}</div>}
							</div>
							{showNotesIndicator && task.notes && <FA className='w-3 h-3 text-gray-400' icon='file' />}
						</div>
					</div>
				}>
				{/* hotkeys todo */}
				<DateSelect date={task.when} taskId={task.id} target={<ContextMenu.Item label='When...' hotKeys={['alt', 'S']} />} />
				<ContextMenu.Item label='Move...' hotKeys={['alt', 'shift', 'M']} onClick={() => console.log('TODO')} />
				<ContextMenu.Item label='Tags...' hotKeys={['alt', 'shift', 'T']} onClick={() => console.log('TODO')} />
				<DateSelect
					target={<ContextMenu.Item label='Deadline...' hotKeys={['alt', 'shift', 'D']} onClick={() => console.log('TODO')} />}
				/>
				<ContextMenu.Submenu label='Complete...'>
					<ContextMenu.Item
						label='Mark as Completed'
						hotKeys={['alt', 'K']}
						onClick={() => editTask({ taskId: task.id, data: { completed: true } })}
					/>
					{/* TODO Check next hotkey to make sure it isn't conflicting */}
					<ContextMenu.Item label='Mark as Canceled' hotKeys={['alt', 'shift', 'K']} onClick={() => console.log('TODO')} />
				</ContextMenu.Submenu>
				<ContextMenu.Submenu title='When' label='Shortcuts...'>
					<ContextMenu.Item
						label='Today'
						hotKeys={['alt', 'T']}
						onClick={() => editTask({ taskId: task.id, data: { when: new Date() } })}
					/>
					<ContextMenu.Item label='This Evening' hotKeys={['alt', 'E']} onClick={() => console.log('TODO')} />
					<ContextMenu.Item label='Someday' hotKeys={['alt', 'O']} onClick={() => console.log('TODO')} />
					<ContextMenu.Item
						label='Clear'
						hotKeys={['alt', 'R']}
						onClick={() => editTask({ taskId: task.id, data: { when: null } })}
					/>
				</ContextMenu.Submenu>

				<ContextMenu.Divider />

				<ContextMenu.Item label='Repeat...' hotKeys={['alt', 'shift', 'R']} onClick={() => console.log('TODO')} />
				<ContextMenu.Item label='Get Info...' onClick={() => console.log('TODO')} />
				<ContextMenu.Item label='Duplicate To-Do...' hotKeys={['alt', 'D']} onClick={() => createTask(task)} />
				<ContextMenu.Item label='Convert to Project...' onClick={() => console.log('TODO')} />
				<ContextMenu.Item label='Delete To-Do...' onClick={() => deleteTask(task.id)} />

				<ContextMenu.Divider />

				<ContextMenu.Item label='Remove From Project...' onClick={() => console.log('TODO')} />
			</ContextMenu>
		</div>
	)
}

export default Task
