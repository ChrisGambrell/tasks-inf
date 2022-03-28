import { useContext } from 'react'
import { Button } from 'antd'
import { ArrowBarRight, ArrowNarrowRight, Calendar, Dots, Plus, Search, Trash } from 'tabler-icons-react'
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
						<ArrowNarrowRight />
					</Button>
					<Button
						type='text'
						onClick={() => {
							if (state.showAddingTask) dispatch({ type: 'set', payload: { showAddingTask: false } })
							else handleDeleteTask()
						}}>
						<Trash />
					</Button>
					<Button type='text' onClick={() => console.log('TODO')}>
						<Dots />
					</Button>
				</div>
			) : (
				<div>
					<Button type='text' onClick={() => dispatch({ type: 'set', payload: { showAddingTask: true, selected: [] } })}>
						<Plus />
					</Button>
					<Button type='text' onClick={() => console.log('TODO')}>
						<ArrowBarRight />
					</Button>
					<Button type='text' disabled={state.selected.length === 0} onClick={() => console.log('TODO')}>
						<Calendar />
					</Button>
					<Button type='text' disabled={state.selected.length === 0} onClick={() => console.log('TODO')}>
						<ArrowNarrowRight />
					</Button>
					<Button type='text' onClick={() => console.log('TODO')}>
						<Search />
					</Button>
				</div>
			)}
		</div>
	)
}

export default TaskToolbar
