import { useEffect, useState } from 'react'
import { useCreateTask, useDeleteTask, useEditTask, useTasks } from './hooks'
import {
	Button,
	Checkbox,
	Col,
	Dropdown,
	Form,
	Input,
	Menu,
	Row,
	TextArea,
} from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
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

	const [editTitle, setEditTitle] = useState('')
	const [editNotes, setEditNotes] = useState('')

	const handleSelectTask = (task) => {
		setEditTitle(task.title)
		setEditNotes(task.notes)
		setSelectedTask(task.id)
	}

	const handleDeselectTask = () => {
		setEditTitle('')
		setEditNotes('')
		setSelectedTask(-1)
	}

	const handleCreateTask = async (e) => {
		e.preventDefault()

		await createTask({ title, completed })
		setShowAddingTask(false)
		setTitle('')
		setCompleted(false)
	}

	const handleEditTask = (e) => {
		e.preventDefault()
		editTask({
			taskId: selectedTask,
			data: { title: editTitle, notes: editNotes },
		})
	}

	const handleDeleteTask = async (taskId = selectedTask) => {
		await deleteTask(taskId)
		handleDeselectTask()
	}

	const handleCloseAddTask = () => {
		setShowAddingTask(false)
		setTitle('')
		setCompleted(false)
	}

	useEffect(() => {
		const handleKeyDown = (e) => {
			switch (e.keyCode) {
				case 27:
					handleDeselectTask()
					break
				default:
					break
			}
		}

		const handleMouseDown = (e) => {
			let currElement = e.srcElement
			while (currElement.parentElement) {
				currElement = currElement.parentElement
				if (
					currElement.id === 'toolbar' ||
					Number(currElement.id) === selectedTask
				)
					return
			}

			handleDeselectTask()
		}

		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('mousedown', handleMouseDown)
		return function cleanup() {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('mousedown', handleMouseDown)
		}
	}, [selectedTask])

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
								id={task.id}
								onDoubleClick={() => handleSelectTask(task)}
								onContextMenu={(e) => e.preventDefault()}>
								<Dropdown
									overlay={
										<Menu>
											<Menu.Item
												key='delete'
												danger
												onClick={() =>
													handleDeleteTask(task.id)
												}>
												Delete task
											</Menu.Item>
										</Menu>
									}
									trigger={['contextMenu']}>
									<Row>
										<Col span={1}>
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
											/>
										</Col>
										{selectedTask === task.id ? (
											<Col
												span={23}
												style={{
													paddingLeft: 3,
												}}>
												<Form
													onSubmitCapture={
														handleEditTask
													}>
													<Input
														type='text'
														size='small'
														placeholder='New task'
														value={editTitle}
														onChange={(e) =>
															setEditTitle(
																e.target.value
															)
														}
														bordered={false}
													/>
													<Input.TextArea
														placeholder='Notes'
														value={editNotes}
														allowClear
														onChange={(e) =>
															setEditNotes(
																e.target.value
															)
														}
														bordered={false}
													/>
													<Button
														htmlType='submit'
														type='primary'
														size='small'
														style={{
															marginTop: 10,
														}}>
														Save
													</Button>
												</Form>
											</Col>
										) : (
											<Col
												span={23}
												style={{ paddingLeft: 3 }}>
												{task.title}
												{selectedTask === task.id &&
													task.notes && (
														<>
															<br />
															{task.notes}
														</>
													)}
											</Col>
										)}
									</Row>
								</Dropdown>
							</li>
						))}
					</ul>
					<div className='toolbar' id='toolbar'>
						{selectedTask > -1 || showAddingTask ? (
							<Button
								type='text'
								onClick={() => {
									if (showAddingTask) handleCloseAddTask()
									else handleDeleteTask()
								}}>
								<DeleteOutlined />
							</Button>
						) : (
							<Button
								type='text'
								onClick={() => setShowAddingTask(true)}>
								<PlusOutlined />
							</Button>
						)}
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default App
