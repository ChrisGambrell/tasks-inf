import { faBookmark, faHandshake, faNetworkWired, faPersonChalkboard } from '@fortawesome/free-solid-svg-icons'

export const areas = [
	{
		id: 1,
		title: 'University of Kentucky',
	},
]

export const projects = [
	{ id: 1, areaId: null, title: 'Reminders', icon: faBookmark, url: '/projects/1' },
	{
		id: 2,
		areaId: null,
		title: 'Meet Things for Mac',
		description:
			'This project shows you everything you need to know to hit the ground running. Don’t hesitate to play around in it – you can always create a new one from the Help menu.',
		icon: faHandshake,
		url: '/projects/2',
	},
	{ id: 3, areaId: 1, title: 'COM 101', icon: faPersonChalkboard, url: '/projects/3' },
	{ id: 4, areaId: 1, title: 'CS 371', icon: faNetworkWired, url: '/projects/4' },
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
		projectId: 2,
		title: 'Double-click this to-do',
		notes: 'You’re looking at a to-do! Complete it by clicking the checkbox on the left. Completed to-dos are collected at the bottom of your project.',
		completed: false,
		when: new Date(),
	},
	{
		headerId: 1,
		projectId: 2,
		title: 'Create a new to-do',
		notes: 'Your turn – just hit ⌘N on your keyboard.',
		completed: false,
		when: new Date(new Date().setDate(new Date().getDate() + 1)),
	},
	{
		headerId: 1,
		projectId: 2,
		title: 'Add this to-do to your Today list',
		notes: 'Click the calendar button below to plan when you’ll do this to-do. Choose Today.',
		completed: true,
		when: new Date(),
	},
	{
		headerId: 1,
		projectId: 2,
		title: 'Plan this to-do for later',
		notes: 'Click the calendar button again, but this time, choose a date in the future. It will automatically appear in your Today list when the date comes. Upcoming to-dos are grouped together at the bottom of each section.',
		completed: false,
		when: new Date(new Date().setDate(new Date().getDate() + 6)),
	},
	{
		headerId: 1,
		projectId: 2,
		title: 'Create a new heading',
		notes: 'Go to File → New Heading to create a heading, then drag this to-do under it.',
		completed: false,
		when: new Date(new Date().setDate(new Date().getDate() + 7)),
	},
	{
		headerId: 1,
		projectId: 2,
		title: 'Create a project',
		notes: 'On to bigger things! At the bottom of the sidebar, click “+ New List” to add a project of your own.',
		completed: true,
		when: null,
	},
	{
		headerId: null,
		projectId: 2,
		title: 'Task without header & without description',
		notes: null,
		completed: false,
		when: null,
	},
	{
		headerId: 1,
		projectId: 2,
		title: 'Organize with areas',
		notes: 'Create an area for each sphere of your life, such as Work, Family, Finance, and so on. You can drop your projects into them to stay organized. At the bottom of the sidebar, click “+ New List” to create one. Unlike projects, areas are never completed.',
		completed: false,
		when: null,
	},
	{
		headerId: 1,
		projectId: 2,
		title: "You're done!",
		notes: 'That’s all you really need to know. Feel free to start adding your own projects and to-dos. You can come back to this project later to learn the advanced features below. When you’re done with the project, click the progress ring at the top to mark it complete. We hope you’ll enjoy using Things!',
		completed: false,
		when: null,
	},
	{
		headerId: 2,
		projectId: 2,
		title: 'Show your calendar events',
		notes: 'You can connect your calendars to Things and see all of your events and to-dos together. Go to Things → Preferences → Calendar Events to turn it on.',
		completed: false,
		when: null,
	},
	{
		headerId: 2,
		projectId: 2,
		title: 'Add some widgets',
		notes: 'Widgets let you quickly access to your lists while working in other apps. You can add as many as you like. Here’s how:',
		completed: false,
		when: null,
	},
	{
		headerId: 2,
		projectId: 2,
		title: 'Sync your devices',
		notes: 'Things Cloud keeps your to-dos in sync across your Mac, iPhone, and iPad. Go to Things → Preferences → Things Cloud to create a free account. Even if you only use one device, you should still create a Things Cloud account – this ensures your data is always safely backed up.',
		completed: true,
		when: null,
	},
]
