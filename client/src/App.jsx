import { useState } from 'react'
import { useCreateTask, useDeleteTask, useEditTask, useTasks } from './hooks'
import { Col, Dropdown, Form, Input, Menu, Row } from 'antd'
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
		<div className='App'>
			<Row style={{ margin: '25px 0' }}>
				<Col sm={5}>
					<h1 style={{ marginLeft: 25 }}>Tasks &infin;</h1>
					<Menu defaultSelectedKeys={['1']} mode='inline'>
						<Menu.Item key='1'>Tasks</Menu.Item>
					</Menu>
				</Col>
				<Col sm={19} style={{ maxWidth: 600, margin: '0 auto' }}>
					<ul style={{ listStyle: 'none' }}>
						{tasks?.map((task) => (
							<li
								className='task-item'
								key={task.id}
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
												onClick={() =>
													deleteTask(task.id)
												}>
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
														completed:
															!task.completed,
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
				</Col>
			</Row>
		</div>
	)
}

export default App
