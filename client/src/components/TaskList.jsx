import { useContext } from 'react'
import { useTasks } from '../hooks'
import { TasksContext } from '../App'
import { TaskContextMenu, TaskForm, TaskListItem } from '.'

const TaskList = ({ query: listQuery = {} }) => {
	const { data: tasks } = useTasks()

	const [state, _dispatch] = useContext(TasksContext)

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
					<TaskContextMenu key={task.id} control={<TaskListItem task={task} />} />
				))}
		</ul>
	)
}

export default TaskList
