import { useState } from 'react'
import { Modal, Popover } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { areas, projects, tasks } from '../app/mockData'
import { useAreas } from '../hooks'
import { HotKeys, Menu, Tooltip } from '.'
import { Logbook, Placeholder, Today, Upcoming } from '../pages'

export const menuItems = [
	[{ title: 'Inbox', icon: 'inbox', color: 'text-blue-400', notification: 0, url: '/inbox', component: Placeholder }],
	[
		{
			title: 'Today',
			icon: 'star',
			color: 'text-yellow-400',
			notification: tasks.filter((task) => task.when?.toLocaleDateString() === new Date().toLocaleDateString()).length,
			url: '/today',
			component: Today,
		},
		{ title: 'Upcoming', icon: 'calendar-days', color: 'text-red-600', notification: 0, url: '/upcoming', component: Upcoming },
		{ title: 'Anytime', icon: 'layer-group', color: 'text-teal-600', notification: 0, url: '/anytime', component: Placeholder },
		{ title: 'Someday', icon: 'archive', color: 'text-yellow-600', notification: 0, url: '/someday', component: Placeholder },
	],
	[
		{ title: 'Logbook', icon: 'book', color: 'text-green-600', notification: 0, url: '/logbook', component: Logbook },
		{ title: 'Trash', icon: 'trash', color: 'text-gray-400', notification: 0, url: '/trash', component: Placeholder },
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
						<FA className='mr-2 w-3 h-3' icon='plus' />
						New List
					</button>
				}
				position='top'
				placement='start'
				radius='md'
				shadow='xl'
				opened={newListOpen}
				onClose={() => setNewListOpen(false)}>
				<div className='w-80 select-none'>
					<div className='flex space-x-2 p-1 rounded hover:bg-blue-500' onClick={() => console.log('TODO')}>
						<div>
							<FA className='text-blue-400' icon='circle-half-stroke' />
						</div>
						<div className='flex flex-col'>
							<div>New Project</div>
							<div className='text-sm text-gray-400'>Define a goal, then work towards it one to-do at a time.</div>
						</div>
					</div>
					<hr className='my-2 border-gray-500' />
					<div className='flex space-x-2 p-1 rounded hover:bg-blue-500' onClick={() => console.log('TODO')}>
						<div>
							<FA className='text-green-500' icon='box' />
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
				className='w-40'
				target={
					<button
						className='flex-none m-1 py-1 px-2 rounded border border-gray-100 hover:border-gray-300 active:bg-gray-300'
						onClick={() => setSettingsOpen(true)}>
						<FA icon='sliders' />
					</button>
				}>
				<div className='flex justify-between p-2'>
					<div className='font-semibold'>Settings</div>
					<div>
						<HotKeys keys={['alt', ',']} />
					</div>
				</div>
			</Tooltip>
		</div>
	)
}

const SideMenu = () => {
	const { data: areasFromAPI = [] } = useAreas()

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
					{areasFromAPI.map((area) => (
						<Menu.Dropdown key={area.title} label={area.title}>
							{/* TODO real projects */}
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
