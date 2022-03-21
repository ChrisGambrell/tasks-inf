import { useEffect, useState } from 'react'
import { useDeleteTask } from './hooks'
import { Button, Col, Menu, Row } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

import { TaskList } from './components'
import './App.min.css'

const App = () => {
	const deleteTask = useDeleteTask().mutate

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
					<TaskList
						selectedTask={selectedTask}
						showAddingTask={showAddingTask}
						setSelectedTask={setSelectedTask}
						setShowAddingTask={setShowAddingTask}
					/>
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
