import { useTasks } from '../hooks'
import { View } from '../components'
import { TaskList } from '../components/Task'
import { menuItems } from '../components/SideMenu'
import { Placeholder } from '.'

const Logbook = () => {
	const menuItem = menuItems
		.filter((sections) => sections.findIndex((menuItem) => menuItem.url === '/logbook') !== -1)[0]
		.find((menuItem) => menuItem.url === '/logbook')

	const { data: tasksCollection = [] } = useTasks.complete()

	const tasks = tasksCollection.filter((task) => task.completed_when).sort((a, b) => b.completed_when - a.completed_when)

	const tasksToday = tasks.filter((task) => task.completed_when.toLocaleDateString() === new Date().toLocaleDateString())

	const tasksYesterday = tasks.filter(
		(task) =>
			task.completed_when.toLocaleDateString() ===
			new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1).toLocaleDateString()
	)

	const tasksYear = tasks.reduce((group, task) => {
		let { completed_when } = task
		completed_when = new Date(completed_when.toLocaleDateString())

		if (
			completed_when < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1) &&
			completed_when > new Date(new Date().getFullYear(), 0, 0)
		) {
			group[completed_when.getMonth()] = group[completed_when.getMonth()] ?? []
			group[completed_when.getMonth()].push(task)
		}
		return group
	}, {})

	const tasksFuture = tasks.reduce((group, task) => {
		let { completed_when } = task
		completed_when = new Date(completed_when.toLocaleDateString())

		if (completed_when < new Date(new Date().getFullYear(), 1, 1)) {
			group[completed_when.getFullYear()] = group[completed_when.getFullYear()] ?? []
			group[completed_when.getFullYear()].push(task)
		}
		return group
	}, {})

	return tasks.length > 0 ? (
		<View>
			<View.Header title={menuItem.title} icon={menuItem.icon} color={menuItem.color} />
			<View.Content>
				<div className='mt-8 space-y-8'>
					{/* Tasks completed today */}
					{tasksToday.length > 0 && (
						<div className='space-y-2'>
							<div className='flex space-x-2'>
								<div className='flex-grow mt-1.5 pb-0.5 border-b font-bold text-sm'>Today</div>
							</div>
							<TaskList tasks={tasksToday} showCompletedWhen showProject />
						</div>
					)}

					{/* Tasks completed yesterday */}
					{tasksYesterday.length > 0 && (
						<div className='space-y-2'>
							<div className='flex space-x-2'>
								<div className='flex-grow mt-1.5 pb-0.5 border-b font-bold text-sm'>Yesterday</div>
							</div>
							<TaskList tasks={tasksYesterday} showCompletedWhen showProject />
						</div>
					)}

					{/* Tasks completed this year */}
					{Object.keys(tasksYear).length > 0 &&
						Object.keys(tasksYear)
							.reverse()
							.map((group) => (
								<div key={group} className='space-y-2'>
									<div className='flex space-x-2'>
										<div className='flex-grow mt-1.5 pt-0.5 border-b font-bold text-sm'>
											{new Date(new Date().getFullYear(), group, 1).toLocaleDateString('en-us', { month: 'long' })}
										</div>
									</div>
									<TaskList tasks={tasksYear[group]} showCompletedWhen showProject />
								</div>
							))}

					{/* The remaining completed tasks */}
					{Object.keys(tasksFuture).length > 0 &&
						Object.keys(tasksFuture)
							.reverse()
							.map((group) => (
								<div key={group} className='space-y-2'>
									<div className='flex space-x-2'>
										<div className='flex-grow mt-1.5 pt-0.5 border-b font-bold text-sm'>
											{new Date(group, 1, 1).toLocaleDateString('en-us', { year: 'numeric' })}
										</div>
									</div>
									<TaskList tasks={tasksFuture[group]} showCompletedWhen showProject />
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
