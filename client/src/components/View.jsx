import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Radio, RadioGroup } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { openSpotlight } from '@mantine/spotlight'
import AutoSizeInput from 'react-input-autosize'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
	useEditArea,
	useDeleteArea,
	useHeaders,
	useCreateHeader,
	useEditHeader,
	useProject,
	useCreateProject,
	useEditProject,
	useTasks,
	useCreateTask,
	useEditTask,
	useDeleteProject,
	useDeleteTask,
	useDeleteHeader,
} from '../hooks'
import { TasksContext } from '../App'
import { Dropdown, HotKeys, Tooltip } from '.'
import { DateSelect } from './Task'

const View = ({ children }) => {
	const navigate = useNavigate()

	const [state, dispatch] = useContext(TasksContext)

	const createProject = useCreateProject()
	const createHeader = useCreateHeader()
	const createTask = useCreateTask()

	const toolbarButtons = [
		{
			icon: 'plus',
			disabled: ['anytime', 'someday', 'logbook', 'trash'].some((endpoint) => window.location.pathname.includes(endpoint)),
			tooltip: (
				<div className='flex flex-col p-2'>
					<div className='flex justify-between'>
						<div className='font-semibold'>New To-Do</div>
						<div>
							<HotKeys keys={['alt', 'N']} />
						</div>
					</div>
					<div className='flex-wrap'>You can also just press your spacebar.</div>
				</div>
			),
			onClick: async () => {
				let values = {}
				if (window.location.pathname.includes('today')) values['when'] = new Date()
				else if (window.location.pathname.includes('upcoming'))
					values['when'] = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)
				// TODO anytime
				// TODO someday
				else if (window.location.pathname.includes('areas/'))
					values['area_id'] =
						window.location.pathname.split('/')[window.location.pathname.split('/').findIndex((i) => i === 'areas') + 1]
				else if (window.location.pathname.includes('projects/'))
					values['project_id'] =
						window.location.pathname.split('/')[window.location.pathname.split('/').findIndex((i) => i === 'projects') + 1]

				try {
					let { id } = await createTask.mutateAsync(values)
					dispatch({ type: 'set', payload: { selectedTask: [id], open: id, moveType: 'task' } })
				} catch (err) {
					console.error(err)
				}
			},
		},
		{
			icon: 'square-plus',
			disabled: false,
			tooltip: (
				<div className='flex flex-col p-2'>
					<div className='flex justify-between'>
						<div className='font-semibold'>New Heading</div>
						<div>
							<HotKeys keys={['alt', 'shift', 'N']} />
						</div>
					</div>
					<div className='flex-wrap'>Divide your project into categories or milestones.</div>
				</div>
			),
			onClick: () => {
				let projectId =
					window.location.pathname.split('/')[window.location.pathname.split('/').findIndex((i) => i === 'projects') + 1]
				createHeader.mutate({ project_id: projectId })
			},
			show: '/projects',
		},
		{
			icon: 'circle-plus',
			disabled: false,
			tooltip: (
				<div className='flex flex-col p-2'>
					<div className='flex justify-between'>
						<div className='font-semibold'>New Project</div>
						<div>
							<HotKeys keys={['meta', 'alt', 'N']} />
						</div>
					</div>
					<div className='flex-wrap'>Create a new project.</div>
				</div>
			),
			onClick: async () => {
				try {
					let { id } = await createProject.mutateAsync({
						area_id:
							window.location.pathname.split('/')[window.location.pathname.split('/').findIndex((i) => i === 'areas') + 1],
						icon: 'circle',
					})
					navigate(`/projects/${id}`)
				} catch (err) {
					console.error(err)
				}
			},
			show: '/areas',
		},
		{
			icon: 'calendar-days',
			disabled: true,
			tooltip: (
				<div className='flex flex-col p-2'>
					<div className='flex justify-between'>
						<div className='font-semibold'>When</div>
						<div>
							<HotKeys keys={['alt', 's']} />
						</div>
					</div>
					<div className='flex-wrap'>Decide when to start. Today or later?</div>
				</div>
			),
			onClick: () => console.log('TODO'),
		},
		{
			icon: 'arrow-right',
			disabled: state.selectedProject.length === 0 && state.selectedHeader.length === 0 && state.selectedTask.length === 0,
			tooltip: (
				<div className='flex flex-col p-2'>
					<div className='flex justify-between'>
						<div className='font-semibold'>Move</div>
						<div>
							<HotKeys keys={['alt', 'shift', 'M']} />
						</div>
					</div>
					<div className='flex-wrap'>Move selected items to another list.</div>
				</div>
			),
			onClick: () =>
				dispatch({
					type: 'set',
					payload: {
						moveId:
							(state.selectedProject.length > 0 && state.selectedProject[0]) ||
							(state.selectedHeader.length > 0 && state.selectedHeader[0]) ||
							(state.selectedTask.length > 0 && state.selectedTask[0]),
					},
				}),
		},
		{
			icon: 'magnifying-glass',
			disabled: false,
			tooltip: (
				<div className='flex flex-col p-2'>
					<div className='flex justify-between'>
						<div className='font-semibold'>Quick Find</div>
						<div>
							<HotKeys keys={['alt', 'F']} />
						</div>
					</div>
					<div className='flex-wrap'>Quickly switch lists, find to-dos, or search for tags.</div>
				</div>
			),
			onClick: openSpotlight,
		},
	]

	return (
		<div className='flex flex-col justify-between w-3/4 shadow-lg'>
			<div className='flex justify-center overflow-y-scroll h-full'>
				<div className='flex flex-col mt-6 w-3/4 px-4'>{children}</div>
			</div>

			<div className='flex justify-center items-center h-10 px-2 border-t text-gray-500'>
				{toolbarButtons
					.filter((button) => window.location.pathname.includes(button.show ? button.show : ''))
					.map((button, i) => (
						<div key={i} id='toolbar-button'>
							{button.tooltip ? (
								<Tooltip
									className='w-64'
									target={
										<button
											className='flex items-center m-1 py-2 px-10 rounded text-sm border border-white hover:border-gray-200 active:bg-gray-200 disabled:border-white disabled:text-gray-300 disabled:bg-white'
											disabled={button.disabled}
											onClick={button.onClick}>
											<FA icon={button.icon} />
										</button>
									}>
									{button.tooltip}
								</Tooltip>
							) : (
								<button
									className='flex items-center m-1 py-2 px-10 rounded text-sm border border-white hover:border-gray-200 active:bg-gray-200 disabled:border-white disabled:text-gray-300 disabled:bg-white'
									disabled={button.disabled}
									onClick={button.onClick}>
									<FA icon={button.icon} />
								</button>
							)}
						</div>
					))}
			</div>
		</div>
	)
}

