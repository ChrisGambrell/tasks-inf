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
						<ArrowNarrowRight />
					</Button>
					<Button
						color='dark'
						variant='subtle'
						onClick={() => {
							if (state.showAddingTask) dispatch({ type: 'set', payload: { showAddingTask: false } })
							else handleDeleteTask()
						}}>
						<Trash />
					</Button>
					<Button color='dark' variant='subtle' onClick={() => console.log('TODO')}>
						<Dots />
					</Button>
				</div>
			) : (
				<div>
					<Button
						color='dark'
						variant='subtle'
						onClick={() => dispatch({ type: 'set', payload: { showAddingTask: true, selected: [] } })}>
						<Plus />
					</Button>
					<Button color='dark' variant='subtle' onClick={() => console.log('TODO')}>
						<ArrowBarRight />
					</Button>
					<Button color='dark' variant='subtle' disabled={state.selected.length === 0} onClick={() => console.log('TODO')}>
						<Calendar />
					</Button>
					<Button color='dark' variant='subtle' disabled={state.selected.length === 0} onClick={() => console.log('TODO')}>
						<ArrowNarrowRight />
					</Button>
					<Button color='dark' variant='subtle' onClick={() => console.log('TODO')}>
						<Search />
					</Button>
				</div>
			)}
		</div>
	)
}

export default TaskToolbar
