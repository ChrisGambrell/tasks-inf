import { Col, Checkbox, Dropdown, Menu, Row } from 'antd'
import { useDeleteTask, useEditTask, useTasks } from '../hooks'
import { TaskForm } from '.'

const TaskList = ({ selectedTask, showAddingTask, setSelectedTask, setShowAddingTask }) => {
	const { data: tasks } = useTasks()
	const deleteTask = useDeleteTask().mutate
	const editTask = useEditTask().mutate

	const handleDeleteTask = async (taskId = selectedTask) => {
		await deleteTask(taskId)
		setSelectedTask(-1)
	}

	return (
		<ul style={{ listStyle: 'none' }}>
			{showAddingTask && <TaskForm className='task-item active' type='create' as='li' setShowAddingTask={setShowAddingTask} />}
			{tasks?.map((task) => (
				<li
					className={`task-item ${selectedTask === task.id ? 'active' : ''}`}
					key={task.id}
					id={task.id}
					onDoubleClick={() => setSelectedTask(task.id)}
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
							{selectedTask === task.id ? (
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
