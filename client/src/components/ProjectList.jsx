import { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@mantine/core'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { useTasks } from '../hooks'
import { TasksContext } from '../App'
import { ContextMenu } from '.'
import { DateSelect } from './Task'

const Project = ({ project }) => {
	const navigate = useNavigate()

	const { data: tasks = [] } = useTasks.all()
	const numTasks = tasks.filter((task) => task.project_id === project.id).length

	const [state, dispatch] = useContext(TasksContext)

	const useOnClickOutside = (ref, handler) => {
		useEffect(() => {
			const listener = (event) => {
				if (!ref.current || ref.current.contains(event.target)) return

				let current = event.srcElement
				while (current.parentElement) {
					if (['context-menu', 'date-select-body', 'move-menu-body', 'toolbar-button'].some((id) => current.id === id)) {
						return
					}
					current = current.parentElement
				}

				handler(event)
			}
			document.addEventListener('mousedown', listener)
			document.addEventListener('touchstart', listener)
			return () => {
				document.removeEventListener('mousedown', listener)
				document.removeEventListener('touchstart', listener)
			}
		}, [ref, handler])
	}

	const clickOutsideRef = useRef()

	useOnClickOutside(clickOutsideRef, () => {
		if (state.selectedProject.includes(project.id)) dispatch({ type: 'reset' })
	})

	return (
		<div ref={clickOutsideRef}>
			<div
				className='flex items-center select-none'
				onClick={() => dispatch({ type: 'set', payload: { selectedProject: [project.id], moveType: 'project' } })}
				onDoubleClick={() => navigate(`/projects/${project.id}`)}>
				<ContextMenu
					project={project}
					target={
						<div className='relative flex items-center w-full -translate-x-5 mt-1.5'>
							<div className='-translate-x-1'>
								<DateSelect
									title='When'
									value={project.when}
									// TODO onChange={handleEditWhen}
									target={<FA className='opacity-0 hover:opacity-100 w-3 h-3 text-gray-400' icon='calendar-days' />}
								/>
							</div>
							<div
								className={`flex items-center w-full p-0.25 rounded-md ${
									state.selectedProject.includes(project.id) && 'bg-blue-200'
								} ${state.contextedProject === project.id && 'bg-gray-200'}`}>
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
					}
				/>
			</div>
		</div>
	)
}

const ProjectList = ({ projects = [] }) => {
	return projects.map((project) => <Project key={project.id} project={project} />)
}

export default ProjectList
