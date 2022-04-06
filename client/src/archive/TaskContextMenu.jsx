import { useContext } from 'react'
import { Divider, Menu } from '@mantine/core'
// import { useDeleteTask } from '../hooks'
import { TasksContext } from '../App'

const TaskContextMenu = ({ control, taskId }) => {
	// const deleteTask = useDeleteTask().mutate

	const [state, _dispatch] = useContext(TasksContext)

	const handleDeleteTask = async (taskId = state.open) => {
		console.log('FIXME')
		// if (state.selected.length > 1) await state.selected.map((tId) => deleteTask(tId))
		// else await deleteTask(taskId)
		// dispatch({ type: 'set', payload: { open: -1 } })
	}

	return (
		<Menu control={control} sx={(themes) => ({ width: '100%' })}>
			<Menu.Item onClick={() => console.log('TODO')}>When...</Menu.Item>
			<Menu.Item onClick={() => console.log('TODO')}>Move...</Menu.Item>
			<Menu.Item onClick={() => console.log('TODO')}>Tags...</Menu.Item>
			<Menu.Item onClick={() => console.log('TODO')}>Deadline...</Menu.Item>

			<Divider />

			<Menu.Label>Complete</Menu.Label>
			<Menu.Item onClick={() => console.log('TODO')}>Mark as Completed</Menu.Item>
			<Menu.Item onClick={() => console.log('TODO')}>Mark as Cancelled</Menu.Item>

			<Divider />

			<Menu.Label>Shortcuts</Menu.Label>
			<Menu.Label>When</Menu.Label>
			<Menu.Item onClick={() => console.log('TODO')}>Today</Menu.Item>
			<Menu.Item onClick={() => console.log('TODO')}>This Evening</Menu.Item>
			<Menu.Item onClick={() => console.log('TODO')}>Someday</Menu.Item>
			<Menu.Item onClick={() => console.log('TODO')}>Clear</Menu.Item>

			<Divider />

			<Menu.Item onClick={() => console.log('TODO')}>Repeat...</Menu.Item>
			<Menu.Item onClick={() => console.log('TODO')}>Get Info...</Menu.Item>
			<Menu.Item onClick={() => console.log('TODO')}>Duplicate Task</Menu.Item>
			<Menu.Item onClick={() => console.log('TODO')}>Convert to Project...</Menu.Item>
			<Menu.Item color='red' onClick={() => handleDeleteTask(taskId)}>
				Delete Task
			</Menu.Item>

			<Divider />

			<Menu.Item onClick={() => console.log('TODO')}>Remove From Project</Menu.Item>
		</Menu>
	)
}

export default TaskContextMenu
