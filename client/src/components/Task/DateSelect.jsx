import { useContext } from 'react'
import { Modal } from '@mantine/core'
import { Calendar } from '@mantine/dates'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { useEditProject, useEditTask, useProject, useTask } from '../../hooks'
import { TasksContext } from '../../App'

const DateSelect = () => {
	const [state, dispatch] = useContext(TasksContext)

	const { data: project = {} } = useProject(
		state.dateSelectId,
		Boolean(state.dateSelectType === 'project' && state.dateSelectId !== -1 && state.dateSelectAttr !== null)
	)
	const editProject = useEditProject().mutateAsync

	const { data: task = {} } = useTask(
		state.dateSelectId,
		Boolean(state.dateSelectType === 'task' && state.dateSelectId !== -1 && state.dateSelectAttr !== null)
	)
	const editTask = useEditTask().mutateAsync

	const getValue = () => {
		if (state.dateSelectType === 'project') {
			if (state.dateSelectAttr === 'when') return project.when
			else if (state.dateSelectAttr === 'deadline') return project.deadline
		} else if (state.dateSelectType === 'task') {
			if (state.dateSelectAttr === 'when') return task.when
			else if (state.dateSelectAttr === 'deadline') return task.deadline
		}
	}

	const handleOnChange = async (date) => {
		if (state.dateSelectType === 'project') {
			await editProject({
				projectId: state.dateSelectId,
				data: {
					...(state.dateSelectAttr === 'when' && { when: date }),
					...(state.dateSelectAttr === 'deadline' && { deadline: date }),
				},
			})
		} else if (state.dateSelectType === 'task') {
			await editTask({
				taskId: state.dateSelectId,
				data: {
					...(state.dateSelectAttr === 'when' && { when: date }),
					...(state.dateSelectAttr === 'deadline' && { deadline: date }),
				},
			})
		}

		dispatch({ type: 'set', payload: { dateSelectType: null, dateSelectId: -1, dateSelectAttr: null } })
	}

	return (
		<div>
			<Modal
				classNames={{ modal: 'w-fit p-1 bg-gray-800 text-gray-50' }}
				id='date-select'
				radius='md'
				shadow='xl'
				opened={state.dateSelectType !== null && state.stateSelectType !== -1}
				onClose={() => dispatch({ type: 'set', payload: { dateSelectType: null, dateSelectId: -1, dateSelectAttr: null } })}
				withCloseButton={false}>
				<div className='select-none text-sm font-semibold'>
					<div className='flex justify-center text-gray-400'>
						{(state.dateSelectAttr === 'when' && 'When') || (state.dateSelectAttr === 'deadline' && 'Deadline')}
					</div>
					{state.dateSelectAttr === 'when' && (
						<div>
							<div
								className='flex items-center p-1 space-x-1 rounded hover:bg-blue-500'
								onClick={() => handleOnChange(new Date())}>
								<FA className='text-yellow-400' icon='star' />
								<div>Today</div>
							</div>
							<div className='flex items-center p-1 space-x-1 rounded hover:bg-blue-500' onClick={() => console.log('TODO')}>
								<FA className='text-blue-200' icon='moon' />
								<div>This Evening</div>
							</div>
						</div>
					)}
					<div>
						<Calendar
							classNames={{
								calendarHeaderControl: 'font-semibold text-gray-50 hover:bg-blue-500',
								calendarHeaderLevel: 'font-semibold text-gray-50 hover:bg-blue-500',
								yearPickerControl: 'font-semibold text-gray-500 hover:bg-blue-500',
								yearPickerControlActive: 'font-semibold text-gray-50 hover:bg-blue-500',
								monthPickerControl: 'font-semibold text-gray-500 hover:bg-blue-500',
								monthPickerControlActive: 'font-semibold text-gray-50 hover:bg-blue-500',
								day: 'font-semibold !text-gray-50 hover:bg-blue-500',
							}}
							dayStyle={(dateToStyle) =>
								dateToStyle.toLocaleDateString() === getValue()?.toLocaleDateString()
									? {
											backgroundColor: 'rgb(59 130 246 / var(--tw-bg-opacity))',
											border: '1px solid white',
											borderRadius: 7,
									  }
									: dateToStyle.toLocaleDateString() === new Date().toLocaleDateString()
									? { border: '1px solid white', borderRadius: 7 }
									: null
							}
							firstDayOfWeek='sunday'
							hideOutsideDates
							onChange={handleOnChange}
						/>
					</div>
					{state.dateSelectAttr === 'when' && (
						<div>
							<div className='flex items-center p-1 space-x-1 rounded hover:bg-blue-500' onClick={() => console.log('TODO')}>
								<FA className='text-yellow-600' icon='archive' />
								<div>Someday</div>
							</div>
							<div
								className='flex items-center p-1 space-x-1 rounded text-gray-400 hover:bg-blue-500'
								onClick={() => console.log('TODO')}>
								<FA icon='plus' />
								<div>Add Reminder</div>
							</div>
							<div
								className='flex justify-center mt-1 p-1 rounded bg-gray-600 active:bg-gray-500'
								onClick={() => handleOnChange(null)}>
								Clear
							</div>
						</div>
					)}
				</div>
			</Modal>
		</div>
	)
}

export default DateSelect
