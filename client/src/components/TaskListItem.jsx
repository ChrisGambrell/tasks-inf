import { forwardRef, useContext } from 'react'
import { Checkbox, Group, useMantineTheme } from '@mantine/core'
import { File, Star } from 'tabler-icons-react'
import { useEditTask, useTasks } from '../hooks'
import { TasksContext } from '../App'
import { TaskForm } from '.'

const TaskListItem = forwardRef(({ task, ...props }, ref) => {
	const { data: tasks } = useTasks()
	const editTask = useEditTask().mutate

	const [state, dispatch] = useContext(TasksContext)

	const { colors } = useMantineTheme()

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
			ref={ref}
			{...props}
			id={`task-${task.id}`}
			onContextMenu={(e) => {
				e.preventDefault()
				handleSelectTask(e, task.id)
				props['onClick']()
			}}
			onClick={(e) => handleSelectTask(e, task.id)}
			onDoubleClick={() => dispatch({ type: 'set', payload: { open: task.id, selected: [] } })}>
			{state.open === task.id ? (
				<TaskForm type='edit' task={task} />
			) : (
				<Group spacing='xs'>
					<Checkbox
						size='xs'
						checked={task.completed}
						onChange={() =>
							state.selected.length > 1
								? state.selected.map((taskId) => editTask({ taskId, data: { completed: !task.completed } }))
								: editTask({ taskId: task.id, data: { completed: !task.completed } })
						}
					/>
					{new Date(task.when).toLocaleDateString() === new Date().toLocaleDateString() && <Star size='16' />}
					{task.title}
					{task.notes && <File color={colors.gray[5]} size='16' />}
				</Group>
			)}
		</li>
	)
})

export default TaskListItem
