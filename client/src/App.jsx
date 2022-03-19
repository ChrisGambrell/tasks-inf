import { useEditTask, useTasks } from './hooks'

function App() {
	const { data: tasks } = useTasks()
	const editTask = useEditTask().mutate

	return (
		<div
			className='App'
			style={{ maxWidth: 600, margin: '25px auto 0 auto' }}>
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
		</div>
	)
}

export default App
