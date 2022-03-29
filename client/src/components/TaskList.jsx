import { useContext } from 'react'
import { Col, Checkbox, Dropdown, Row, Typography } from 'antd'
import { blue } from '@ant-design/colors'
import { File, Star } from 'tabler-icons-react'
import { useEditTask, useTasks } from '../hooks'
import { TasksContext } from '../App'
import { TaskContextMenu, TaskForm } from '.'

const TaskList = ({ query: listQuery = {} }) => {
	const { data: tasks } = useTasks()
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
		} else if (!e.metaKey && !e.shiftKey && state.open !== taskId)
			dispatch({ type: 'set', payload: { selected: [taskId], open: -1, showAddingTask: false } })
	}

	return (
		<ul style={{ listStyle: 'none' }}>
			{state.showAddingTask && <TaskForm className='task-item active' type='create' as='li' />}
			{tasks
				?.filter((task) => {
					if (Object.keys(listQuery).length > 0) {
						let matches = true
						Object.keys(listQuery).forEach((query) => {
							if (query === 'when') {
								if (listQuery[query] !== new Date(task[query]).toLocaleDateString()) matches = false
							} else {
								if (listQuery[query] !== task[query]) matches = false
							}
						})

						if (matches) return task
						else return
					} else return task
				})
				.map((task) => (
					<li
						className={`task-item ${state.open === task.id ? 'active' : ''}`}
						key={task.id}
						id={`task-${task.id}`}
						onClick={(e) => handleSelectTask(e, task.id)}
						onDoubleClick={() => dispatch({ type: 'set', payload: { open: task.id, selected: [] } })}
						onContextMenu={(e) => e.preventDefault()}
						style={{ backgroundColor: state.selected.includes(task.id) ? blue[1] : 'white' }}>
						<Dropdown overlay={<TaskContextMenu taskId={task.id} />} trigger={['contextMenu']}>
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
											{new Date(task.when).toLocaleDateString() === new Date().toLocaleDateString() && (
												<Star style={{ color: 'gold' }} />
											)}{' '}
											{task.title}{' '}
											{task.notes && (
												<Typography.Text type='secondary' style={{ marginLeft: 5 }}>
													<File />
												</Typography.Text>
											)}
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
