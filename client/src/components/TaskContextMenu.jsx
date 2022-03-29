import { useContext } from 'react'
import { Menu } from 'antd'
import { useDeleteTask } from '../hooks'
import { TasksContext } from '../App'

const TaskContextMenu = ({ taskId }) => {
	const deleteTask = useDeleteTask().mutate

	const [state, dispatch] = useContext(TasksContext)

	const handleDeleteTask = async (taskId = state.open) => {
		if (state.selected.length > 1) await state.selected.map((tId) => deleteTask(tId))
		else await deleteTask(taskId)
		dispatch({ type: 'set', payload: { open: -1 } })
	}

	return (
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
			<Menu.Item key='delete' danger onClick={() => handleDeleteTask(taskId)}>
				Delete Task
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key='remove-from-project' onClick={() => console.log('TODO')}>
				Remove From Project
			</Menu.Item>
		</Menu>
	)
}

export default TaskContextMenu
