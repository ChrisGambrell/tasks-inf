import { useEffect, useState } from 'react'
import { useDeleteTask, useEditTask, useTasks } from './hooks'
import { Button, Checkbox, Col, Dropdown, Menu, Row } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

import { TaskForm } from './components'
import './App.min.css'

const App = () => {
	const { data: tasks } = useTasks()
	const deleteTask = useDeleteTask().mutate
	const editTask = useEditTask().mutate

	const [showAddingTask, setShowAddingTask] = useState(false)
	const [selectedTask, setSelectedTask] = useState(-1)

	const handleDeleteTask = async (taskId = selectedTask) => {
		await deleteTask(taskId)
		setSelectedTask(-1)
	}

	useEffect(() => {
		const handleKeyDown = (e) => {
			switch (e.keyCode) {
				case 27:
					setSelectedTask(-1)
					break
				default:
					break
			}
		}

		const handleMouseDown = (e) => {
			let currElement = e.srcElement
			while (currElement.parentElement) {
				currElement = currElement.parentElement
				if (currElement.id === 'toolbar' || Number(currElement.id) === selectedTask) return
			}

			setSelectedTask(-1)
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
								<TaskForm type='create' setShowAddingTask={setShowAddingTask} />
							</li>
						)}
						{tasks?.map((task) => (
							<li
								className={`task-item ${selectedTask === task.id ? 'active' : ''}`}
								key={task.id}
								id={task.id}
								onDoubleClick={() => setSelectedTask(task.id)}
								onContextMenu={(e) => e.preventDefault()}>
								<Dropdown
									overlay={
										<Menu>
											<Menu.Item key='delete' danger onClick={() => handleDeleteTask(task.id)}>
												Delete task
											</Menu.Item>
										</Menu>
									}
									trigger={['contextMenu']}>
									<div>
										{selectedTask === task.id ? (
											<TaskForm type='edit' task={task} />
										) : (
											<Row>
												<Col span={1}>
													<Checkbox
														checked={task.completed}
														onChange={() => editTask({ taskId: task.id, data: { completed: !task.completed } })}
													/>
												</Col>
												<Col span={23} style={{ paddingLeft: 3 }}>
													{task.title}
												</Col>
											</Row>
										)}
									</div>
								</Dropdown>
							</li>
						))}
					</ul>
					<div className='toolbar' id='toolbar'>
						{selectedTask > -1 || showAddingTask ? (
							<Button
								type='text'
								onClick={() => {
									if (showAddingTask) setShowAddingTask(false)
									else handleDeleteTask()
								}}>
								<DeleteOutlined />
							</Button>
						) : (
							<Button type='text' onClick={() => setShowAddingTask(true)}>
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
