import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { Button, Checkbox, Col, DatePicker, Form, Input, message, Row, Tooltip, Typography } from 'antd'
import { CalendarOutlined, FlagOutlined, TagOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { TasksContext } from '../App'
import { useCreateTask, useEditTask } from '../hooks'
import { TaskDetail } from '.'

const TaskForm = ({ type = 'create', as: Tag = 'div', className = '', task = {} }) => {
	const createTask = useCreateTask().mutate
	const editTask = useEditTask()

	const [_state, dispatch] = useContext(TasksContext)

	const [title, setTitle] = useState('')
	const [notes, setNotes] = useState('')
	const [completed, setCompleted] = useState(false)

	const [showWhen, setShowWhen] = useState(false)

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
		<Tag className={`TaskForm ${className}`}>
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
						<Input.TextArea placeholder='Notes' value={notes} onChange={(e) => setNotes(e.target.value)} bordered={false} />
						<Row
							style={{
								marginTop: 10,
							}}>
							<Col span={4} style={{ display: 'flex', flexDirection: 'row' }}>
								{/* <Button htmlType='submit' type='primary' size='small'>
									Save
								</Button> */}
								{task.when && (
									<TaskDetail
										icon={<CalendarOutlined style={{ color: 'red' }} />}
										title={
											new Date(task.when).toLocaleDateString() === new Date().toLocaleDateString()
												? 'Today'
												: new Date(task.when).toLocaleDateString()
										}
										onClick={() => editTask.mutate({ taskId: task.id, data: { when: null } })}
									/>
								)}
							</Col>
							<Col span={20} style={{ textAlign: 'right' }}>
								{!task.when && (
									<>
										{showWhen ? (
											<DatePicker
												size='small'
												defaultValue={task.when ? moment(task.when) : null}
												onChange={(e) => {
													editTask.mutate({ taskId: task.id, data: { when: e._d } })
													setShowWhen(false)
												}}
											/>
										) : (
											<Tooltip title='When'>
												<Button type='text' onClick={() => setShowWhen(true)}>
													<Typography.Text type='secondary'>
														<CalendarOutlined />
													</Typography.Text>
												</Button>
											</Tooltip>
										)}
									</>
								)}
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
