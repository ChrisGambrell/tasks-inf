import { useEffect, useState } from 'react'
import { Checkbox, Textarea, TextInput } from '@mantine/core'
import { useClickOutside } from '@mantine/hooks'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { Tooltip } from '..'
import { DateSelect } from '.'

const NewTask = ({ defaultChecklist, defaultTags, defaultWhen }) => {
	const [checklist, setChecklist] = useState(defaultChecklist)
	const [tags, setTags] = useState(defaultTags)

	const [focused, setFocused] = useState(-1)
	const clickOutsideChecklist = useClickOutside(() => setFocused(-1))

	const [newTitle, setNewTitle] = useState('')
	const [newNotes, setNewNotes] = useState('')
	const [newCompleted, setNewCompleted] = useState(false)
	const [newWhen, setNewWhen] = useState(defaultWhen)

	useEffect(() => console.log(newWhen), [newWhen, setNewWhen])

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
			{/* TODO show actual date */}
			<DateSelect
				title='When'
				value={newWhen}
				onChange={setNewWhen}
				target={
					<button className='group flex items-center space-x-1 px-1 rounded border border-white text-sm text-gray-800 hover:border-gray-300 active:bg-gray-300'>
						<FA
							className={
								newWhen.toLocaleDateString() === new Date().toLocaleDateString() ? 'text-yellow-400' : 'text-red-500'
							}
							icon={newWhen.toLocaleDateString() === new Date().toLocaleDateString() ? 'star' : 'calendar-days'}
						/>
						<div className='font-semibold'>
							{newWhen.toLocaleDateString() === new Date().toLocaleDateString()
								? 'Today'
								: newWhen.toLocaleDateString() ===
								  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1).toLocaleDateString()
								? 'Tomorrow'
								: newWhen.toLocaleDateString(
										'en-us',
										newWhen < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7)
											? { weekday: 'long' }
											: { month: 'long', day: 'numeric' }
								  )}
						</div>
						{/* TODO - clear X button */}
					</button>
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
		<div className='flex flex-col mb-12 rounded p-4 space-y-1 border shadow-md'>
			{/* Tooltips on toolbar buttons */}
			<div className='flex space-x-2'>
				<div className='flex-none'>
					<Checkbox className='mt-2.5' size='xs' />
				</div>
				<div className='flex-grow flex flex-col'>
					<TextInput variant='unstyled' type='text' placeholder='New To-Do' />
					<Textarea variant='unstyled' placeholder='Notes' autosize />
					{/* {checklist?.length > 0 && <Checklist />} */}
				</div>
			</div>
			<div className='flex justify-between items-end'>
				<div className='flex flex-col space-y-2'>
					{/* {tags?.length > 0 && <Tags />} */}
					{newWhen && <SelectedWhen />}
				</div>
				<div className='flex justify-end space-x-2'>
					{!newWhen && (
						<DateSelect
							title='When'
							value={newWhen}
							onChange={setNewWhen}
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

export default NewTask
