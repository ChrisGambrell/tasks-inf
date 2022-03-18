import { getTasks } from './hooks'

function App() {
	const { data: tasks } = getTasks()

	return (
		<div className='App'>
			<ul style={{ listStyle: 'none' }}>
				{tasks?.map((task) => (
					<li key={task.id} style={{ display: 'flex' }}>
						<input
							type='checkbox'
							checked={task.completed}
							style={{ marginRight: 10 }}
						/>{' '}
						{task.title}
					</li>
				))}
			</ul>
		</div>
	)
}

export default App
