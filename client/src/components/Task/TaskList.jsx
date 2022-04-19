import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAreas, useHeaders, useDeleteHeader, useProject, useCreateProject, useTasks, useCreateTask, useEditTask } from '../../hooks'
import { TasksContext } from '../../App'
import { ContextMenu, Dropdown } from '..'
import { Task } from '.'

const TaskList = ({ tasks = [], projectId, showHeaders = false, showLogged = false, noMargin = false, ...options }) => {
	const navigate = useNavigate()

	const [state, dispatch] = useContext(TasksContext)

	const incompleteTasks = tasks.filter((task) => !task.completed)
	const completedTasks = tasks.filter((task) => task.completed).sort((a, b) => b.completed_when - a.completed_when)

	const { data: areasCollection = [] } = useAreas()

	const { data: project = {} } = useProject(projectId, Boolean(projectId))
	const createProject = useCreateProject().mutateAsync

	const { data: headersCollection = [] } = useHeaders()
	const headersForProject = headersCollection.filter((header) => header.project_id === projectId)

	const { data: tasksCollection = [] } = useTasks()
	const editTask = useEditTask().mutateAsync

	const deleteHeader = useDeleteHeader().mutate

	const headers = showLogged
		? incompleteTasks.reduce(
				(group, task) => {
					let { header_id } = task
					header_id = header_id === null ? -1 : header_id

					group[header_id] = group[header_id] ?? []
					group[header_id].push(task)
					return group
				},
				headersForProject.reduce((group, header) => {
					let { id } = header
					group[id] = []
					return group
				}, {})
		  )
		: tasks.reduce(
				(group, task) => {
					let { header_id } = task
					header_id = header_id === null ? -1 : header_id

					group[header_id] = group[header_id] ?? []
					group[header_id].push(task)
					return group
				},
				headersForProject.reduce((group, header) => {
					let { id } = header
					group[id] = []
					return group
				}, {})
		  )
	// console.log(headers)

	const [showLoggedItems, setShowLoggedItems] = useState(false)

	const handleConvertToProject = async (headerId) => {
		let header = headersCollection.find((header) => header.id == headerId)
		let area = areasCollection.find((area) => area.id === project.area_id)
		let tasks = tasksCollection.filter((task) => task.header_id === header.id)

		try {
			let { id } = await createProject({ ...header, icon: 'circle', area_id: area?.id ? area.id : null })
			await tasks
				.filter((task) => task.header_id === header.id)
				.forEach((task) => editTask({ taskId: task.id, data: { project_id: id, header_id: null } }))
			await deleteHeader(headerId)
			navigate(`/projects/${id}`)
		} catch (err) {
			console.error(err)
		}
	}

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
		dispatch({ type: 'reset' })
	})

	return (
		<div className={`${!noMargin && 'mt-8'}`}>
			<div>
				{showHeaders ? (
					Object.keys(headers)
						.sort((a, b) => Number(a) - Number(b))
						.map((header_id) => (
							<div key={header_id} className='mb-8'>
								{/* Header */}
								{Number(header_id) !== -1 && (
									<ContextMenu
										header={headersCollection.find((header) => header.id === Number(header_id))}
										target={
											<div
												className={`flex justify-between items-center px-0.5 pb-0.5 border-b border-gray-200 text-blue-600 font-semibold select-none ${
													state.selectedHeader.includes(Number(header_id)) && 'rounded-md bg-blue-200'
												} ${state.contextedHeader === Number(header_id) && 'rounded-md bg-gray-200'}`}
												onClick={() =>
													dispatch({
														type: 'set',
														payload: { selectedHeader: [Number(header_id)], moveType: 'header' },
													})
												}
												ref={clickOutsideRef}>
												<div
													className={`
												${!headersForProject.find((header) => header.id === Number(header_id))?.title && 'text-blue-200'}
											`}>
													{headersForProject.find((header) => header.id === Number(header_id))?.title ||
														'New Heading'}
												</div>
												<Dropdown targetColor='text-blue-600'>
													<Dropdown.Item
														label='Archive'
														icon='check-to-slot'
														onClick={() => console.log('TODO')}
													/>

													<Dropdown.Divider />

													<Dropdown.Item
														label='Move'
														icon='arrow-right'
														onClick={() =>
															dispatch({
																type: 'set',
																payload: { moveType: 'header', moveId: Number(header_id) },
															})
														}
													/>
													<Dropdown.Item
														label='Convert to Project...'
														icon='up-right-from-square'
														onClick={() => handleConvertToProject(header_id)}
													/>
													<Dropdown.Item
														label='Delete'
														icon='trash'
														onClick={() => deleteHeader(Number(header_id))}
													/>
												</Dropdown>
											</div>
										}
									/>
								)}

								{/* Tasks */}
								{headers[header_id].map((task) => (
									<Task key={task.id} task={task} {...options} />
								))}

								{/* TODO hide later items */}
							</div>
						))
				) : (
					<div className='mb-8'>
						{showLogged
							? incompleteTasks.map((task) => <Task key={task.id} task={task} {...options} />)
							: tasks.map((task) => <Task key={task.id} task={task} {...options} />)}
					</div>
				)}
			</div>

			{/* Logged tasks */}
			{showLogged && completedTasks.length > 0 && (
				<div>
					<button
						className='px-1 rounded border border-white font-semibold text-xs text-gray-400 hover:border-gray-300 active:bg-gray-300'
						onClick={() => setShowLoggedItems(!showLoggedItems)}>
						{showLoggedItems ? 'Hide logged items' : `Show ${completedTasks.length} logged items`}
					</button>
					{showLoggedItems && <TaskList tasks={completedTasks} secondary showCompletedWhen showHeader />}
				</div>
			)}
		</div>
	)
}

export default TaskList
