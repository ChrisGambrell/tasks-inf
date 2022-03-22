import { useContext } from 'react'
import { Button } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useDeleteTask } from '../hooks'
import { TasksContext } from '../App'

const TaskToolbar = () => {
	const deleteTask = useDeleteTask().mutate

	const [state, dispatch] = useContext(TasksContext)

	const handleDeleteTask = async (taskId = state.open) => {
		await deleteTask(taskId)
		dispatch({ type: 'set', payload: { open: -1 } })
	}

	return (
		<div className='Toolbar' id='toolbar'>
			<Button type='text' onClick={() => dispatch({ type: 'set', payload: { showAddingTask: true } })}>
				<PlusOutlined />
			</Button>
			{(state.open > -1 || state.showAddingTask) && (
				<Button
					type='text'
					onClick={() => {
						if (state.showAddingTask) dispatch({ type: 'set', payload: { showAddingTask: false } })
						else handleDeleteTask()
					}}>
					<DeleteOutlined />
				</Button>
			)}
		</div>
	)
}

export default TaskToolbar
