import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faArchive,
	faBook,
	faCalendarDays,
	faInbox,
	faLayerGroup,
	faPlus,
	faSliders,
	faStar,
	faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { areas, projects } from '../app/mockData'
import { Menu } from '.'
import { DummyContent, Placeholder } from '../pages'

export const menuItems = [
	[{ title: 'Dummy Content', icon: '', color: '', notification: 100, url: '/', component: DummyContent }],
	[{ title: 'Inbox', icon: faInbox, color: 'text-blue-400', notification: 0, url: '/inbox', component: Placeholder }],
	[
		{ title: 'Today', icon: faStar, color: 'text-yellow-400', notification: 3, url: '/today', component: Placeholder },
		{ title: 'Upcoming', icon: faCalendarDays, color: 'text-red-600', notification: 0, url: '/upcoming', component: Placeholder },
		{ title: 'Anytime', icon: faLayerGroup, color: 'text-teal-600', notification: 0, url: '/anytime', component: Placeholder },
		{ title: 'Someday', icon: faArchive, color: 'text-yellow-700', notification: 0, url: '/someday', component: Placeholder },
	],
	[
		{ title: 'Logbook', icon: faBook, color: 'text-green-600', notification: 0, url: '/logbook', component: Placeholder },
		{ title: 'Trash', icon: faTrash, color: 'text-gray-400', notification: 0, url: '/trash', component: Placeholder },
	],
]

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
			{/* TODO */}
			<div className='flex justify-between h-10 px-2 border-t text-gray-500'>
				<button className='flex items-center m-1 py-1 px-2 rounded text-sm border border-gray-100 hover:border-gray-300 active:bg-gray-300'>
					<FontAwesomeIcon className='mr-2 w-3 h-3' icon={faPlus} />
					New List
				</button>
				<button className='flex-none m-1 py-1 px-2 rounded border border-gray-100 hover:border-gray-300 active:bg-gray-300'>
					<FontAwesomeIcon icon={faSliders} />
				</button>
			</div>
		</div>
	)
}

export default SideMenu
