import { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Checkbox } from '@mantine/core'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { useArea, useTasks } from '../hooks'
import { TasksContext } from '../App'
import { ContextMenu } from '.'

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

const Project = ({ project, showArea = false, showComplete = false, showWhen = false }) => {
	const navigate = useNavigate()

	const { data: area = {} } = useArea(project.area_id, Boolean(showArea && project.area_id))

	const { data: tasksCollection = [] } = useTasks.all()
	const tasks = tasksCollection.filter((task) => task.project_id === project.id)

	const [state, dispatch] = useContext(TasksContext)

	const useOnClickOutside = (ref, handler) => {
		useEffect(() => {
			const listener = (event) => {
				if (!ref.current || ref.current.contains(event.target)) return

				let current = event.srcElement
				while (current.parentElement) {
					if (
						['complete-modal', 'context-menu', 'date-select', 'move-menu', 'toolbar-button'].some((id) =>
							current.id.includes(id)
						)
					) {
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
								<FA
									className='opacity-0 hover:opacity-100 w-3 h-3 text-gray-400'
									icon='calendar-days'
									onClick={() =>
										dispatch({
											type: 'set',
											payload: {
												dateSelectType: 'project',
												dateSelectId: project.id,
												dateSelectAttr: 'when',
											},
										})
									}
								/>
							</div>
							<div
								className={`flex items-center w-full p-0.25 rounded-md ${
									state.selectedProject.includes(project.id) && 'bg-blue-200'
								} ${state.contextedProject === project.id && 'bg-gray-200'}`}>
								<div className={`flex-grow flex items-center space-x-1 ${!showComplete && 'ml-1'} mr-1`}>
									{showComplete ? (
										<Checkbox
											className='ml-2 mr-1'
											classNames={{ input: 'rounded-full border-2 border-blue-600' }}
											size='xs'
											onChange={() =>
												dispatch({
													type: 'set',
													payload: { completedMenuType: 'project', completedMenuId: project.id },
												})
											}
										/>
									) : (
										<FA className='text-blue-600' icon={project.icon || 'circle-notch'} />
									)}
									{showWhen && <WhenDisplay when={project.when} />}
									<div className='flex flex-col'>
										<div className='flex items-center'>
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
												{tasks.length}
											</Badge>
										</div>
										{showArea && area && <div className='text-xs text-gray-400 truncate'>{area.title}</div>}
									</div>
								</div>
								{project.deadline && (
									<div
										className={`flex-none flex items-center space-x-1 mr-1 ${
											project.deadline.toLocaleDateString() === new Date().toLocaleDateString()
												? 'text-red-500'
												: 'text-gray-500'
										}`}>
										<FA className='w-3 h-3' icon='flag' />
										<div className='text-sm'>
											{project.deadline.toLocaleDateString('en-us', { month: 'long', day: 'numeric' })}
										</div>
									</div>
								)}
							</div>
						</div>
					}
				/>
			</div>
		</div>
	)
}

const ProjectList = ({ projects = [], ...options }) => {
	return (
		<div className='mt-8'>
			{projects.map((project) => (
				<Project key={project.id} project={project} {...options} />
			))}
		</div>
	)
}

export default ProjectList
