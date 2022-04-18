import { useContext, useState } from 'react'
import { Popover } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { useCreateProject, useEditProject, useDeleteProject, useCreateTask, useEditTask, useDeleteTask, useProject } from '../hooks'
import { TasksContext } from '../App'
import { HotKeys } from '.'
import { DateSelect } from './Task'

const Divider = () => <hr className='my-1 border-gray-300' />

const Item = ({ label = '', hotKeys = [], disabled, onClick = () => {} }) => (
	<div
		className={`group flex items-center space-x-2 p-1 px-2 rounded ${disabled && 'text-gray-400'} ${
			!disabled && 'hover:bg-blue-500 hover:text-gray-50'
		}`}
		onClick={onClick}>
		<div className='flex-grow'>{label}</div>
		{hotKeys.length > 0 && (
			<div className='flex-none'>
				<HotKeys className='text-gray-400 group-hover:text-gray-50' keys={hotKeys} simple />
			</div>
		)}
	</div>
)

const SubmenuItem = ({ label = '', onClick = () => {} }) => (
	<div className='flex items-center space-x-2 p-1 px-2 rounded hover:bg-blue-500 hover:text-gray-50' onClick={onClick}>
		<div className='flex-grow'>{label}</div>
		<div className='flex-none'>
			<FA icon='chevron-right' />
		</div>
	</div>
)

const Submenu = ({ children, title, label }) => {
	const [open, setOpen] = useState(false)

	return (
		<Popover
			classNames={{ body: 'w-60 border-gray-300', popover: 'bg-gray-100', inner: 'p-1' }}
			target={
				<div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
					<SubmenuItem label={label} />
				</div>
			}
			radius='md'
			shadow='xl'
			opened={open}
			onClose={() => setOpen(false)}>
			<div className='flex flex-col select-none text-sm' onMouseEnter={() => setOpen(true)}>
				{title && <Item label={title} disabled />}
				{children}
			</div>
		</Popover>
	)
}

