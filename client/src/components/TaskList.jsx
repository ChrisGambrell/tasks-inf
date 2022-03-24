import { useContext } from 'react'
import { Col, Checkbox, Dropdown, Menu, Row, Typography } from 'antd'
import { blue } from '@ant-design/colors'
import { FileOutlined } from '@ant-design/icons'
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
		} else if (!e.metaKey && !e.shiftKey && state.open !== taskId)
			dispatch({ type: 'set', payload: { selected: [taskId], open: -1, showAddingTask: false } })
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
								<Menu.Item key='when' onClick={() => console.log('TODO')}>
									When...
								</Menu.Item>
								<Menu.Item key='move' onClick={() => console.log('TODO')}>
									Move...
								</Menu.Item>
								<Menu.Item key='tags' onClick={() => console.log('TODO')}>
									Tags...
								</Menu.Item>
								<Menu.Item key='deadline' onClick={() => console.log('TODO')}>
									Deadline...
								</Menu.Item>
								<Menu.SubMenu key='complete' title='Complete'>
									<Menu.Item key='mark-as-completed' onClick={() => console.log('TODO')}>
										Mark as Completed
									</Menu.Item>
									<Menu.Item key='mark-as-cancelled' onClick={() => console.log('TODO')}>
										Mark as Cancelled
									</Menu.Item>
								</Menu.SubMenu>
								<Menu.SubMenu key='shortcuts' title='Shortcuts'>
									<Menu.ItemGroup title='When'>
										<Menu.Item key='today' onClick={() => console.log('TODO')}>
											Today
										</Menu.Item>
										<Menu.Item key='this-evening' onClick={() => console.log('TODO')}>
											This Evening
										</Menu.Item>
										<Menu.Item key='someday' onClick={() => console.log('TODO')}>
											Someday
										</Menu.Item>
										<Menu.Item key='clear' onClick={() => console.log('TODO')}>
											Clear
										</Menu.Item>
									</Menu.ItemGroup>
								</Menu.SubMenu>
								<Menu.Divider />
								<Menu.Item key='repeat' onClick={() => console.log('TODO')}>
									Repeat...
								</Menu.Item>
								<Menu.Item key='get-info' onClick={() => console.log('TODO')}>
									Get Info...
								</Menu.Item>
								<Menu.Item key='duplicate-task' onClick={() => console.log('TODO')}>
									Duplicate Task
								</Menu.Item>
								<Menu.Item key='convert-to-project' onClick={() => console.log('TODO')}>
									Convert to Project...
								</Menu.Item>
								<Menu.Item key='delete' danger onClick={() => handleDeleteTask(task.id)}>
									Delete Task
								</Menu.Item>
								<Menu.Divider />
								<Menu.Item key='remove-from-project' onClick={() => console.log('TODO')}>
									Remove From Project
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
										{task.title}{' '}
										{task.notes && (
											<Typography.Text type='secondary' style={{ marginLeft: 5 }}>
												<FileOutlined />
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
