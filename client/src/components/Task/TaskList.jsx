import { faArrowRight, faCheckToSlot, faUpRightFromSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { headers as headersCollection } from '../../app/mockData'
import { Dropdown } from '..'
import { Task } from '.'

const TaskList = ({ tasks = [], showHeaders = false, ...options }) => {
	const headers = tasks.reduce((group, task) => {
		let { headerId } = task
		headerId = headerId === null ? -1 : headerId

		group[headerId] = group[headerId] ?? []
		group[headerId].push(task)
		return group
	}, {})

	return showHeaders
		? Object.keys(headers)
				.sort((a, b) => Number(a) - Number(b))
				.map((headerId) => (
					<div key={headerId} className='mb-8'>
						{/* Header */}
						{Number(headerId) !== -1 && (
							<div className='flex justify-between items-center pb-0.5 border-b border-gray-200 text-blue-600 font-semibold select-none'>
								<div>{headersCollection.find((header) => header.id === Number(headerId))?.title}</div>
								<Dropdown targetColor='text-blue-600'>
									<Dropdown.Item label='Archive' icon={faCheckToSlot} onClick={() => console.log('TODO')} />

									<Dropdown.Divider />

									<Dropdown.Item label='Move' icon={faArrowRight} onClick={() => console.log('TODO')} />
									<Dropdown.Item
										label='Convert to Project...'
										icon={faUpRightFromSquare}
										onClick={() => console.log('TODO')}
									/>
									<Dropdown.Item label='Delete' icon={faTrash} onClick={() => console.log('TODO')} />
								</Dropdown>
							</div>
						)}

						{/* Tasks */}
						{headers[headerId].map((task) => (
							<Task key={task.id} task={task} {...options} />
						))}
					</div>
				))
		: tasks.map((task) => <Task key={task.id} task={task} {...options} />)
}

export default TaskList
