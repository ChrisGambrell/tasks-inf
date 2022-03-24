import { useContext } from 'react'
import { Col, Checkbox, Dropdown, Menu, Row } from 'antd'
import { blue } from '@ant-design/colors'
import { useDeleteTask, useEditTask, useTasks } from '../hooks'
import { TasksContext } from '../App'
import { TaskForm } from '.'

const TaskList = () => {
	const { data: tasks } = useTasks()
	const deleteTask = useDeleteTask().mutate
	const editTask = useEditTask().mutate

	const [state, dispatch] = useContext(TasksContext)

	const handleSelectTask = (e, taskId) => {
		if (e.metaKey)
			dispatch({
				type: 'set',
				payload: {
					selected: state.selected.includes(taskId)
						? [...state.selected.filter((id) => id !== taskId)]
						: [...state.selected, taskId],
					open: -1,
					showAddingTask: false,
				},
			})
		else if (e.shiftKey) {
			let indexClicked = tasks.findIndex((task) => task.id === taskId)
			let indexLast = tasks.findIndex((task) => task.id === state.selected[state.selected.length - 1])
			let taskIdsToAdd = []

			if (indexClicked < indexLast) {
				for (let i = indexClicked; i < indexLast; i++) taskIdsToAdd.push(tasks[i].id)
			} else {
				for (let i = indexLast; i <= indexClicked; i++) taskIdsToAdd.push(tasks[i].id)
			}

			dispatch({ type: 'set', payload: { selected: [...state.selected, ...taskIdsToAdd], open: -1, showAddingTask: false } })
		} else if (!e.metaKey && !e.shiftKey) dispatch({ type: 'set', payload: { selected: [taskId], open: -1, showAddingTask: false } })
	}

	const handleDeleteTask = async (taskId = state.open) => {
		console.log(state.selected)
		if (state.selected.length > 1) await state.selected.map((tId) => deleteTask(tId))
		else await deleteTask(taskId)
		dispatch({ type: 'set', payload: { open: -1 } })
	}

	return (
		<ul style={{ listStyle: 'none' }}>
			{state.showAddingTask && <TaskForm className='task-item active' type='create' as='li' />}
			{tasks?.map((task) => (
				<li
					className={`task-item ${state.open === task.id ? 'active' : ''}`}
					key={task.id}
					id={`task-${task.id}`}
					onClick={(e) => handleSelectTask(e, task.id)}
					onDoubleClick={() => dispatch({ type: 'set', payload: { open: task.id, selected: [] } })}
					onContextMenu={(e) => e.preventDefault()}
					style={{ backgroundColor: state.selected.includes(task.id) ? blue[1] : 'white' }}>
					<Dropdown
						overlay={
							<Menu id='contextmenu'>
								<Menu.Item key='delete' danger onClick={() => handleDeleteTask(task.id)}>
									Delete task
								</Menu.Item>
							</Menu>
						}
						trigger={['contextMenu']}>
						<div>
							{state.open === task.id ? (
								<TaskForm type='edit' task={task} />
							) : (
								<Row>
									<Col span={1}>
										<Checkbox
											checked={task.completed}
											onChange={() =>
												state.selected.length > 1
													? state.selected.map((taskId) =>
															editTask({ taskId, data: { completed: !task.completed } })
													  )
													: editTask({ taskId: task.id, data: { completed: !task.completed } })
											}
										/>
									</Col>
									<Col span={23} style={{ paddingLeft: 3 }}>
										{task.title}
									</Col>
								</Row>
							)}
						</div>
					</Dropdown>
				</li>
			))}
		</ul>
	)
}

export default TaskList
