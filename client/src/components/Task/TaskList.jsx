import { useState } from 'react'
import { useHeaders, useDeleteHeader } from '../../hooks'
import { Dropdown } from '..'
import { Task } from '.'

const TaskList = ({ tasks = [], projectId, showHeaders = false, showLogged = false, noMargin = false, ...options }) => {
	const incompleteTasks = tasks.filter((task) => !task.completed)
	const completedTasks = tasks.filter((task) => task.completed).sort((a, b) => b.completed_when - a.completed_when)

	const { data: headersCollection = [] } = useHeaders()
	const headersForProject = headersCollection.filter((header) => header.project_id === projectId)

	const deleteHeader = useDeleteHeader().mutate

	const headers = showLogged
		? incompleteTasks.reduce(
				(group, task) => {
					let { header_id } = task
					header_id = header_id === null ? -1 : header_id

					group[header_id] = group[header_id] ?? []
					group[header_id].push(task)
					return group
				},
				headersForProject.reduce((group, header) => {
					let { id } = header
					group[id] = []
					return group
				}, {})
		  )
		: tasks.reduce(
				(group, task) => {
					let { header_id } = task
					header_id = header_id === null ? -1 : header_id

					group[header_id] = group[header_id] ?? []
					group[header_id].push(task)
					return group
				},
				headersForProject.reduce((group, header) => {
					let { id } = header
					group[id] = []
					return group
				}, {})
		  )

	const [showLoggedItems, setShowLoggedItems] = useState(false)

	return (
		<div className={`${!noMargin && 'mt-8'}`}>
			<div>
				{showHeaders ? (
					Object.keys(headers)
						.sort((a, b) => Number(a) - Number(b))
						.map((header_id) => (
							<div key={header_id} className='mb-8'>
								{/* Header */}
								{Number(header_id) !== -1 && (
									<div className='flex justify-between items-center pb-0.5 border-b border-gray-200 text-blue-600 font-semibold select-none'>
										<div
											className={`
												${!headersForProject.find((header) => header.id === Number(header_id))?.title && 'text-blue-200'}
											`}>
											{headersForProject.find((header) => header.id === Number(header_id))?.title || 'New Heading'}
										</div>
										<Dropdown targetColor='text-blue-600'>
											<Dropdown.Item label='Archive' icon='check-to-slot' onClick={() => console.log('TODO')} />

											<Dropdown.Divider />

											<Dropdown.Item label='Move' icon='arrow-right' onClick={() => console.log('TODO')} />
											<Dropdown.Item
												label='Convert to Project...'
												icon='up-right-from-square'
												onClick={() => console.log('TODO')}
											/>
											<Dropdown.Item label='Delete' icon='trash' onClick={() => deleteHeader(Number(header_id))} />
										</Dropdown>
									</div>
								)}

								{/* Tasks */}
								{headers[header_id].map((task) => (
									<Task key={task.id} task={task} {...options} />
								))}

								{/* TODO hide later items */}
							</div>
						))
				) : (
					<div className='mb-8'>
						{showLogged
							? incompleteTasks.map((task) => <Task key={task.id} task={task} {...options} />)
							: tasks.map((task) => <Task key={task.id} task={task} {...options} />)}
					</div>
				)}
			</div>

			{/* Logged tasks */}
			{showLogged && completedTasks.length > 0 && (
				<div>
					<button
						className='px-1 rounded border border-white font-semibold text-xs text-gray-400 hover:border-gray-300 active:bg-gray-300'
						onClick={() => setShowLoggedItems(!showLoggedItems)}>
						{showLoggedItems ? 'Hide logged items' : `Show ${completedTasks.length} logged items`}
					</button>
					{showLoggedItems && <TaskList tasks={completedTasks} secondary showCompletedWhen showHeader />}
				</div>
			)}
		</div>
	)
}

export default TaskList
