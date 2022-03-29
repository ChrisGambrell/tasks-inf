import { useContext } from 'react'
import { Button } from '@mantine/core'
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
					<Button color='dark' variant='subtle' onClick={() => console.log('TODO')}>
						<ArrowNarrowRight size={16} />
					</Button>
					<Button
						color='dark'
						variant='subtle'
						onClick={() => {
							if (state.showAddingTask) dispatch({ type: 'set', payload: { showAddingTask: false } })
							else handleDeleteTask()
						}}>
						<Trash size={16} />
					</Button>
					<Button color='dark' variant='subtle' onClick={() => console.log('TODO')}>
						<Dots size={16} />
					</Button>
				</div>
			) : (
				<div>
					<Button
						color='dark'
						variant='subtle'
						onClick={() => dispatch({ type: 'set', payload: { showAddingTask: true, selected: [] } })}>
						<Plus size={16} />
					</Button>
					<Button color='dark' variant='subtle' onClick={() => console.log('TODO')}>
						<ArrowBarRight size={16} />
					</Button>
					<Button color='dark' variant='subtle' disabled={state.selected.length === 0} onClick={() => console.log('TODO')}>
						<Calendar size={16} />
					</Button>
					<Button color='dark' variant='subtle' disabled={state.selected.length === 0} onClick={() => console.log('TODO')}>
						<ArrowNarrowRight size={16} />
					</Button>
					<Button color='dark' variant='subtle' onClick={() => console.log('TODO')}>
						<Search size={16} />
					</Button>
				</div>
			)}
		</div>
	)
}

export default TaskToolbar
