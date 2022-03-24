import { useContext } from 'react'
import { Button } from 'antd'
import {
	ArrowRightOutlined,
	CalendarOutlined,
	DeleteOutlined,
	EllipsisOutlined,
	PlusOutlined,
	RightSquareOutlined,
	SearchOutlined,
} from '@ant-design/icons'
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
			{state.open > -1 || state.showAddingTask ? (
				<div>
					<Button type='text' onClick={() => console.log('TODO')}>
						<ArrowRightOutlined />
					</Button>
					<Button
						type='text'
						onClick={() => {
							if (state.showAddingTask) dispatch({ type: 'set', payload: { showAddingTask: false } })
							else handleDeleteTask()
						}}>
						<DeleteOutlined />
					</Button>
					<Button type='text' onClick={() => console.log('TODO')}>
						<EllipsisOutlined />
					</Button>
				</div>
			) : (
				<div>
					<Button type='text' onClick={() => dispatch({ type: 'set', payload: { showAddingTask: true, selected: [] } })}>
						<PlusOutlined />
					</Button>
					<Button type='text' onClick={() => console.log('TODO')}>
						<RightSquareOutlined />
					</Button>
					<Button type='text' disabled={state.selected.length === 0} onClick={() => console.log('TODO')}>
						<CalendarOutlined />
					</Button>
					<Button type='text' disabled={state.selected.length === 0} onClick={() => console.log('TODO')}>
						<ArrowRightOutlined />
					</Button>
					<Button type='text' onClick={() => console.log('TODO')}>
						<SearchOutlined />
					</Button>
				</div>
			)}
		</div>
	)
}

export default TaskToolbar
