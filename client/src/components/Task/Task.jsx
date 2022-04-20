import { useContext, useEffect, useRef } from 'react'
import { Badge, Checkbox } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { TasksContext } from '../../App'
import { useHeader, useEditHeader, useProject, useEditTask, useDeleteTask } from '../../hooks'
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
	const { data: project = {} } = useProject(task.project_id, Boolean(showProject && task.project_id))

	const { data: header = {} } = useHeader(task.header_id, Boolean(showHeader && task.header_id))
	const editHeader = useEditHeader().mutate

	const editTask = useEditTask().mutate
	const deleteTask = useDeleteTask().mutate

	const [state, dispatch] = useContext(TasksContext)

	const handleHotKey = (event) => {
		return state.contextedTask === task.id
			? event()
			: state.contextedTask === -1 && state.selectedTask.includes(task.id)
			? event()
			: null
	}

	const handleEditCompleted = () => {
		if (header) editHeader({ headerId: header.id, data: { completed: false } })
		editTask({
			taskId: task.id,
			data: { completed: !task.completed },
		})
	}

	const handleEditWhen = (when) => {
		editTask({ taskId: task.id, data: { when } })
	}

	useHotkeys([
		['backspace', () => handleHotKey(() => deleteTask(task.id))],
		['escape', () => dispatch({ type: 'reset' })],
	])

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
					)
						return

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
		if (state.selectedTask.includes(task.id) && state.open === task.id) dispatch({ type: 'set', payload: { open: -1 } })
		else if (state.selectedTask.includes(task.id)) {
			dispatch({ type: 'reset' })
		}
	})

	return (
		<div ref={clickOutsideRef}>
			{state.open === task.id ? (
				<TaskDetails task={task} />
			) : (
				<div
					className='flex items-center select-none'
					onClick={() => dispatch({ type: 'set', payload: { selectedTask: [task.id], moveType: 'task' } })}
					onDoubleClick={() => dispatch({ type: 'set', payload: { open: task.id } })}>
					<ContextMenu
						task={task}
						target={
							<div className='relative flex items-center w-full -translate-x-5 mt-1.5'>
								<div className='flex grow'>
									<div className='-translate-x-1'>
										<DateSelect
											title='When'
											value={task.when}
											onChange={handleEditWhen}
											target={
												<FA className='opacity-0 hover:opacity-100 w-3 h-3 text-gray-400' icon='calendar-days' />
											}
										/>
									</div>
									<div
										className={`flex items-center w-full p-0.25 rounded-md ${
											state.selectedTask.includes(task.id) && 'bg-blue-200'
										} ${state.contextedTask === task.id && 'bg-gray-200'}`}>
										<div className='flex-grow flex items-center'>
											<Checkbox
												className='ml-2 mr-1'
												size='xs'
												defaultChecked={task.completed}
												onChange={handleEditCompleted}
											/>
											{showCompletedWhen && <CompletedWhenDisplay when={task.completed_when} />}
											{showWhen && <WhenDisplay when={task.when} />}
											<div className='ml-1 mr-1'>
												<div
													className={`${secondary || !task.title ? 'text-gray-400' : 'text-gray-800'} ${
														!task.title && 'font-light'
													} truncate`}>
													{task.title || 'New To-Do'}
												</div>
												{showProject && project && (
													<div className='text-xs text-gray-400 truncate'>{project.title}</div>
												)}
												{showHeader && header && !header.completed && (
													<div className='text-xs text-gray-400 truncate'>{header.title}</div>
												)}
											</div>
											{showNotesIndicator && task.notes && <FA className='w-3 h-3 text-gray-400' icon='file' />}
										</div>

										{task.deadline && (
											<div
												className={`flex-none flex items-center space-x-1 mr-1 ${
													task.deadline.toLocaleDateString() === new Date().toLocaleDateString()
														? 'text-red-500'
														: 'text-gray-500'
												}`}>
												<FA className='w-3 h-3' icon='flag' />
												<div className='text-sm'>
													{task.deadline.toLocaleDateString('en-us', { month: 'long', day: 'numeric' })}
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						}
					/>
				</div>
			)}
		</div>
	)
}

export default Task
