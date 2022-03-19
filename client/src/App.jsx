import { useState } from 'react'
import { useCreateTask, useDeleteTask, useEditTask, useTasks } from './hooks'
import { Dropdown, Form, Input, Menu } from 'antd'
import './App.min.css'

const App = () => {
	const { data: tasks } = useTasks()
	const createTask = useCreateTask().mutate
	const deleteTask = useDeleteTask().mutate
	const editTask = useEditTask().mutate

	const [title, setTitle] = useState('')

	const handleCreateTask = async (e) => {
		e.preventDefault()

		await createTask(title)
		setTitle('')
	}

	return (
		<div
			className='App'
			style={{ maxWidth: 600, margin: '25px auto 0 auto' }}>
			<h1>Tasks &infin;</h1>
			<ul style={{ listStyle: 'none' }}>
				{tasks?.map((task) => (
					<li
						className='task-item'
						key={task.id}
						onDoubleClick={() => deleteTask(task.id)}
						onContextMenu={(e) => e.preventDefault()}
						style={{
							padding: '5px 10px',
						}}>
						<Dropdown
							overlay={
								<Menu>
									<Menu.Item
										key='delete'
										danger
										onClick={() => deleteTask(task.id)}>
										Delete task
									</Menu.Item>
								</Menu>
							}
							trigger={['contextMenu']}>
							<div>
								<input
									type='checkbox'
									checked={task.completed}
									onChange={() =>
										editTask({
											taskId: task.id,
											data: {
												completed: !task.completed,
											},
										})
									}
									style={{ marginRight: 10 }}
								/>
								{task.title}
							</div>
						</Dropdown>
					</li>
				))}
			</ul>
			<Form onSubmitCapture={handleCreateTask}>
				<Input
					type='text'
					placeholder='New task'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</Form>
		</div>
	)
}

export default App
