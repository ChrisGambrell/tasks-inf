import { useContext, useEffect, useState } from 'react'
import { Button, Checkbox, Col, Form, Input, message, Row, Tooltip, Typography } from 'antd'
import { CalendarOutlined, FlagOutlined, TagOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { TasksContext } from '../App'
import { useCreateTask, useEditTask } from '../hooks'

const TaskForm = ({ type = 'create', as: Tag = 'div', className = '', task = {} }) => {
	const createTask = useCreateTask().mutate
	const editTask = useEditTask()

	const [_state, dispatch] = useContext(TasksContext)

	const [title, setTitle] = useState('')
	const [notes, setNotes] = useState('')
	const [completed, setCompleted] = useState(false)

	const handleCreateTask = async (e) => {
		e.preventDefault()

		await createTask({ title, notes, completed })
		dispatch({ type: 'set', payload: { showAddingTask: false } })
		setTitle('')
		setNotes('')
		setCompleted(false)
	}

	const handleEditTask = async (e) => {
		e.preventDefault()
		try {
			await editTask.mutateAsync({
				taskId: task.id,
				data: { title, notes },
			})
			message.success('Task updated')
		} catch (err) {}
	}

	useEffect(() => {
		if (type === 'edit') {
			setTitle(task.title)
			setNotes(task.notes)
			setCompleted(task.completed)
		}
	}, [type, task])

	return (
		<Tag className={className}>
			<Row>
				<Col span={1}>
					<Checkbox
						checked={type === 'create' ? completed : task.completed}
						onChange={() =>
							type === 'create'
								? setCompleted(!completed)
								: editTask.mutate({ taskId: task.id, data: { completed: !task.completed } })
						}
					/>
				</Col>
				<Col span={23} style={{ paddingLeft: 3 }}>
					<Form onSubmitCapture={type === 'create' ? handleCreateTask : handleEditTask}>
						<Input
							type='text'
							size='small'
							placeholder='New task'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							bordered={false}
						/>
						<Input.TextArea
							placeholder='Notes'
							value={notes}
							allowClear
							onChange={(e) => setNotes(e.target.value)}
							bordered={false}
						/>
						<Row
							style={{
								marginTop: 10,
							}}>
							<Col span={12}>
								<Button htmlType='submit' type='primary' size='small'>
									Save
								</Button>
							</Col>
							<Col span={12} style={{ textAlign: 'right' }}>
								<Tooltip title='When'>
									<Button type='text' onClick={() => console.log('TODO')}>
										<Typography.Text type='secondary'>
											<CalendarOutlined />
										</Typography.Text>
									</Button>
								</Tooltip>
								<Tooltip title='Tags'>
									<Button type='text' onClick={() => console.log('TODO')}>
										<Typography.Text type='secondary'>
											<TagOutlined />
										</Typography.Text>
									</Button>
								</Tooltip>
								<Tooltip title='Checklist'>
									<Button type='text' onClick={() => console.log('TODO')}>
										<Typography.Text type='secondary'>
											<UnorderedListOutlined />
										</Typography.Text>
									</Button>
								</Tooltip>
								<Tooltip title='Deadline'>
									<Button type='text' onClick={() => console.log('TODO')}>
										<Typography.Text type='secondary'>
											<FlagOutlined />
										</Typography.Text>
									</Button>
								</Tooltip>
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
		</Tag>
	)
}

export default TaskForm
