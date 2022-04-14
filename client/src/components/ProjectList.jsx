import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@mantine/core'
import { useClickOutside } from '@mantine/hooks'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { useHeaders, useProject, useTasks } from '../hooks'
import { TasksContext } from '../App'
import { ContextMenu } from '.'
import { DateSelect } from './Task'

const Project = ({ project }) => {
	const navigate = useNavigate()

	const { data: tasks } = useTasks.all()
	const numTasks = tasks.filter((task) => task.project_id === project.id).length

	const [state, dispatch] = useContext(TasksContext)

	const clickOutsideRef = useClickOutside(() => {
		if (state.selectedProject.includes(project.id)) dispatch({ type: 'reset' })
	})

	return (
		<div ref={clickOutsideRef}>
			<div
				className='flex items-center select-none'
				onClick={() => dispatch({ type: 'set', payload: { selectedProject: [project.id] } })}
				onDoubleClick={() => navigate(`/projects/${project.id}`)}>
				<ContextMenu
					// TODO fix the passing of project to context menu
					taskId={project.id}
					target={
						<div className='relative flex items-center w-full -translate-x-5 mt-1.5'>
							<div className='-translate-x-1'>
								<DateSelect
									title='When'
									value={project.when}
									// onChange={handleEditWhen}
									target={<FA className='opacity-0 hover:opacity-100 w-3 h-3 text-gray-400' icon='calendar-days' />}
								/>
							</div>
							<div
								className={`flex items-center w-full p-0.25 rounded-md ${
									state.selectedProject.includes(project.id) && 'bg-blue-200'
								} ${state.contexted === project.id && 'bg-gray-200'}`}>
								<div className='flex items-center space-x-2 ml-1 mr-1'>
									<FA className='text-blue-600' icon={project.icon} />
									<div
										className={`${!project.title ? 'text-gray-400' : 'font-semibold text-gray-800'} ${
											!project.title && 'font-light'
										} truncate`}>
										{project.title || 'New Project'}
									</div>
									<Badge
										classNames={{
											root: `ml-1 py-0 px-1 border-1.5 border-gray-300 bg-transparent font-semibold text-gray-400 ${
												state.selectedProject.includes(project.id) && 'border-gray-400 text-gray-500'
											}`,
										}}
										radius='sm'>
										{numTasks}
									</Badge>
								</div>
							</div>
						</div>
					}>
					{/* TODO should this be its own component? */}
					<DateSelect
						value={project.when}
						// onChange={handleEditWhen}
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
							// onClick={() => editTask({ taskId: task.id, data: { completed: true } })}
						/>
						<ContextMenu.Item label='Mark as Canceled' hotKeys={['alt', 'shift', 'K']} onClick={() => console.log('TODO')} />
					</ContextMenu.Submenu>
					<ContextMenu.Submenu title='When' label='Shortcuts...'>
						<ContextMenu.Item
							label='Today'
							hotKeys={['alt', 'T']}
							// onClick={() => editTask({ taskId: task.id, data: { when: new Date() } })}
						/>
						{/* TODO hotkey */}
						<ContextMenu.Item label='This Evening' hotKeys={['alt', 'E']} onClick={() => console.log('TODO')} />
						{/* TODO hotkey */}
						<ContextMenu.Item label='Someday' hotKeys={['alt', 'O']} onClick={() => console.log('TODO')} />
						<ContextMenu.Item
							label='Clear'
							hotKeys={['alt', 'R']}
							// onClick={() => editTask({ taskId: task.id, data: { when: null } })}
						/>
					</ContextMenu.Submenu>

					<ContextMenu.Divider />

					{/* TODO hotkey */}
					<ContextMenu.Item label='Repeat...' hotKeys={['alt', 'shift', 'R']} onClick={() => console.log('TODO')} />
					<ContextMenu.Item label='Get Info...' onClick={() => console.log('TODO')} />
					{/* <ContextMenu.Item label='Duplicate To-Do...' hotKeys={['alt', 'D']} onClick={() => createTask(task)} /> */}
					<ContextMenu.Item label='Convert to Project...' onClick={() => console.log('TODO')} />
					{/* <ContextMenu.Item label='Delete To-Do...' onClick={() => deleteTask(task.id)} /> */}

					<ContextMenu.Divider />

					<ContextMenu.Item
						label='Remove From Project...'
						// onClick={() => editTask({ taskId: task.id, data: { project_id: null } })}
					/>
				</ContextMenu>
			</div>
		</div>
	)
}

const ProjectList = ({ projects = [] }) => {
	return projects.map((project) => <Project key={project.id} project={project} />)
}

export default ProjectList
