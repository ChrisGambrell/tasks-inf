import { tasks as taskCollection } from '../app/mockData'
import { View } from '../components'
import { menuItems } from '../components/SideMenu'
import { Placeholder } from '.'
import { Task } from './Project'

const Upcoming = () => {
	const menuItem = menuItems
		.filter((sections) => sections.findIndex((menuItem) => menuItem.url === '/today') !== -1)[0]
		.find((menuItem) => menuItem.url === '/upcoming')

	const tasks = taskCollection.filter((task) => task.when).sort((a, b) => a.when - b.when)

	const tasksWeek = tasks.reduce((group, task) => {
		let { when } = task
		when = when.toLocaleDateString()

		if (new Date(when) > new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 8)) return group

		group[when] = group[when] ?? []
		group[when].push(task)
		return group
	}, {})

	const tasksMonth = tasks.filter((task) => {
		const when = new Date(task.when.toLocaleDateString())

		return (
			when > new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7) &&
			when < new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
		)
	})

	const tasksYear = tasks.reduce((group, task) => {
		let { when } = task
		when = new Date(when.toLocaleDateString())

		if (
			when > new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0) &&
			when < new Date(new Date().getFullYear() + 1, 0, 0)
		) {
			group[when.getMonth()] = group[when.getMonth()] ?? []
			group[when.getMonth()].push(task)
		}
		return group
	}, {})

	const tasksFuture = tasks.reduce((group, task) => {
		let { when } = task
		when = new Date(when.toLocaleDateString())

		if (when > new Date(new Date().getFullYear() + 1, 0, 0)) {
			group[when.getFullYear()] = group[when.getFullYear()] ?? []
			group[when.getFullYear()].push(task)
		}
		return group
	}, {})

	return tasks.length > 0 ? (
		<View>
			<View.Header title={menuItem.title} icon={menuItem.icon} color={menuItem.color} />
			<View.Content>
				<div className='space-y-8'>
					{/* This week's tasks */}
					{Object.keys(tasksWeek).map((group) => (
						<div key={group} className='space-y-2'>
							<div className='flex space-x-2'>
								<div className='flex-none font-bold text-2xl'>{new Date(group).getDate()}</div>
								<div className='flex-grow mt-1.5 pt-0.5 border-t font-bold text-sm text-gray-500'>
									{new Date(group).toLocaleDateString(
										'en-us',
										new Date(group) <
											new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7)
									)}
								</div>
							</div>
							<div>
								{tasksWeek[group].map((task) => (
									<Task key={task.title} task={task} showProject />
								))}
							</div>
						</div>
					))}

					{/* Tasks for the rest of the month */}
					<div className='space-y-2'>
						<div className='flex space-x-2'>
							<div className='flex-grow flex space-x-1 mt-1.5 pt-0.5 border-t font-bold text-sm'>
								<div>{new Date().toLocaleDateString('en-us', { month: 'long' })}</div>
								<div className='text-gray-500'>
									{new Date(new Date().setDate(new Date().getDate() + 8)).toLocaleDateString('en-us', {
										day: 'numeric',
									})}
									-
									{new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toLocaleDateString('en-us', {
										day: 'numeric',
									})}
								</div>
							</div>
						</div>
						<div>
							{tasksMonth.map((task) => (
								<Task key={task.title} task={task} showProject showWhen />
							))}
						</div>
					</div>

					{/* Tasks for the rest of the year */}
					{Object.keys(tasksYear).map((group) => (
						<div key={group} className='space-y-2'>
							<div className='flex space-x-2'>
								<div className='flex-grow mt-1.5 pt-0.5 border-t font-bold text-sm'>
									{new Date(new Date().getFullYear(), group, 1).toLocaleDateString('en-us', { month: 'long' })}
								</div>
							</div>
							<div>
								{tasksYear[group].map((task) => (
									<Task key={task.title} task={task} showProject showWhen />
								))}
							</div>
						</div>
					))}

					{/* Tasks anything more than a year from now */}
					{Object.keys(tasksFuture).map((group) => (
						<div key={group} className='space-y-2'>
							<div className='flex space-x-2'>
								<div className='flex-grow mt-1.5 pt-0.5 border-t font-bold text-sm'>
									{new Date(group, 1, 1).toLocaleDateString('en-us', { year: 'numeric' })}
								</div>
							</div>
							<div>
								{tasksFuture[group].map((task) => (
									<Task key={task.title} task={task} showProject showWhen />
								))}
							</div>
						</div>
					))}
				</div>
			</View.Content>
		</View>
	) : (
		<Placeholder {...menuItem} />
	)
}

export default Upcoming
