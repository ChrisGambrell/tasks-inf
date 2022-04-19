import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Popover } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
	useArea,
	useHeaders,
	useCreateHeader,
	useProject,
	useCreateProject,
	useEditProject,
	useDeleteProject,
	useTasks,
	useCreateTask,
	useEditTask,
	useDeleteTask,
} from '../hooks'
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
				<HotKeys className={`text-gray-400 ${!disabled && 'group-hover:text-gray-50'}`} keys={hotKeys} simple />
			</div>
		)}
	</div>
)

const SubmenuItem = ({ label = '', onClick = () => {}, disabled }) => (
	<div
		className={`flex items-center space-x-2 p-1 px-2 rounded ${disabled && 'text-gray-400'} ${
			!disabled && 'hover:bg-blue-500 hover:text-gray-50'
		}`}
		onClick={onClick}>
		<div className='flex-grow'>{label}</div>
		<div className='flex-none'>
			<FA icon='chevron-right' />
		</div>
	</div>
)

const Submenu = ({ children, title, label, disabled }) => {
	const [open, setOpen] = useState(false)

	return (
		<Popover
			classNames={{ body: 'w-60 border-gray-300', popover: 'bg-gray-100', inner: 'p-1' }}
			target={
				<div onMouseEnter={() => !disabled && setOpen(true)} onMouseLeave={() => setOpen(false)}>
					<SubmenuItem label={label} disabled={disabled} />
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

const ContextMenu = ({ project, header, task, target }) => {
	const navigate = useNavigate()

	const [state, dispatch] = useContext(TasksContext)

	const { data: taskProject = {} } = useProject(task?.project_id, Boolean(task?.project_id))
	const { data: headerProject = {} } = useProject(header?.project_id, Boolean(header?.project_id))
	const createProject = useCreateProject().mutateAsync
	const editProject = useEditProject().mutate
	const deleteProject = useDeleteProject().mutate

	const { data: headerArea = {} } = useArea(headerProject?.area_id, Boolean(headerProject?.area_id))

	const { data: headers = [] } = useHeaders()
	const createHeader = useCreateHeader().mutateAsync

	const { data: tasks = [] } = useTasks()
	const createTask = useCreateTask()
	const editTask = useEditTask().mutate
	const deleteTask = useDeleteTask().mutate

	const [open, setOpen] = useState(false)

	const handleDuplicate = async () => {
		if (project) {
			try {
				let { id: project_id } = await createProject(project)
				tasks
					.filter((task) => task.project_id === project.id && task.header_id === null)
					.forEach((task) => createTask.mutate({ ...task, project_id }))

				headers
					.filter((header) => header.project_id === project.id)
					.forEach(async (header) => {
						let { id: header_id } = await createHeader({ ...header, project_id })
						tasks
							.filter((task) => task.project_id === project.id && task.header_id === header.id)
							.forEach((task) => createTask.mutate({ ...task, project_id, header_id }))
					})
			} catch (err) {
				console.error(err)
			}
		} else if (header) {
			try {
				let { id } = await createHeader(header)
				tasks.filter((task) => task.header_id === header.id).forEach((task) => createTask.mutate({ ...task, header_id: id }))
			} catch (err) {
				console.error(err)
			}
		} else if (task) createTask.mutate(task)
	}

	const handleEditComplete = () => {
		if (project) console.log('ENHANCEMENT')
		else if (header) console.log('todo')
		else if (task) editTask({ taskId: task.id, data: { completed: true } })
	}

	const handleEditWhen = (when) => {
		if (project) editProject({ projectId: project.id, data: { when } })
		else if (task) editTask({ taskId: task.id, data: { when } })
	}

	const handleEditDeadline = (deadline) => {
		if (project) console.log('ENHANCEMENT')
		else if (task) editTask({ taskId: task.id, data: { deadline } })
	}

	const handleConvertToProject = async () => {
		if (header) {
			try {
				let { id } = await createProject({ ...header, icon: 'circle', area_id: headerArea.id ? headerArea.id : null })
				await tasks
					.filter((task) => task.header_id === header.id)
					.forEach((task) => createTask.mutateAsync({ ...task, header_id: null, project_id: id }))
				navigate(`/projects/${id}`)
			} catch (err) {
				console.error(err)
			}
		} else if (task) {
			try {
				let { id } = await createProject({ ...task, description: task.notes, area_id: taskProject.area_id, icon: 'circle' })
				deleteTask(task.id)
				navigate(`/projects/${id}`)
			} catch (err) {
				console.error(err)
			}
		}
	}

	const handleRemove = () => {
		if (project) editProject({ projectId: project.id, data: { area_id: null } })
		else if (task) editTask({ taskId: task.id, data: { project_id: null } })
	}

	const handleDelete = () => {
		if (project) deleteProject(project.id)
		else if (header) console.log('todo')
		else if (task) deleteTask(task.id)
	}

	const showMove = () => {
		if (project) dispatch({ type: 'set', payload: { moveId: project.id } })
		else if (header) console.log('todo')
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
		['alt + D', () => handleHotKey(() => handleDuplicate())],
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
								(header && { contextedHeader: header.id, moveType: 'header' }) ||
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
					target={<Item label='When...' hotKeys={['alt', 'S']} disabled={header} />}
				/>
				<Item label='Move...' hotKeys={['alt', 'shift', 'M']} onClick={showMove} />
				<Item label='Tags...' hotKeys={['alt', 'shift', 'T']} onClick={() => console.log('TODO')} disabled={header} />
				<DateSelect
					title='Deadline'
					value={(project && project.deadline) || (task && task.deadline)}
					onChange={handleEditDeadline}
					hideQuickDates
					target={<Item label='Deadline...' hotKeys={['alt', 'shift', 'D']} disabled={header} />}
				/>
				<Submenu label='Complete...'>
					<Item label='Mark as Completed' hotKeys={['alt', 'K']} onClick={handleEditComplete} />
					<Item label='Mark as Canceled' hotKeys={['alt', 'shift', 'K']} onClick={() => console.log('TODO')} disabled={header} />
				</Submenu>
				<Submenu title='When' label='Shortcuts...' disabled={header}>
					<Item label='Today' hotKeys={['alt', 'T']} onClick={() => handleEditWhen(new Date())} />
					{/* TODO hotkey */}
					<Item label='This Evening' hotKeys={['alt', 'E']} onClick={() => console.log('TODO')} />
					{/* TODO hotkey */}
					<Item label='Someday' hotKeys={['alt', 'O']} onClick={() => console.log('TODO')} />
					<Item label='Clear' hotKeys={['alt', 'R']} onClick={() => handleEditWhen(null)} />
				</Submenu>

				<Divider />

				{/* TODO hotkey */}
				<Item label='Repeat...' hotKeys={['alt', 'shift', 'R']} onClick={() => console.log('TODO')} disabled={header} />
				{/* TODO kinda buggy may need to update project dates to actual dates */}
				{!header && (
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
				)}
				<Item
					label={`Duplicate ${(project && 'Project') || (header && 'Header') || (task && 'To-Do')}...`}
					hotKeys={['alt', 'D']}
					onClick={handleDuplicate}
				/>
				{(header || task) && <Item label='Convert to Project...' onClick={handleConvertToProject} />}
				<Item label={`Delete ${(project && 'Project') || (header && 'Heading') || (task && 'To-Do')}...`} onClick={handleDelete} />

				<Divider />

				<Item
					label={`Remove From ${(project && 'Area') || ((header || task) && 'Project')}...`}
					onClick={handleRemove}
					disabled={header}
				/>
			</div>
		</Popover>
	)
}

export default ContextMenu