const ContextMenu = ({ project, task, target }) => {
	const [state, dispatch] = useContext(TasksContext)

	const { data: taskProject = {} } = useProject(task?.project_id, Boolean(task?.project_id))
	const createProject = useCreateProject().mutate
	const editProject = useEditProject().mutate
	const deleteProject = useDeleteProject().mutate

	const createTask = useCreateTask().mutate
	const editTask = useEditTask().mutate
	const deleteTask = useDeleteTask().mutate

	const [open, setOpen] = useState(false)

	const handleCreate = () => {
		if (project) createProject(project)
		else if (task) createTask(task)
	}

	const handleEditComplete = () => {
		if (project) console.log('ENHANCEMENT')
		else if (task) editTask({ taskId: task.id, data: { completed: true } })
	}

	const handleEditWhen = (when) => {
		if (project) console.log('ENHANCEMENT')
		else if (task) editTask({ taskId: task.id, data: { when } })
	}

	const handleEditDeadline = (deadline) => {
		if (project) console.log('ENHANCEMENT')
		else if (task) editTask({ taskId: task.id, data: { deadline } })
	}

	const handleRemove = () => {
		if (project) editProject({ projectId: project.id, data: { area_id: null } })
		else if (task) editTask({ taskId: task.id, data: { project_id: null } })
	}

	const handleDelete = () => {
		if (project) deleteProject(project.id)
		else if (task) deleteTask(task.id)
	}

	const showMove = () => {
		if (project) dispatch({ type: 'set', payload: { moveId: project.id } })
		else if (task) dispatch({ type: 'set', payload: { moveId: task.id } })
		setOpen(false)
	}

	const handleHotKey = (event) => {
		return (project && state.contextedProject === project.id) || (task && state.contextedTask === task.id)
			? event()
			: (project && state.contextedProject === -1 && state.selectedProject.includes(project.id)) ||
			  (task && state.contextedTask === -1 && state.selectedTask.includes(task.id))
			? event()
			: null
	}

	useHotkeys([
		['alt + shift + M', () => state.moveType && showMove()],
		['alt + D', () => handleHotKey(() => handleCreate())],
		['alt + K', () => handleHotKey(() => handleEditComplete())],
		['alt + R', () => handleHotKey(() => handleEditWhen(null))],
		['alt + T', () => handleHotKey(() => handleEditWhen(new Date()))],
	])

	return (
		<Popover
			classNames={{ body: 'w-60 border-gray-300', popover: 'bg-gray-100', inner: 'p-1', root: 'w-full' }}
			target={
				<div
					onContextMenu={(e) => {
						e.preventDefault()
						dispatch({
							type: 'set',
							payload:
								(project && { contextedProject: project.id, moveType: 'project' }) ||
								(task && { contextedTask: task.id, moveType: 'task' }) ||
								{},
						})
						setOpen(true)
					}}>
					{target}
				</div>
			}
			radius='md'
			shadow='xl'
			opened={open}
			onClose={() => {
				dispatch({ type: 'set', payload: (project && { contextedProject: -1 }) || (task && { contextedTask: -1 }) || {} })
				setOpen(false)
			}}>
			<div className='flex flex-col select-none text-sm' id='context-menu'>
				<DateSelect
					value={(project && project.when) || (task && task.when)}
					onChange={handleEditWhen}
					target={<Item label='When...' hotKeys={['alt', 'S']} />}
				/>
				<Item label='Move...' hotKeys={['alt', 'shift', 'M']} onClick={showMove} />
				<Item label='Tags...' hotKeys={['alt', 'shift', 'T']} onClick={() => console.log('TODO')} />
				<DateSelect
					title='Deadline'
					value={(project && project.deadline) || (task && task.deadline)}
					onChange={handleEditDeadline}
					hideQuickDates
					target={<Item label='Deadline...' hotKeys={['alt', 'shift', 'D']} />}
				/>
				<Submenu label='Complete...'>
					<Item label='Mark as Completed' hotKeys={['alt', 'K']} onClick={handleEditComplete} />
					<Item label='Mark as Canceled' hotKeys={['alt', 'shift', 'K']} onClick={() => console.log('TODO')} />
				</Submenu>
				<Submenu title='When' label='Shortcuts...'>
					<Item label='Today' hotKeys={['alt', 'T']} onClick={() => handleEditWhen(new Date())} />
					{/* TODO hotkey */}
					<Item label='This Evening' hotKeys={['alt', 'E']} onClick={() => console.log('TODO')} />
					{/* TODO hotkey */}
					<Item label='Someday' hotKeys={['alt', 'O']} onClick={() => console.log('TODO')} />
					<Item label='Clear' hotKeys={['alt', 'R']} onClick={() => handleEditWhen(null)} />
				</Submenu>

				<Divider />

				{/* TODO hotkey */}
				<Item label='Repeat...' hotKeys={['alt', 'shift', 'R']} onClick={() => console.log('TODO')} />
				{/* TODO kinda buggy may need to update project dates to actual dates */}
				<Item
					label='Get Info...'
					onClick={() =>
						window.alert(
							`Created on: ${
								(project && project.created_at.toLocaleDateString()) || (task && task.created_at.toLocaleDateString())
							}\nCompleted on: ${
								(project && project.completed_when.toLocaleDateString()) ||
								'-' ||
								(task && task.completed_when.toLocaleDateString()) ||
								'asdf'
							}`
						)
					}
				/>
				<Item label={`Duplicate ${(project && 'Project') || (task && 'To-Do')}...`} hotKeys={['alt', 'D']} onClick={handleCreate} />
				{task && (
					<Item
						label='Convert to Project...'
						onClick={() => {
							createProject({ ...task, description: task.notes, area_id: taskProject.area_id })
							deleteTask(task.id)
						}}
					/>
				)}
				<Item label={`Delete ${(project && 'Project') || (task && 'To-Do')}...`} onClick={handleDelete} />

				<Divider />

				<Item label={`Remove From ${(project && 'Area') || (task && 'Project')}...`} onClick={handleRemove} />
			</div>
		</Popover>
	)
}

export default ContextMenu
