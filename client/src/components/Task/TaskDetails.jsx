import { useContext, useEffect, useState } from 'react'
import { Checkbox, Textarea, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { useEditTask } from '../../hooks'
import { TasksContext } from '../../App'
import { Tooltip } from '..'
import { DateSelect } from '.'

const TaskDetails = ({ task }) => {
	// const [checklist, setChecklist] = useState(defaultChecklist)
	// const [tags, setTags] = useState(defaultTags)

	// const [focused, setFocused] = useState(-1)
	// const clickOutsideChecklist = useClickOutside(() => setFocused(-1))

	// const [newTitle, setNewTitle] = useState('')
	// const [newNotes, setNewNotes] = useState('')
	// const [newCompleted, setNewCompleted] = useState(false)

	const [state, dispatch] = useContext(TasksContext)

	useEffect(() => console.log(state), [state, dispatch])

	const editTask = useEditTask().mutate

	const [title, setTitle] = useState(task.title)
	const [notes, setNotes] = useState(task.notes)

	const [debouncedTitle] = useDebouncedValue(title, 200)
	const [debouncedNotes] = useDebouncedValue(notes, 200)

	useEffect(
		() =>
			debouncedTitle !== task.title && debouncedTitle.trim() !== '' && editTask({ taskId: task.id, data: { title: debouncedTitle } }),
		[debouncedTitle]
	)
	useEffect(
		() =>
			debouncedNotes !== task.notes && debouncedNotes.trim() !== '' && editTask({ taskId: task.id, data: { notes: debouncedNotes } }),
		[debouncedNotes]
	)

	const handleEditCompleted = () => {
		if (task.completed === false) dispatch({ type: 'set', payload: { selectedTask: [], moveType: null, moveId: -1 } })
		editTask({ taskId: task.id, data: { completed: !task.completed } })
		dispatch({ type: 'set', payload: { open: -1 } })
	}

	const handleEditWhen = (when) => {
		editTask({ taskId: task.id, data: { when } })
	}

	// const Checklist = () => (
	// 	<div className='mb-4' ref={clickOutsideChecklist}>
	// 		{checklist.map((item, i) => (
	// 			<TextInput
	// 				key={i}
	// 				classNames={{ input: 'border-none font-semibold' }}
	// 				variant={focused === i ? 'filled' : 'unstyled'}
	// 				size='xs'
	// 				type='text'
	// 				icon={<FA className='w-2 h-2 text-blue-600' icon='circle-dot' />}
	// 				defaultValue={item}
	// 				autoFocus={focused === i}
	// 				onFocus={() => setFocused(i)}
	// 			/>
	// 		))}
	// 	</div>
	// )

	// const Tags = () => (
	// 	<div className='flex space-x-1 select-none'>
	// 		{/* TODO fix overflow */}
	// 		{tags.map((tag) => (
	// 			<div key={tag} className='px-2 rounded-full bg-green-300 text-sm text-green-700 active:bg-blue-400 active:text-white'>
	// 				{tag}
	// 			</div>
	// 		))}
	// 	</div>
	// )

	const SelectedWhen = () => (
		<div>
			<DateSelect
				title='When'
				value={task.when}
				onChange={handleEditWhen}
				target={
					<div className='group flex items-center space-x-1 pl-1 rounded border select-none border-white text-sm text-gray-800 hover:border-gray-300 active:bg-gray-300'>
						<FA
							className={
								task.when.toLocaleDateString() === new Date().toLocaleDateString() ? 'text-yellow-400' : 'text-red-500'
							}
							icon={task.when.toLocaleDateString() === new Date().toLocaleDateString() ? 'star' : 'calendar-days'}
						/>
						<div className='font-semibold'>
							{task.when.toLocaleDateString() === new Date().toLocaleDateString()
								? 'Today'
								: task.when.toLocaleDateString() ===
								  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1).toLocaleDateString()
								? 'Tomorrow'
								: task.when.toLocaleDateString(
										'en-us',
										task.when < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7)
											? { weekday: 'long' }
											: { month: 'long', day: 'numeric' }
								  )}
						</div>
						<FA
							className='w-2.5 h-2.5 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-gray-200'
							icon='x'
							onClick={() => handleEditWhen(null)}
						/>
					</div>
				}
			/>
		</div>
	)

	const ToolbarButton = ({ label, icon = 'circle-question', onClick = () => {} }) =>
		label ? (
			<Tooltip
				target={
					<button
						className='px-1 rounded border border-white text-gray-400 hover:border-gray-300 active:bg-gray-300'
						onClick={onClick}>
						<FA icon={icon} />
					</button>
				}>
				<div>{label}</div>
			</Tooltip>
		) : (
			<button className='px-1 rounded border border-white text-gray-400 hover:border-gray-300 active:bg-gray-300' onClick={onClick}>
				<FA icon={icon} />
			</button>
		)

	return (
		<div className='flex flex-col mt-8 mb-12 rounded p-4 space-y-1 border shadow-md'>
			{/* Tooltips on toolbar buttons */}
			<div className='flex space-x-2'>
				<div className='flex-none'>
					<Checkbox className='mt-2.5' size='xs' value={task.completed || false} onChange={handleEditCompleted} />
				</div>
				<div className='flex-grow flex flex-col'>
					<TextInput
						variant='unstyled'
						type='text'
						placeholder='New To-Do'
						value={title || ''}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Textarea
						variant='unstyled'
						placeholder='Notes'
						value={notes || ''}
						onChange={(e) => setNotes(e.target.value)}
						autosize
					/>
					{/* {checklist?.length > 0 && <Checklist />} */}
				</div>
			</div>
			<div className='flex justify-between items-end'>
				<div className='flex flex-col space-y-2'>
					{/* {tags?.length > 0 && <Tags />} */}
					{task.when && <SelectedWhen />}
				</div>
				<div className='flex justify-end space-x-2'>
					{!task.when && (
						<DateSelect
							title='When'
							value={task.when}
							onChange={handleEditWhen}
							target={<ToolbarButton label='When' icon='calendar-days' />}
						/>
					)}
					{/* TODO:  */}
					{/* {(!tags || tags?.length === 0) && showTagsInput ? (
						<TextInput
							classNames={{ input: 'border-none font-semibold' }}
							variant='filled'
							size='xs'
							type='text'
							icon={<FA icon='tag' />}
							placeholder='Tags'
						/>
					) : (
						<ToolbarButton label='Tags' icon='tag' onClick={() => setShowTagsInput(true)} />
					)}
					{(!checklist || checklist?.length === 0) && (
						<ToolbarButton label='Checklist' icon='list-ul' onClick={() => console.log('TODO')} />
					)}
					<DateSelect
						title='Deadline'
						hideQuickDates
						target={<ToolbarButton label='Deadline' icon='flag' onClick={() => console.log('TODO')} />}
					/> */}
				</div>
			</div>
		</div>
	)
}

export default TaskDetails
