import { useContext, useState } from 'react'
import { Badge, Checkbox } from '@mantine/core'
import { useClickOutside, useHotkeys } from '@mantine/hooks'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { TasksContext } from '../../App'
import { useHeader, useProject, useCreateTask, useEditTask, useDeleteTask } from '../../hooks'
import { ContextMenu } from '..'
import { DateSelect, TaskDetails } from '.'

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
	showCompletedWhen = false,
	showHeader = false,
	showNotesIndicator = false,
	showProject = false,
	showWhen = false,
}) => {
	// TODO maybe pass project from list but if no project then query?
	const { data: project = {} } = useProject(task.project_id, Boolean(showProject && task.project_id))
	const { data: header = {} } = useHeader(task.header_id, Boolean(showHeader && task.header_id))
	const createTask = useCreateTask().mutate
	const editTask = useEditTask().mutate
	const deleteTask = useDeleteTask().mutate

	const [state, dispatch] = useContext(TasksContext)

	const handleHotKey = (event) => {
		return state.contexted === task.id ? event() : state.contexted === -1 && state.selected.includes(task.id) ? event() : null
	}

	const handleEditWhen = (when) => {
		editTask({ taskId: task.id, data: { when } })
	}

	useHotkeys([
		[
			// FIXME this might be broken
			'backspace',
			() => handleHotKey(() => deleteTask(task.id)),
		],
		['escape', () => dispatch({ type: 'reset' })],
		['alt + D', () => handleHotKey(() => createTask(task))],
		['alt + K', () => handleHotKey(() => editTask({ taskId: task.id, data: { completed: true } }))],
		['alt + R', () => handleHotKey(() => editTask({ taskId: task.id, data: { when: null } }))],
		['alt + T', () => handleHotKey(() => editTask({ taskId: task.id, data: { when: new Date() } }))],
	])

	const clickOutsideRef = useClickOutside(() => {
		if (state.selected.includes(task.id)) dispatch({ type: 'reset' })
	})

	return (
		<div ref={clickOutsideRef}>
			{state.open === task.id ? (
				<TaskDetails task={task} />
			) : (
				<div
					className='flex items-center select-none'
					onClick={() => dispatch({ type: 'set', payload: { selected: [task.id] } })}
					onDoubleClick={() => dispatch({ type: 'set', payload: { open: task.id } })}>
					<ContextMenu
						taskId={task.id}
						target={
							<div className='relative flex items-center w-full -translate-x-5 mt-1.5'>
								<div className='-translate-x-1'>
									<DateSelect
										title='When'
										value={task.when}
										onChange={handleEditWhen}
										target={<FA className='opacity-0 hover:opacity-100 w-3 h-3 text-gray-400' icon='calendar-days' />}
									/>
								</div>
								<div
									className={`flex items-center w-full p-0.25 rounded-md ${
										state.selected.includes(task.id) && 'bg-blue-200'
									} ${state.contexted === task.id && 'bg-gray-200'}`}>
									<Checkbox
										className='ml-2 mr-1'
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
						<DateSelect
							value={task.when}
							onChange={handleEditWhen}
							target={<ContextMenu.Item label='When...' hotKeys={['alt', 'S']} />}
						/>
						<ContextMenu.Item label='Move...' hotKeys={['alt', 'shift', 'M']} onClick={() => console.log('TODO')} />
						<ContextMenu.Item label='Tags...' hotKeys={['alt', 'shift', 'T']} onClick={() => console.log('TODO')} />
						<DateSelect
							target={
								<ContextMenu.Item label='Deadline...' hotKeys={['alt', 'shift', 'D']} onClick={() => console.log('TODO')} />
							}
						/>
						<ContextMenu.Submenu label='Complete...'>
							<ContextMenu.Item
								label='Mark as Completed'
								hotKeys={['alt', 'K']}
								onClick={() => editTask({ taskId: task.id, data: { completed: true } })}
							/>
							{/* TODO Check next hotkey to make sure it isn't conflicting */}
							<ContextMenu.Item
								label='Mark as Canceled'
								hotKeys={['alt', 'shift', 'K']}
								onClick={() => console.log('TODO')}
							/>
						</ContextMenu.Submenu>
						<ContextMenu.Submenu title='When' label='Shortcuts...'>
							<ContextMenu.Item
								label='Today'
								hotKeys={['alt', 'T']}
								onClick={() => editTask({ taskId: task.id, data: { when: new Date() } })}
							/>
							{/* TODO hotkey */}
							<ContextMenu.Item label='This Evening' hotKeys={['alt', 'E']} onClick={() => console.log('TODO')} />
							{/* TODO hotkey */}
							<ContextMenu.Item label='Someday' hotKeys={['alt', 'O']} onClick={() => console.log('TODO')} />
							<ContextMenu.Item
								label='Clear'
								hotKeys={['alt', 'R']}
								onClick={() => editTask({ taskId: task.id, data: { when: null } })}
							/>
						</ContextMenu.Submenu>

						<ContextMenu.Divider />

						{/* TODO hotkey */}
						<ContextMenu.Item label='Repeat...' hotKeys={['alt', 'shift', 'R']} onClick={() => console.log('TODO')} />
						<ContextMenu.Item label='Get Info...' onClick={() => console.log('TODO')} />
						<ContextMenu.Item label='Duplicate To-Do...' hotKeys={['alt', 'D']} onClick={() => createTask(task)} />
						<ContextMenu.Item label='Convert to Project...' onClick={() => console.log('TODO')} />
						<ContextMenu.Item label='Delete To-Do...' onClick={() => deleteTask(task.id)} />

						<ContextMenu.Divider />

						{/* TODO hotkey */}
						<ContextMenu.Item label='Remove From Project...' onClick={() => console.log('TODO')} />
					</ContextMenu>
				</div>
			)}
		</div>
	)
}

export default Task
