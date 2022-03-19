import { useState } from 'react'
import { useCreateTask, useEditTask, useTasks } from './hooks'
import { Form, Input } from 'antd'

function App() {
	const { data: tasks } = useTasks()
	const createTask = useCreateTask().mutate
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
						key={task.id}
						style={{
							padding: '5px 10px',
						}}>
						<input
							type='checkbox'
							checked={task.completed}
							onChange={() =>
								editTask({
									taskId: task.id,
									data: { completed: !task.completed },
								})
							}
							style={{ marginRight: 10 }}
						/>
						{task.title}
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
