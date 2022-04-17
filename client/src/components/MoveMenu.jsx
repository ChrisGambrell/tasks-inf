import { useContext } from 'react'
import { Modal } from '@mantine/core'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { useAreas, useProjects, useTask, useEditTask } from '../hooks'
import { TasksContext } from '../App'

const Divider = () => <hr className='my-0.5 border-gray-600' />

const Item = ({ label, icon, color = 'text-gray-300', active = false, data = {} }) => {
	const editTask = useEditTask().mutate

	return (
		<div
			className='flex items-center space-x-2 px-1 rounded hover:bg-blue-500 select-none'
			onClick={() => data.taskId && editTask(data)}>
			{icon && (
				<div className='flex-none'>
					<FA className={`w-4 h-4 ${color}`} icon={icon} />
				</div>
			)}
			<div className='flex-grow truncate'>{label}</div>
			{active && (
				<div className='flex-none'>
					<FA className='w-4 h-4 text-blue-400' icon='check' />
				</div>
			)}
		</div>
	)
}

// TODO move projects
const MoveMenu = () => {
	const { data: areas = [] } = useAreas()
	const { data: projects = [] } = useProjects()

	const [state, dispatch] = useContext(TasksContext)
	const { data: task = {} } = useTask(state.move, Boolean(state.move !== -1))

	return (
		<Modal
			classNames={{ modal: 'w-80 bg-gray-800 text-gray-50 p-1', overlay: 'opacity-0' }}
			opened={state.move !== -1}
			onClose={() => dispatch({ type: 'set', payload: { move: -1 } })}
			withCloseButton={false}
			id='move-menu'>
			<div onClick={() => dispatch({ type: 'set', payload: { move: -1 } })}>
				{/* TODO this will work when there is an inbox category */}
				<Item label='Inbox' icon='inbox' active={task.category === 'inbox'} />
				<Item
					label={`No ${(task.area_id && 'Area') || (task.project_id && 'Project')}`}
					icon='x'
					active={!task.area_id && !task.project_id}
					data={{ taskId: task.id, data: { area_id: null, project_id: null } }}
				/>

				<Divider />

				{projects
					.filter((project) => project.area_id === null)
					.map((project) => (
						<Item
							key={project.id}
							label={project.title}
							icon={project.icon || 'circle'}
							color='text-blue-400'
							active={task.project_id === project.id}
							data={{ taskId: task.id, data: { area_id: null, project_id: project.id, header_id: null } }}
						/>
					))}

				{areas.map((area) => (
					<div key={area.id}>
						<Divider />
						<Item
							label={area.title}
							icon='box'
							color='text-green-500'
							active={task.area_id === area.id}
							data={{ taskId: task.id, data: { area_id: area.id, project_id: null, header_id: null } }}
						/>

						{projects
							.filter((project) => project.area_id === area.id)
							.map((project) => (
								<Item
									key={project.id}
									label={project.title}
									icon={project.icon || 'circle'}
									color='text-blue-400'
									active={task.project_id === project.id}
									data={{ taskId: task.id, data: { area_id: null, project_id: project.id, header_id: null } }}
								/>
							))}
					</div>
				))}
			</div>
		</Modal>
	)
}

export default MoveMenu