const Header = ({ title, description, when, deadline, actionButton = false, icon, color = 'text-gray-400' }) => {
	const space =
		(window.location.pathname.includes('/areas') && 'area') || (window.location.pathname.includes('/projects') && 'project') || null
	const spaceId = Number(window.location.pathname.split('/')[window.location.pathname.split('/').findIndex((i) => i === `${space}s`) + 1])

	const navigate = useNavigate()

	const [, dispatch] = useContext(TasksContext)

	const { data: project = {} } = useProject(spaceId, Boolean(space === 'project'))
	const { data: headers = [] } = useHeaders()
	const { data: tasks = [] } = useTasks()

	const editArea = useEditArea().mutate
	const deleteArea = useDeleteArea().mutate
	const createProject = useCreateProject().mutateAsync
	const editProject = useEditProject().mutate
	const deleteProject = useDeleteProject().mutate
	const createHeader = useCreateHeader().mutateAsync
	const createTask = useCreateTask().mutateAsync

	const [editableTitle, setEditableTitle] = useState(title || '')
	const [debouncedTitle] = useDebouncedValue(editableTitle, 200)

	const handleOpenDateSelect = (attr) => {
		dispatch({
			type: 'set',
			payload: {
				dateSelectType: 'project',
				dateSelectId: spaceId,
				dateSelectAttr: attr,
			},
		})
	}

	const handleEditTitle = () => {
		if (space === 'area') editArea({ areaId: spaceId, data: { title: debouncedTitle } })
		else if (space === 'project') editProject({ projectId: spaceId, data: { title: debouncedTitle } })
	}

	const handleDuplicateProject = async () => {
		try {
			let { id: project_id } = await createProject(project)
			await tasks
				.filter((task) => task.project_id === project.id && !task.header_id)
				.forEach(async (task) => await createTask({ ...task, project_id }))

			await headers
				.filter((header) => header.project_id === project.id)
				.forEach(async (header) => {
					let { id: header_id } = await createHeader({ ...header, project_id })
					await tasks
						.filter((task) => task.project_id === project.id && task.header_id === header.id)
						.forEach(async (task) => await createTask({ ...task, project_id, header_id }))
				})

			navigate(`/projects/${project_id}`)
		} catch (err) {
			console.error(err)
		}
	}

	const handleDelete = () => {
		if (space === 'area') deleteArea(spaceId)
		else if (space === 'project') deleteProject(spaceId)

		navigate('/')
		window.location.reload()
	}

	useEffect(() => debouncedTitle !== title && debouncedTitle.trim() !== '' && handleEditTitle(), [debouncedTitle])
	useEffect(() => setEditableTitle(title || ''), [title])

	return (
		<div className='flex flex-col space-y-2'>
			<div className='flex items-center'>
				{icon && <FA className={`flex-none w-6 h-6 mr-3 ${color}`} icon={icon} />}
				{space === 'area' || space === 'project' ? (
					<div className='flex-none font-semibold text-3xl'>
						<AutoSizeInput
							inputStyle={{ outline: 'none', fontWeight: 600 }}
							value={editableTitle}
							onChange={(e) => setEditableTitle(e.target.value)}
							placeholder={(space === 'area' && 'New Area') || (space === 'project' && 'New Project')}
							autoFocus={editableTitle === ''}
						/>
					</div>
				) : (
					<h2 className='text-3xl font-semibold'>{title}</h2>
				)}
				{actionButton && (
					<Dropdown>
						{space === 'project' && (
							<Dropdown.Item
								label='Complete Project'
								icon='circle-check'
								onClick={() =>
									dispatch({ type: 'set', payload: { completedMenuType: 'project', completedMenuId: project.id } })
								}
							/>
						)}
						{space === 'project' && (
							<Dropdown.Item label='When' icon='calendar-days' onClick={() => handleOpenDateSelect('when')} />
						)}
						<Dropdown.Item label='Add Tags' icon='tag' onClick={() => console.log('TODO')} />
						{space === 'project' && (
							<Dropdown.Item label='Add Deadline' icon='flag' onClick={() => handleOpenDateSelect('deadline')} />
						)}

						<Dropdown.Divider />

						{space === 'project' && (
							<Dropdown.Item
								label='Move'
								icon='arrow-right'
								onClick={() => dispatch({ type: 'set', payload: { moveType: 'project', moveId: project.id } })}
							/>
						)}
						{space === 'project' && (
							<Dropdown.Item label='Repeat' icon='arrow-rotate-right' onClick={() => console.log('TODO')} />
						)}
						{space === 'project' && <Dropdown.Item label='Duplicate Project' icon='copy' onClick={handleDuplicateProject} />}
						<Dropdown.Item
							label={`Delete ${(space === 'area' && 'Area') || (space === 'project' && 'Project')}`}
							icon='trash'
							onClick={handleDelete}
						/>
					</Dropdown>
				)}
			</div>
			<div className='border-t'>
				{when && (
					<div className='border-b py-0.5'>
						<div
							className='group flex items-center space-x-1 max-w-fit pl-1 rounded border select-none border-white text-sm text-gray-800 hover:border-gray-300 active:bg-gray-300'
							onClick={() => handleOpenDateSelect('when')}>
							<FA
								className={
									project.when.toLocaleDateString() === new Date().toLocaleDateString()
										? 'text-yellow-400'
										: 'text-red-500'
								}
								icon={project.when.toLocaleDateString() === new Date().toLocaleDateString() ? 'star' : 'calendar-days'}
							/>
							<div className='font-semibold'>
								{project.when.toLocaleDateString() === new Date().toLocaleDateString()
									? 'Today'
									: project.when.toLocaleDateString() ===
									  new Date(
											new Date().getFullYear(),
											new Date().getMonth(),
											new Date().getDate() + 1
									  ).toLocaleDateString()
									? 'Tomorrow'
									: project.when.toLocaleDateString(
											'en-us',
											project.when <
												new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7)
												? { weekday: 'long' }
												: { weekday: 'short', month: 'long', day: 'numeric' }
									  )}
							</div>
							<FA
								className='w-2.5 h-2.5 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-gray-200'
								icon='x'
								onClick={() => editProject({ projectId: project.id, data: { when: null } })}
							/>
						</div>
					</div>
				)}
				{deadline && (
					<div className='border-b py-0.5'>
						<div
							className={`group flex items-center space-x-1 max-w-fit pl-1 rounded border select-none border-white text-sm ${
								deadline.toLocaleDateString() === new Date().toLocaleDateString() ? 'text-red-500' : 'text-gray-800'
							} hover:border-gray-300 active:bg-gray-300`}
							onClick={() => handleOpenDateSelect('deadline')}>
							<FA icon='flag' />
							<div className='font-semibold'>
								Deadline: {deadline.toLocaleDateString('en-us', { weekday: 'short', month: 'short', day: 'numeric' })}
							</div>
							<FA
								className='w-2.5 h-2.5 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-gray-200'
								icon='x'
								onClick={() => editProject({ projectId: project.id, data: { deadline: null } })}
							/>
						</div>
					</div>
				)}
			</div>
			{description && <div className='text-sm text-gray-700'>{description}</div>}
		</div>
	)
}

