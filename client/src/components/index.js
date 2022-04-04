import {
	faArrowRight,
	faBook,
	faCalendar,
	faCaretSquareRight,
	faInbox,
	faMagnifyingGlass,
	faPlus,
	faStar,
} from '@fortawesome/free-solid-svg-icons'

export const menuItems = [
	[{ title: 'Inbox', icon: faInbox, color: 'blue-400', notification: 0, url: '/' }],
	[
		{ title: 'Today', icon: faStar, color: 'yellow-300', notification: 3, url: '/today' },
		{ title: 'Upcoming', icon: faCalendar, color: 'red-600', notification: 0, url: '/upcoming' },
	],
	[{ title: 'Logbook', icon: faBook, color: 'green-600', notification: 0, url: '/logbook' }],
]

export const projects = [
	{ title: 'Reminders' },
	{
		title: 'Meet Things for Mac',
		description:
			'This project shows you everything you need to know to hit the ground running. Don’t hesitate to play around in it – you can always create a new one from the Help menu.',
		headers: [
			{
				title: 'Learn the basics',
				tasks: [
					{
						title: 'Double-click this to-do',
						notes: 'You’re looking at a to-do! Complete it by clicking the checkbox on the left. Completed to-dos are collected at the bottom of your project.',
					},
					{ title: 'Create a new to-do', notes: 'Your turn – just hit ⌘N on your keyboard.' },
					{
						title: 'Add this to-do to your Today list',
						notes: 'Click the calendar button below to plan when you’ll do this to-do. Choose Today.',
					},
					{
						title: 'Plan this to-do for later',
						notes: 'Click the calendar button again, but this time, choose a date in the future. It will automatically appear in your Today list when the date comes. Upcoming to-dos are grouped together at the bottom of each section.',
					},
					{
						title: 'Create a new heading',
						notes: 'Go to File → New Heading to create a heading, then drag this to-do under it.',
					},
					{
						title: 'Create a project',
						notes: 'On to bigger things! At the bottom of the sidebar, click “+ New List” to add a project of your own.',
					},
					{
						title: 'Organize with areas',
						notes: 'Create an area for each sphere of your life, such as Work, Family, Finance, and so on. You can drop your projects into them to stay organized. At the bottom of the sidebar, click “+ New List” to create one. Unlike projects, areas are never completed.',
					},
					{
						title: "You're done!",
						notes: 'That’s all you really need to know. Feel free to start adding your own projects and to-dos. You can come back to this project later to learn the advanced features below. When you’re done with the project, click the progress ring at the top to mark it complete. We hope you’ll enjoy using Things!',
					},
				],
			},
			{
				title: 'Tune your setup',
				tasks: [
					{
						title: 'Show your calendar events',
						notes: 'You can connect your calendars to Things and see all of your events and to-dos together. Go to Things → Preferences → Calendar Events to turn it on.',
					},
					{
						title: 'Add some widgets',
						notes: 'Widgets let you quickly access to your lists while working in other apps. You can add as many as you like. Here’s how:',
					},
					{
						title: 'Sync your devices',
						notes: 'Things Cloud keeps your to-dos in sync across your Mac, iPhone, and iPad. Go to Things → Preferences → Things Cloud to create a free account. Even if you only use one device, you should still create a Things Cloud account – this ensures your data is always safely backed up.',
					},
				],
			},
		],
	},
]

export const areas = [{ title: 'University of Kentucky', children: [{ title: 'COM 101' }, { title: 'CS 371' }] }]

export const toolbarButtons = [
	{ icon: faPlus, disabled: false },
	{ icon: faCaretSquareRight, disabled: false },
	{ icon: faCalendar, disabled: true },
	{ icon: faArrowRight, disabled: true },
	{ icon: faMagnifyingGlass, disabled: false },
]

export { default as ContentView } from './ContentView'
export { default as SideMenu } from './SideMenu'
