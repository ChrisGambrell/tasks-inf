import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Checkbox, Textarea, TextInput } from '@mantine/core'
import { useClickOutside, useHotkeys } from '@mantine/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faArrowRight,
	faCalendarDays,
	faCheckToSlot,
	faCircleDot,
	faFile,
	faFlag,
	faListUl,
	faStar,
	faTag,
	faTrash,
	faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'
import { headers, projects, tasks as taskCollection } from '../app/mockData'
import { Dropdown, View, WhenSelect } from '../components'
import Placeholder from './Placeholder'

const CompletedWhenDisplay = ({ when }) => {
	return (
		<div className='px-1 text-xs font-semibold text-blue-600'>
			{when?.toLocaleDateString() === new Date().toLocaleDateString()
				? 'today'
				: when.toLocaleDateString('en-us', { month: 'short', day: 'numeric' })}
		</div>
	)
}

const WhenDisplay = ({ when }) => {
	return when?.toLocaleDateString() === new Date().toLocaleDateString() ? (
		<FontAwesomeIcon className='ml-1 w-3 h-3 text-yellow-400' icon={faStar} />
	) : when ? (
		<div className='ml-1 px-2 rounded text-xs font-semibold text-gray-600 bg-gray-200 select-none'>
			{when.toLocaleDateString(
				'en-us',
				when < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7)
					? { weekday: 'short' }
					: { month: 'short', day: 'numeric' }
			)}
		</div>
	) : null
}

export const Task = ({
	task,
	secondary = false,
	selected = false,
	showCompletedWhen = false,
	showNotesIndicator = false,
	showProject = false,
	showWhen = false,
	onClick = () => {},
}) => {
	const project = projects.find((project) => project.id === task.projectId)

	return (
		<div className='flex items-center -mx-6 mt-1.5' onClick={onClick}>
			<WhenSelect
				target={
					<FontAwesomeIcon className='opacity-0 hover:opacity-100 w-3 h-3 p-1 -m-1 -ml-2 text-gray-400' icon={faCalendarDays} />
				}
			/>
			<div className={`flex-grow flex items-center ml-1 ${selected && 'rounded-md bg-blue-200'}`}>
				<Checkbox className='ml-3 mr-1' size='xs' defaultChecked={task.completed} />
				{showCompletedWhen && <CompletedWhenDisplay when={task.completedWhen} />}
				{showWhen && <WhenDisplay when={task.when} />}
				<div className='ml-1 mr-1'>
					<div className={`${secondary ? 'text-gray-400' : 'text-gray-800'} truncate`}>{task.title}</div>
					{showProject && project && <div className='text-xs text-gray-400 truncate'>{project.title}</div>}
				</div>
				{showNotesIndicator && task.notes && <FontAwesomeIcon className='w-3 h-3 text-gray-400' icon={faFile} />}
			</div>
		</div>
	)
}

export const NewTask = ({ defaultChecklist, defaultTags, defaultWhen }) => {
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

const Project = () => {
	// TODO show new task even when there's a placeholder
	// TODO click on toolbar to add extra items to task
	const { projectId } = useParams()
	const project = projects.find((project) => project.id === Number(projectId))

	const tasks = taskCollection.filter((task) => task.projectId === project.id && !task.completed)
	const loggedTasks = taskCollection
		.filter((task) => task.projectId === project.id && task.completed)
		.sort((a, b) => b.completedWhen - a.completedWhen)

	const [selectedTask, setSelectedTask] = useState(0)

	const [showNewTask, setShowNewTask] = useState(false)
	const [showLoggedItems, setShowLoggedItems] = useState(false)

	useHotkeys([
		['alt + n', () => setShowNewTask(true)],
		[
			'escape',
			() => {
				setSelectedTask(0)
				setShowNewTask(false)
			},
		],
	])

	return tasks.length > 0 ? (
		<View>
			<View.Header title={project.title} description={project.description} icon={project.icon} color='text-blue-600' actionButton />
			<View.Content>
				{showNewTask && <NewTask />}

				{/* Tasks w/o headers */}
				<div className='mb-8'>
					{tasks
						.filter((task) => !task.headerId)
						.map((task) => (
							<Task
								key={task.title}
								task={task}
								showNotesIndicator
								showWhen
								selected={selectedTask === task.id}
								onClick={() => setSelectedTask(task.id)}
							/>
						))}
				</div>

				{headers
					.filter((header) => header.projectId === project.id)
					.map((header) => (
						<div key={header.title} className='mb-8'>
							{/* Header */}
							<div
								key={header.title}
								className='flex justify-between items-center pb-0.5 border-b border-gray-200 text-blue-600 font-semibold select-none'>
								<div>{header.title}</div>
								<Dropdown color='text-blue-600'>
									<Dropdown.Item label='Archive' icon={faCheckToSlot} onClick={() => console.log('TODO')} />

									<Dropdown.Divider />

									<Dropdown.Item label='Move' icon={faArrowRight} onClick={() => console.log('TODO')} />
									<Dropdown.Item
										label='Convert to Project...'
										icon={faUpRightFromSquare}
										onClick={() => console.log('TODO')}
									/>
									<Dropdown.Item label='Delete' icon={faTrash} onClick={() => console.log('TODO')} />
								</Dropdown>
							</div>

							{/* Tasks */}
							{tasks
								.filter((task) => task.headerId === header.id)
								.map((task) => (
									<Task
										key={task.title}
										task={task}
										showNotesIndicator
										showWhen
										selected={selectedTask === task.id}
										onClick={() => setSelectedTask(task.id)}
									/>
								))}
						</div>
					))}

				{/* Logged tasks */}
				{loggedTasks.length > 0 && (
					// TODO show headers with task
					<div>
						<button
							className='px-1 rounded border border-white font-semibold text-xs text-gray-400 hover:border-gray-300 active:bg-gray-300'
							onClick={() => setShowLoggedItems(!showLoggedItems)}>
							{showLoggedItems ? 'Hide logged items' : `Show ${loggedTasks.length} logged items`}
						</button>
						{showLoggedItems && loggedTasks.map((task) => <Task key={task.title} task={task} secondary showCompletedWhen />)}
					</div>
				)}
			</View.Content>
		</View>
	) : (
		<Placeholder title={project.title} icon={project.icon} color='text-blue-600' />
	)
}

export default Project