const Content = ({ children }) => {
	const navigate = useNavigate()

	const [state, dispatch] = useContext(TasksContext)

	const { data: project = {} } = useProject(
		state.completedMenuId,
		Boolean(state.completedMenuType === 'project' && state.completedMenuId !== -1)
	)
	const deleteProject = useDeleteProject().mutate

	const { data: headers = [] } = useHeaders()
	const editHeader = useEditHeader().mutateAsync
	const deleteHeader = useDeleteHeader().mutateAsync

	const { data: tasks = [] } = useTasks()
	const editTask = useEditTask().mutateAsync
	const deleteTask = useDeleteTask().mutateAsync

	const [remainingAction, setRemainingAction] = useState('complete')

	const handleComplete = async () => {
		if (state.completedMenuType === 'project') {
			try {
				await tasks.filter((task) => task.project_id === state.completedMenuId).forEach(async (task) => await deleteTask(task.id))
				await headers
					.filter((header) => header.project_id === state.completedMenuId)
					.forEach(async (header) => await deleteHeader(header.id))
				deleteProject(project.id)
			} catch (err) {
				console.error(err)
			}
		} else if (state.completedMenuType === 'header') {
			await editHeader({ headerId: state.completedMenuId, data: { completed: true } })
			await tasks
				.filter((task) => task.header_id === state.completedMenuId)
				.forEach(async (task) => await editTask({ taskId: task.id, data: { completed: true } }))
		}

		if (window.location.pathname.includes(`/projects/${state.completedMenuId}`)) navigate('/inbox')
		dispatch({ type: 'reset' })
	}

	const handleAction = () => {
		if (remainingAction === 'complete') handleComplete()
		else if (remainingAction === 'cancel') console.log('todo')

		dispatch({ type: 'set', payload: { completedMenuType: null, completedMenuId: -1 } })
	}

	return (
		<>
			<DateSelect />
			<Modal
				id='complete-modal'
				opened={state.completedMenuType && state.completedMenuId !== -1}
				onClose={() => dispatch({ type: 'set', payload: { completedMenuType: null, completedMenuId: -1 } })}
				withCloseButton={false}>
				<div className='font-semibold'>Are you sure you want to archive this heading?</div>
				<div className='mt-2 text-sm'>
					This heading still contains {tasks.filter((task) => task.header_id === state.completedMenuId && !task.completed).length}{' '}
					to-dos that you haven't completed. What would you like to do with them?
				</div>
				<div className='my-2'>
					<RadioGroup value={remainingAction} onChange={setRemainingAction}>
						<Radio value='complete' label='Mark remaining to-dos as completed' />
						<Radio value='cancel' label='Mark remaining to-dos as canceled' />
					</RadioGroup>
				</div>
				<div className='flex justify-end mt-6 space-x-2'>
					<div
						className='flex justify-center w-24 rounded border border-gray-200 select-none active:bg-gray-100'
						onClick={() => dispatch({ type: 'set', payload: { completedMenuType: null, completedMenuId: -1 } })}>
						Cancel
					</div>
					<div
						className='flex justify-center w-24 rounded border border-gray-200 bg-blue-500 text-white select-none active:bg-blue-600'
						onClick={handleAction}>
						OK
					</div>
				</div>
			</Modal>
			{children}
		</>
	)
}

View.Header = Header
View.Content = Content
export default View
