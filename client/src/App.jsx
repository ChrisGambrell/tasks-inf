import { useState } from 'react'
import { useCreateTask, useDeleteTask, useEditTask, useTasks } from './hooks'
import { Button, Checkbox, Col, Dropdown, Form, Input, Menu, Row } from 'antd'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import './App.min.css'

const App = () => {
	const { data: tasks } = useTasks()
	const createTask = useCreateTask().mutate
	const deleteTask = useDeleteTask().mutate
	const editTask = useEditTask().mutate

	const [showAddingTask, setShowAddingTask] = useState(false)
	const [selectedTask, setSelectedTask] = useState(-1)
	const [title, setTitle] = useState('')
	const [completed, setCompleted] = useState(false)

	const handleCreateTask = async (e) => {
		e.preventDefault()

		await createTask({ title, completed })
		setShowAddingTask(false)
		setTitle('')
		setCompleted(false)
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
				<Col
					sm={19}
					style={{
						maxWidth: 600,
						margin: '0 auto',
					}}>
					<ul style={{ listStyle: 'none' }}>
						{showAddingTask && (
							<li className='task-item active'>
								<Form onSubmitCapture={handleCreateTask}>
									<Checkbox
										checked={completed}
										onChange={() =>
											setCompleted(!completed)
										}
									/>
									<Input
										type='text'
										placeholder='New task'
										value={title}
										onChange={(e) =>
											setTitle(e.target.value)
										}
										bordered={false}
										style={{ width: 'calc(100% - 25px)' }}
									/>
								</Form>
							</li>
						)}
						{tasks?.map((task) => (
							<li
								className={`task-item ${
									selectedTask === task.id ? 'active' : ''
								}`}
								key={task.id}
								onDoubleClick={() =>
									setSelectedTask(
										selectedTask === task.id ? -1 : task.id
									)
								}
								onContextMenu={(e) => e.preventDefault()}>
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
										<Checkbox
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
					<div className='toolbar'>
						<Button
							type='text'
							onClick={() => setShowAddingTask(!showAddingTask)}>
							{showAddingTask ? (
								<CloseOutlined />
							) : (
								<PlusOutlined />
							)}
						</Button>
					</div>
					{/* <Form
						onSubmitCapture={handleCreateTask}
						style={{ position: 'fixed', bottom: 0 }}>
						<Input
							type='text'
							placeholder='New task'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</Form> */}
				</Col>
			</Row>
		</div>
	)
}

export default App
