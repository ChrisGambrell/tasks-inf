import { useContext } from 'react'
import { Col, Checkbox, Dropdown, Menu, Row } from 'antd'
import { useDeleteTask, useEditTask, useTasks } from '../hooks'
import { TasksContext } from '../App'
import { TaskForm } from '.'

const TaskList = () => {
	const { data: tasks } = useTasks()
	const deleteTask = useDeleteTask().mutate
	const editTask = useEditTask().mutate

	const [state, dispatch] = useContext(TasksContext)

	const handleDeleteTask = async (taskId = state.open) => {
		await deleteTask(taskId)
		dispatch({ type: 'set', payload: { open: -1 } })
	}

	return (
		<ul style={{ listStyle: 'none' }}>
			{state.showAddingTask && <TaskForm className='task-item active' type='create' as='li' />}
			{tasks?.map((task) => (
				<li
					className={`task-item ${state.open === task.id ? 'active' : ''}`}
					key={task.id}
					id={task.id}
					onDoubleClick={() => dispatch({ type: 'set', payload: { open: task.id } })}
					onContextMenu={(e) => e.preventDefault()}>
					<Dropdown
						overlay={
							<Menu>
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
											onChange={() => editTask({ taskId: task.id, data: { completed: !task.completed } })}
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
