import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDebouncedValue } from '@mantine/hooks'
import { openSpotlight } from '@mantine/spotlight'
import AutoSizeInput from 'react-input-autosize'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
	useEditArea,
	useDeleteArea,
	useCreateHeader,
	useProject,
	useCreateProject,
	useEditProject,
	useCreateTask,
	useDeleteProject,
} from '../hooks'
import { TasksContext } from '../App'
import { Dropdown, HotKeys, Tooltip } from '.'
import { DateSelect } from './Task'

const View = ({ children }) => {
	const [state, dispatch] = useContext(TasksContext)

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

				console.log(window.location.pathname.split('/')[window.location.pathname.split('/').findIndex((i) => i === 'areas') + 1])

				try {
					let { id } = await createTask.mutateAsync(values)
					dispatch({ type: 'set', payload: { selectedTask: [id], open: id } })
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
			onClick: () => console.log('TODO'),
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
			disabled: state.selectedTask.length === 0,
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
			onClick: () => dispatch({ type: 'set', payload: { move: state.selectedTask[0] } }),
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
				{/* TODO */}
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

const Header = ({ title, description, actionButton = false, icon, color = 'text-gray-400' }) => {
	const space =
		(window.location.pathname.includes('/areas') && 'area') || (window.location.pathname.includes('/projects') && 'project') || null
	const spaceId = Number(window.location.pathname.split('/')[window.location.pathname.split('/').findIndex((i) => i === `${space}s`) + 1])

	const navigate = useNavigate()

	const { data: project = {} } = useProject(spaceId, Boolean(space === 'project'))

	const editArea = useEditArea().mutate
	const deleteArea = useDeleteArea().mutate
	const createProject = useCreateProject().mutate
	const editProject = useEditProject().mutate
	const deleteProject = useDeleteProject().mutate

	const [editableTitle, setEditableTitle] = useState(title || '')
	const [debouncedTitle] = useDebouncedValue(editableTitle, 200)

	const handleEditTitle = () => {
		if (space === 'area') editArea({ area: spaceId, data: { title: debouncedTitle } })
		else if (space === 'project') editProject({ projectId: spaceId, data: { title: debouncedTitle } })
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
						/>
					</div>
				) : (
					<h2 className='text-3xl font-semibold'>{title}</h2>
				)}
				{actionButton && (
					<Dropdown>
						{space === 'project' && (
							<Dropdown.Item label='Complete Project' icon='circle-check' onClick={() => console.log('TODO')} />
						)}
						{/* TODO add date to send to DateSelect */}
						{/* TODO send it a taskId */}
						{space === 'project' && (
							<DateSelect
								title='When'
								target={<Dropdown.Item label='When' icon='calendar-days' onClick={() => console.log('TODO')} />}
							/>
						)}
						<Dropdown.Item label='Add Tags' icon='tag' onClick={() => console.log('TODO')} />
						{space === 'project' && (
							<DateSelect
								title='Deadline'
								hideQuickDates
								target={<Dropdown.Item label='Add Deadline' icon='flag' onClick={() => console.log('TODO')} />}
							/>
						)}

						<Dropdown.Divider />

						{space === 'project' && <Dropdown.Item label='Move' icon='arrow-right' onClick={() => console.log('TODO')} />}
						{space === 'project' && (
							<Dropdown.Item label='Repeat' icon='arrow-rotate-right' onClick={() => console.log('TODO')} />
						)}
						{space === 'project' && (
							// TODO should also duplicate all tasks and headers
							<Dropdown.Item label='Duplicate Project' icon='copy' onClick={() => createProject(project)} />
						)}
						<Dropdown.Item
							label={`Delete ${(space === 'area' && 'Area') || (space === 'project' && 'Project')}`}
							icon='trash'
							onClick={handleDelete}
						/>
					</Dropdown>
				)}
			</div>
			{description && <div className='text-sm text-gray-700'>{description}</div>}
		</div>
	)
}

const Content = ({ children }) => <>{children}</>

View.Header = Header
View.Content = Content
export default View
