import { useContext, useEffect, useState } from 'react'
import { ActionIcon, Checkbox, Grid, Group, Stack, Textarea, TextInput, Tooltip } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { showNotification } from '@mantine/notifications'
import { Calendar, Flag3, List, Tag as TagIcon, X } from 'tabler-icons-react'
import { TasksContext } from '../App'
import { useCreateTask, useEditTask } from '../hooks'

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
			showNotification({ message: 'Task updated' })
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
			<Stack>
				<Group style={{ display: 'flex', alignItems: 'flex-start' }}>
					<Checkbox
						checked={type === 'create' ? completed : task.completed}
						onChange={() =>
							type === 'create'
								? setCompleted(!completed)
								: editTask.mutate({ taskId: task.id, data: { completed: !task.completed } })
						}
						style={{ flex: '0', marginTop: 9 }}
					/>
					<form onSubmit={type === 'create' ? handleCreateTask : handleEditTask} style={{ flex: '1' }}>
						<Stack spacing={0}>
							<TextInput
								type='text'
								variant='unstyled'
								placeholder='New task'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								autoFocus
							/>
							<Textarea
								variant='unstyled'
								placeholder='Notes'
								value={notes}
								onChange={(e) => setNotes(e.target.value)}
								autosize
							/>
						</Stack>
					</form>
				</Group>
				<Grid grow='true'>
					<Grid.Col span={1}>
						{task.when && (
							<Stack style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
								<span className='task-detail'>
									<Calendar color='red' size={16} />
									<span style={{ margin: '0 5px', flex: 0 }}>
										{new Date(task.when).toLocaleDateString() === new Date().toLocaleDateString()
											? 'Today'
											: new Date(task.when).toLocaleDateString()}
									</span>
									<ActionIcon size='md' onClick={() => editTask.mutate({ taskId: task.id, data: { when: null } })}>
										<X />
									</ActionIcon>
								</span>
								<span style={{ flex: 1 }}></span>
							</Stack>
						)}
					</Grid.Col>
					<Grid.Col span={1}>
						<Group position='right'>
							{!task.when && (
								<>
									{showWhen ? (
										<DatePicker
											size='xs'
											placeholder='When'
											value={task.when ? new Date(task.when) : null}
											onChange={(e) => {
												editTask.mutate({ taskId: task.id, data: { when: e } })
												setShowWhen(false)
											}}
											firstDayOfWeek='sunday'
											dayStyle={(date) =>
												date.toLocaleDateString() === new Date().toLocaleDateString()
													? { border: '1px solid lightgrey', borderRadius: 25 }
													: null
											}
											style={{ width: 100 }}
										/>
									) : (
										<Tooltip label='When' openDelay={500}>
											<ActionIcon size='lg' onClick={() => setShowWhen(true)}>
												<Calendar />
											</ActionIcon>
										</Tooltip>
									)}
								</>
							)}
							<Tooltip label='Tags' openDelay={500}>
								<ActionIcon size='lg' onClick={() => console.log('TODO')}>
									<TagIcon />
								</ActionIcon>
							</Tooltip>
							<Tooltip label='Checklist' openDelay={500}>
								<ActionIcon size='lg' onClick={() => console.log('TODO')}>
									<List />
								</ActionIcon>
							</Tooltip>
							<Tooltip label='Deadline' openDelay={500}>
								<ActionIcon size='lg' onClick={() => console.log('TODO')}>
									<Flag3 />
								</ActionIcon>
							</Tooltip>
						</Group>
					</Grid.Col>
				</Grid>
			</Stack>
		</Tag>
	)
}

export default TaskForm
