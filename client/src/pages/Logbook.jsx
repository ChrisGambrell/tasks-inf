import { openSpotlight } from '@mantine/spotlight'
import { completeTasks as taskCollection } from '../app/mockData'
import { View } from '../components'
import { menuItems } from '../components/SideMenu'
import { Placeholder } from '.'
import { Task } from './Project'

const Logbook = () => {
	const menuItem = menuItems
		.filter((sections) => sections.findIndex((menuItem) => menuItem.url === '/logbook') !== -1)[0]
		.find((menuItem) => menuItem.url === '/logbook')

	const tasks = taskCollection.filter((task) => task.completedWhen).sort((a, b) => b.completedWhen - a.completedWhen)

	const tasksToday = taskCollection.filter((task) => task.completedWhen.toLocaleDateString() === new Date().toLocaleDateString())

	const tasksYesterday = taskCollection.filter(
		(task) =>
			task.completedWhen.toLocaleDateString() ===
			new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1).toLocaleDateString()
	)

	const tasksYear = tasks.reduce((group, task) => {
		let { completedWhen } = task
		completedWhen = new Date(completedWhen.toLocaleDateString())

		if (
			completedWhen < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1) &&
			completedWhen > new Date(new Date().getFullYear(), 0, 0)
		) {
			group[completedWhen.getMonth()] = group[completedWhen.getMonth()] ?? []
			group[completedWhen.getMonth()].push(task)
		}
		return group
	}, {})

	const tasksFuture = tasks.reduce((group, task) => {
		let { completedWhen } = task
		completedWhen = new Date(completedWhen.toLocaleDateString())

		if (completedWhen < new Date(new Date().getFullYear(), 1, 1)) {
			group[completedWhen.getFullYear()] = group[completedWhen.getFullYear()] ?? []
			group[completedWhen.getFullYear()].push(task)
		}
		return group
	}, {})

	return tasks.length > 0 ? (
		<View>
			<View.Header title={menuItem.title} icon={menuItem.icon} color={menuItem.color} />
			<View.Content>
				<button className='p-1 rounded active:bg-gray-100' onClick={openSpotlight}>
					testing123
				</button>
				<div className='space-y-8'>
					{/* Tasks completed today */}
					<div className='space-y-2'>
						<div className='flex space-x-2'>
							<div className='flex-grow mt-1.5 pb-0.5 border-b font-bold text-sm'>Today</div>
						</div>
						<div>
							{tasksToday.map((task) => (
								<Task key={task.title} task={task} showCompletedWhen showProject />
							))}
						</div>
					</div>

					{/* Tasks completed yesterday */}
					<div className='space-y-2'>
						<div className='flex space-x-2'>
							<div className='flex-grow mt-1.5 pb-0.5 border-b font-bold text-sm'>Yesterday</div>
						</div>
						<div>
							{tasksYesterday.map((task) => (
								<Task key={task.title} task={task} showCompletedWhen showProject />
							))}
						</div>
					</div>

					{/* Tasks completed this year */}
					{Object.keys(tasksYear)
						.reverse()
						.map((group) => (
							<div key={group} className='space-y-2'>
								<div className='flex space-x-2'>
									<div className='flex-grow mt-1.5 pt-0.5 border-t font-bold text-sm'>
										{new Date(new Date().getFullYear(), group, 1).toLocaleDateString('en-us', { month: 'long' })}
									</div>
								</div>
								<div>
									{tasksYear[group].map((task) => (
										<Task key={task.title} task={task} showCompletedWhen showProject />
									))}
								</div>
							</div>
						))}

					{/* The remaining completed tasks */}
					{Object.keys(tasksFuture)
						.reverse()
						.map((group) => (
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

export default Logbook
