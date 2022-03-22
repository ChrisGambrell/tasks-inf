import { useContext, useEffect, useState } from 'react'
import { Button, Checkbox, Col, Form, Input, message, Row } from 'antd'
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
			</Row>
		</Tag>
	)
}

export default TaskForm
