import {
	faArchive,
	faArrowRight,
	faBook,
	faCalendarDays,
	faCaretSquareRight,
	faInbox,
	faLayerGroup,
	faMagnifyingGlass,
	faPlus,
	faStar,
	faTrash,
} from '@fortawesome/free-solid-svg-icons'

export const menuItems = [
	[{ title: 'Dummy Content', icon: '', color: '', notification: 100, url: '/' }],
	[{ title: 'Inbox', icon: faInbox, color: 'text-blue-400', notification: 0, url: '/inbox' }],
	[
		{ title: 'Today', icon: faStar, color: 'text-yellow-400', notification: 3, url: '/today' },
		{ title: 'Upcoming', icon: faCalendarDays, color: 'text-red-600', notification: 0, url: '/upcoming' },
		{ title: 'Anytime', icon: faLayerGroup, color: 'text-teal-600', notification: 0, url: '/anytime' },
		{ title: 'Someday', icon: faArchive, color: 'text-yellow-700', notification: 0, url: '/someday' },
	],
	[
		{ title: 'Logbook', icon: faBook, color: 'text-green-600', notification: 0, url: '/logbook' },
		{ title: 'Trash', icon: faTrash, color: 'text-gray-400', notification: 0, url: '/trash' },
	],
]

export const areas = [
	{
		id: 1,
		title: 'University of Kentucky',
	},
]

export const projects = [
	{ id: 1, areaId: null, title: 'Reminders', url: '/projects/1' },
	{
		id: 2,
		areaId: null,
		title: 'Meet Things for Mac',
		description:
			'This project shows you everything you need to know to hit the ground running. Don’t hesitate to play around in it – you can always create a new one from the Help menu.',
		url: '/projects/2',
	},
	{ id: 3, areaId: 1, title: 'COM 101', url: '/projects/3' },
	{ id: 4, areaId: 1, title: 'CS 371', url: '/projects/4' },
]

export const headers = [
	{
		id: 1,
		projectId: 2,
		title: 'Learn the basics',
	},
	{
		id: 2,
		projectId: 2,
		title: 'Tune your setup',
	},
]

export const tasks = [
	{
		headerId: 1,
		title: 'Double-click this to-do',
		notes: 'You’re looking at a to-do! Complete it by clicking the checkbox on the left. Completed to-dos are collected at the bottom of your project.',
		when: new Date(),
	},
	{
		headerId: 1,
		title: 'Create a new to-do',
		notes: 'Your turn – just hit ⌘N on your keyboard.',
		when: null,
	},
	{
		headerId: 1,
		title: 'Add this to-do to your Today list',
		notes: 'Click the calendar button below to plan when you’ll do this to-do. Choose Today.',
		when: new Date(),
	},
	{
		headerId: 1,
		title: 'Plan this to-do for later',
		notes: 'Click the calendar button again, but this time, choose a date in the future. It will automatically appear in your Today list when the date comes. Upcoming to-dos are grouped together at the bottom of each section.',
		when: null,
	},
	{
		headerId: 1,
		title: 'Create a new heading',
		notes: 'Go to File → New Heading to create a heading, then drag this to-do under it.',
		when: null,
	},
	{
		headerId: 1,
		title: 'Create a project',
		notes: 'On to bigger things! At the bottom of the sidebar, click “+ New List” to add a project of your own.',
		when: null,
	},
	{
		headerId: 1,
		title: 'Organize with areas',
		notes: 'Create an area for each sphere of your life, such as Work, Family, Finance, and so on. You can drop your projects into them to stay organized. At the bottom of the sidebar, click “+ New List” to create one. Unlike projects, areas are never completed.',
		when: null,
	},
	{
		headerId: 1,
		title: "You're done!",
		notes: 'That’s all you really need to know. Feel free to start adding your own projects and to-dos. You can come back to this project later to learn the advanced features below. When you’re done with the project, click the progress ring at the top to mark it complete. We hope you’ll enjoy using Things!',
		when: null,
	},
	{
		headerId: 2,
		title: 'Show your calendar events',
		notes: 'You can connect your calendars to Things and see all of your events and to-dos together. Go to Things → Preferences → Calendar Events to turn it on.',
		when: null,
	},
	{
		headerId: 2,
		title: 'Add some widgets',
		notes: 'Widgets let you quickly access to your lists while working in other apps. You can add as many as you like. Here’s how:',
		when: null,
	},
	{
		headerId: 2,
		title: 'Sync your devices',
		notes: 'Things Cloud keeps your to-dos in sync across your Mac, iPhone, and iPad. Go to Things → Preferences → Things Cloud to create a free account. Even if you only use one device, you should still create a Things Cloud account – this ensures your data is always safely backed up.',
		when: null,
	},
]

export const toolbarButtons = [
	{ icon: faPlus, disabled: false },
	{ icon: faCaretSquareRight, disabled: false },
	{ icon: faCalendarDays, disabled: true },
	{ icon: faArrowRight, disabled: true },
	{ icon: faMagnifyingGlass, disabled: false },
]

export { default as ContentView } from './ContentView'
export { default as Menu } from './Menu'
export { default as Placeholder } from './Placeholder'
export { default as SideMenu } from './SideMenu'
