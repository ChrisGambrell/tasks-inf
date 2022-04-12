import { headers as headersCollection } from '../../app/mockData'
import { Dropdown } from '..'
import { Task } from '.'

const TaskList = ({ tasks = [], showHeaders = false, ...options }) => {
	const headers = tasks.reduce((group, task) => {
		let { header_id } = task
		header_id = header_id === null ? -1 : header_id

		group[header_id] = group[header_id] ?? []
		group[header_id].push(task)
		return group
	}, {})

	return showHeaders
		? Object.keys(headers)
				.sort((a, b) => Number(a) - Number(b))
				.map((header_id) => (
					<div key={header_id} className='mb-8'>
						{/* Header */}
						{Number(header_id) !== -1 && (
							<div className='flex justify-between items-center pb-0.5 border-b border-gray-200 text-blue-600 font-semibold select-none'>
								<div>{headersCollection.find((header) => header.id === Number(header_id))?.title}</div>
								<Dropdown targetColor='text-blue-600'>
									<Dropdown.Item label='Archive' icon='check-to-slot' onClick={() => console.log('TODO')} />

									<Dropdown.Divider />

									<Dropdown.Item label='Move' icon='arrow-right' onClick={() => console.log('TODO')} />
									<Dropdown.Item
										label='Convert to Project...'
										icon='up-right-from-square'
										onClick={() => console.log('TODO')}
									/>
									<Dropdown.Item label='Delete' icon='trash' onClick={() => console.log('TODO')} />
								</Dropdown>
							</div>
						)}

						{/* Tasks */}
						{headers[header_id].map((task) => (
							<Task key={task.id} task={task} {...options} />
						))}
					</div>
				))
		: tasks.map((task) => <Task key={task.id} task={task} {...options} />)
}

export default TaskList
