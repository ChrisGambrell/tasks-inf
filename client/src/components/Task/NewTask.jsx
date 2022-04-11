import { useState } from 'react'
import { Checkbox, Textarea, TextInput } from '@mantine/core'
import { useClickOutside } from '@mantine/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faCircleDot, faFlag, faListUl, faStar, faTag } from '@fortawesome/free-solid-svg-icons'
import { WhenSelect } from '..'

const NewTask = ({ defaultChecklist, defaultTags, defaultWhen }) => {
	const [checklist, setChecklist] = useState(defaultChecklist)
	const [tags, setTags] = useState(defaultTags)
	const [when, setWhen] = useState(defaultWhen)

	const [focused, setFocused] = useState(-1)
	const clickOutsideChecklist = useClickOutside(() => setFocused(-1))

	const Checklist = () => (
		<div className='mb-4' ref={clickOutsideChecklist}>
			{checklist.map((item, i) => (
				<TextInput
					key={i}
					classNames={{ input: 'border-none font-semibold' }}
					variant={focused === i ? 'filled' : 'unstyled'}
					size='xs'
					type='text'
					icon={<FontAwesomeIcon className='w-2 h-2 text-blue-600' icon={faCircleDot} />}
					defaultValue={item}
					autoFocus={focused === i}
					onFocus={() => setFocused(i)}
				/>
			))}
		</div>
	)

	const Tags = () => (
		<div className='flex space-x-1 select-none'>
			{/* TODO fix overflow */}
			{tags.map((tag) => (
				<div key={tag} className='px-2 rounded-full bg-green-300 text-sm text-green-700 active:bg-blue-400 active:text-white'>
					{tag}
				</div>
			))}
		</div>
	)

	const SelectedWhen = () => (
		<div>
			{/* TODO show actual date */}
			<WhenSelect
				target={
					<button className='group flex items-center space-x-1 px-1 rounded border border-white text-sm text-gray-800 hover:border-gray-300 active:bg-gray-300'>
						<FontAwesomeIcon className='text-yellow-400' icon={faStar} />
						<div className='font-semibold'>Today</div>
						{/* TODO - clear X button */}
					</button>
				}
			/>
		</div>
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
					{checklist?.length > 0 && <Checklist />}
				</div>
			</div>
			<div className='flex justify-between items-end'>
				<div className='flex flex-col space-y-2'>
					{tags?.length > 0 && <Tags />}
					{when && <SelectedWhen />}
				</div>
				<div className='flex justify-end space-x-2'>
					{!when && (
						<WhenSelect
							target={
								<button className='px-1 rounded border border-white text-gray-400 hover:border-gray-300 active:bg-gray-300'>
									<FontAwesomeIcon icon={faCalendarDays} />
								</button>
							}
						/>
					)}
					{(!tags || tags?.length === 0) && (
						<TextInput
							classNames={{ input: 'border-none font-semibold' }}
							variant='filled'
							size='xs'
							type='text'
							icon={<FontAwesomeIcon icon={faTag} />}
							placeholder='Tags'
						/>
					)}
					{/* <button
				className='px-1 rounded border border-white text-gray-400 hover:border-gray-300 active:bg-gray-300'
				onClick={() => console.log('TODO')}>
				<FontAwesomeIcon icon={faTag} />
			</button> */}
					{(!checklist || checklist?.length === 0) && (
						<button
							className='px-1 rounded border border-white text-gray-400 hover:border-gray-300 active:bg-gray-300'
							onClick={() => console.log('TODO')}>
							<FontAwesomeIcon icon={faListUl} />
						</button>
					)}
					<button
						className='px-1 rounded border border-white text-gray-400 hover:border-gray-300 active:bg-gray-300'
						onClick={() => console.log('TODO')}>
						<FontAwesomeIcon icon={faFlag} />
					</button>
				</div>
			</div>
		</div>
	)
}

export default NewTask
