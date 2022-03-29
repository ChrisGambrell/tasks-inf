import { forwardRef, useContext } from 'react'
import { Col, Checkbox, Row, Typography } from 'antd'
import { blue } from '@ant-design/colors'
import { File, Star } from 'tabler-icons-react'
import { useEditTask, useTasks } from '../hooks'
import { TasksContext } from '../App'
import { TaskForm } from '.'

const TaskListItem = forwardRef(({ task, ...props }, ref) => {
	const { data: tasks } = useTasks()
	const editTask = useEditTask().mutate

	const [state, dispatch] = useContext(TasksContext)

	const handleSelectTask = (e, taskId) => {
		if (e.button === 2) return dispatch({ type: 'set', payload: { selected: [taskId], open: -1, showAddingTask: false } })

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
		<li
			className={`task-item ${state.open === task.id ? 'active' : ''}`}
			ref={ref}
			{...props}
			key={task.id}
			id={`task-${task.id}`}
			onContextMenu={(e) => {
				e.preventDefault()
				handleSelectTask(e, task.id)
				props['onClick']()
			}}
			onClick={(e) => handleSelectTask(e, task.id)}
			onDoubleClick={() => dispatch({ type: 'set', payload: { open: task.id, selected: [] } })}
			style={{ backgroundColor: state.selected.includes(task.id) ? blue[1] : 'white' }}>
			{state.open === task.id ? (
				<TaskForm type='edit' task={task} />
			) : (
				<Row>
					<Col span={1}>
						<Checkbox
							checked={task.completed}
							onChange={() =>
								state.selected.length > 1
									? state.selected.map((taskId) => editTask({ taskId, data: { completed: !task.completed } }))
									: editTask({ taskId: task.id, data: { completed: !task.completed } })
							}
						/>
					</Col>
					<Col span={23} style={{ paddingLeft: 3 }}>
						{new Date(task.when).toLocaleDateString() === new Date().toLocaleDateString() && <Star style={{ color: 'gold' }} />}{' '}
						{task.title}{' '}
						{task.notes && (
							<Typography.Text type='secondary' style={{ marginLeft: 5 }}>
								<File />
							</Typography.Text>
						)}
					</Col>
				</Row>
			)}
		</li>
	)
})

export default TaskListItem
