import { useState } from 'react'
import { Modal, Popover } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faArchive,
	faBook,
	faBox,
	faCalendarDays,
	faCircleHalfStroke,
	faInbox,
	faLayerGroup,
	faPlus,
	faSliders,
	faStar,
	faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { areas, projects, tasks } from '../app/mockData'
import { Menu, Tooltip } from '.'
import { Logbook, Placeholder, Today, Upcoming } from '../pages'

export const menuItems = [
	[{ title: 'Inbox', icon: faInbox, color: 'text-blue-400', notification: 0, url: '/inbox', component: Placeholder }],
	[
		{
			title: 'Today',
			icon: faStar,
			color: 'text-yellow-400',
			notification: tasks.filter((task) => task.when?.toLocaleDateString() === new Date().toLocaleDateString()).length,
			url: '/today',
			component: Today,
		},
		{ title: 'Upcoming', icon: faCalendarDays, color: 'text-red-600', notification: 0, url: '/upcoming', component: Upcoming },
		{ title: 'Anytime', icon: faLayerGroup, color: 'text-teal-600', notification: 0, url: '/anytime', component: Placeholder },
		{ title: 'Someday', icon: faArchive, color: 'text-yellow-600', notification: 0, url: '/someday', component: Placeholder },
	],
	[
		{ title: 'Logbook', icon: faBook, color: 'text-green-600', notification: 0, url: '/logbook', component: Logbook },
		{ title: 'Trash', icon: faTrash, color: 'text-gray-400', notification: 0, url: '/trash', component: Placeholder },
	],
]

const Toolbar = () => {
	const [newListOpen, setNewListOpen] = useState(false)
	const [settingsOpen, setSettingsOpen] = useState(false)

	useHotkeys([['alt + comma', () => setSettingsOpen(true)]])

	return (
		<div className='flex justify-between h-10 px-2 border-t text-gray-500'>
			{/* TODO */}
			<Popover
				classNames={{ popover: 'bg-gray-800 text-gray-50' }}
				target={
					<button
						className='flex items-center m-1 py-1 px-2 rounded text-sm border border-gray-100 hover:border-gray-300 active:bg-gray-300'
						onClick={() => setNewListOpen(!newListOpen)}>
						<FontAwesomeIcon className='mr-2 w-3 h-3' icon={faPlus} />
						New List
					</button>
				}
				position='top'
				placement='start'
				radius='md'
				opened={newListOpen}
				onClose={() => setNewListOpen(false)}>
				<div className='w-80 select-none'>
					<div className='flex space-x-2 p-1 rounded hover:bg-blue-500' onClick={() => console.log('TODO')}>
						<div>
							<FontAwesomeIcon className='text-blue-400' icon={faCircleHalfStroke} />
						</div>
						<div className='flex flex-col'>
							<div>New Project</div>
							<div className='text-sm text-gray-400'>Define a goal, then work towards it one to-do at a time.</div>
						</div>
					</div>
					<hr className='my-2 border-gray-500' />
					<div className='flex space-x-2 p-1 rounded hover:bg-blue-500' onClick={() => console.log('TODO')}>
						<div>
							<FontAwesomeIcon className='text-green-500' icon={faBox} />
						</div>
						<div className='flex flex-col'>
							<div>New Area</div>
							<div className='text-sm text-gray-400'>
								Group your projects and to-dos based on different responsibilities, such as Family or Work .
							</div>
						</div>
					</div>
				</div>
			</Popover>

			<Modal opened={settingsOpen} onClose={() => setSettingsOpen(false)} withCloseButton={false}>
				Settings Menu - TODO
			</Modal>
			<Tooltip
				className='w-32'
				target={
					<button
						className='flex-none m-1 py-1 px-2 rounded border border-gray-100 hover:border-gray-300 active:bg-gray-300'
						onClick={() => setSettingsOpen(true)}>
						<FontAwesomeIcon icon={faSliders} />
					</button>
				}>
				<div className='flex justify-between p-2'>
					<div className='font-semibold'>Settings</div>
					<div>⌥,</div>
				</div>
			</Tooltip>
		</div>
	)
}

const SideMenu = () => {
	return (
		<div className='flex flex-col justify-between w-1/4 pt-8 bg-gray-100 border-r'>
			<div className='px-4 space-y-4 select-none overflow-y-scroll'>
				{/* Main menu items */}
				{menuItems.map((section, i) => (
					<Menu.Section key={i}>
						{section.map((menuItem) => (
							<Menu.Item key={menuItem.title} menuItem={menuItem} />
						))}
					</Menu.Section>
				))}
				{/* Projects */}
				<Menu.Section>
					{projects
						.filter((project) => project.areaId === null)
						.map((project) => (
							<Menu.Item key={project.title} menuItem={project} type='project' />
						))}
				</Menu.Section>
				{/* Areas */}
				<Menu.Section>
					{areas.map((area) => (
						<Menu.Dropdown key={area.title} label={area.title}>
							{projects
								.filter((project) => project.areaId === area.id)
								.map((project) => (
									<Menu.Item key={project.title} menuItem={project} type='project' />
								))}
						</Menu.Dropdown>
					))}
				</Menu.Section>
			</div>
			<Toolbar />
		</div>
	)
}

export default SideMenu
