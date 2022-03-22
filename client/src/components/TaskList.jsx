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
		if (e.metaKey) dispatch({ type: 'set', payload: { selected: [...state.selected, taskId], open: -1, showAddingTask: false } })
		else if (!e.metaKey && !e.shiftKey) dispatch({ type: 'set', payload: { selected: [taskId], open: -1, showAddingTask: false } })
	}

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
					id={`task-${task.id}`}
					onClick={(e) => handleSelectTask(e, task.id)}
					onDoubleClick={() => dispatch({ type: 'set', payload: { open: task.id, selected: [] } })}
					onContextMenu={(e) => e.preventDefault()}
					style={{ backgroundColor: state.selected.includes(task.id) ? blue[1] : 'white' }}>
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
