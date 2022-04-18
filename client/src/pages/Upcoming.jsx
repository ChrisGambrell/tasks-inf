import { useProjects, useTasks } from '../hooks'
import { View } from '../components'
import { ProjectList } from '../components'
import { TaskList } from '../components/Task'
import { menuItems } from '../components/SideMenu'
import { Placeholder } from '.'

const Upcoming = () => {
	const menuItem = menuItems
		.filter((sections) => sections.findIndex((menuItem) => menuItem.url === '/upcoming') !== -1)[0]
		.find((menuItem) => menuItem.url === '/upcoming')

	const { data: projectsCollection = [] } = useProjects()
	const { data: tasksCollection = [] } = useTasks.incomplete()

	const projects = projectsCollection.filter(
		(project) => project.when && project.when >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)
	)
	const tasks = tasksCollection.filter(
		(task) => task.when && task.when >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)
	)

	const projectsWeek = projects.reduce((group, project) => {
		let { when } = project
		when = when.toLocaleDateString()

		if (new Date(when) > new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 8)) return group

		group[when] = group[when] ?? { projects: [], tasks: [] }
		group[when].projects.push(project)
		return group
	}, {})
	const itemsWeek = tasks.reduce((group, task) => {
		let { when } = task
		when = when.toLocaleDateString()

		if (new Date(when) > new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 8)) return group

		group[when] = group[when] ?? { projects: [], tasks: [] }
		group[when].tasks.push(task)
		return group
	}, projectsWeek)

	const projectsMonth = projects.filter((project) => {
		const when = new Date(project.when.toLocaleDateString())

		return (
			when > new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7) &&
			when < new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
		)
	})
	const tasksMonth = tasks.filter((task) => {
		const when = new Date(task.when.toLocaleDateString())

		return (
			when > new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7) &&
			when < new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
		)
	})

	const projectsYear = projects.reduce((group, project) => {
		let { when } = project
		when = new Date(when.toLocaleDateString())

		if (
			when > new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0) &&
			when < new Date(new Date().getFullYear() + 1, 0, 0)
		) {
			group[when.getMonth()] = group[when.getMonth()] ?? { projects: [], tasks: [] }
			group[when.getMonth()].projects.push(project)
		}
		return group
	}, {})
	const itemsYear = tasks.reduce((group, task) => {
		let { when } = task
		when = new Date(when.toLocaleDateString())

		if (
			when > new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0) &&
			when < new Date(new Date().getFullYear() + 1, 0, 0)
		) {
			group[when.getMonth()] = group[when.getMonth()] ?? { projects: [], tasks: [] }
			group[when.getMonth()].tasks.push(task)
		}
		return group
	}, projectsYear)

	const projectsFuture = projects.reduce((group, project) => {
		let { when } = project
		when = new Date(when.toLocaleDateString())

		if (when > new Date(new Date().getFullYear() + 1, 0, 0)) {
			group[when.getFullYear()] = group[when.getFullYear()] ?? { projects: [], tasks: [] }
			group[when.getFullYear()].projects.push(project)
		}
		return group
	}, {})
	const itemsFuture = tasks.reduce((group, task) => {
		let { when } = task
		when = new Date(when.toLocaleDateString())

		if (when > new Date(new Date().getFullYear() + 1, 0, 0)) {
			group[when.getFullYear()] = group[when.getFullYear()] ?? { projects: [], tasks: [] }
			group[when.getFullYear()].tasks.push(task)
		}
		return group
	}, projectsFuture)

	return tasks.length > 0 ? (
		<View>
			<View.Header title={menuItem.title} icon={menuItem.icon} color={menuItem.color} />
			<View.Content>
				<div className='mt-8 space-y-8'>
					{/* This week's tasks */}
					{(Object.keys(itemsWeek).length > 0 || Object.keys(projectsWeek).length > 0) &&
						Object.keys(itemsWeek)
							.sort((a, b) => new Date(a) - new Date(b))
							.map((group) => (
								<div key={group} className='space-y-2'>
									<div className='flex space-x-2'>
										<div className='flex-none font-bold text-2xl'>{new Date(group).getDate()}</div>
										<div className='flex-grow mt-1.5 pt-0.5 border-t font-bold text-sm text-gray-500'>
											{new Date(group).toLocaleDateString() === new Date().toLocaleDateString()
												? 'Today'
												: new Date(group).toLocaleDateString() ===
												  new Date(
														new Date().getFullYear(),
														new Date().getMonth(),
														new Date().getDate() + 1
												  ).toLocaleDateString()
												? 'Tomorrow'
												: new Date(group).toLocaleDateString('en-us', { weekday: 'long' })}
										</div>
									</div>
									<ProjectList projects={itemsWeek[group].projects} showArea showComplete />
									<TaskList tasks={itemsWeek[group].tasks} showProject />
								</div>
							))}

					{/* Tasks for the rest of the month */}
					{(projectsMonth.length > 0 || tasksMonth.length > 0) && (
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
							<ProjectList projects={projectsMonth} showArea showComplete showWhen />
							<TaskList tasks={tasksMonth} showProject showWhen />
						</div>
					)}

					{/* Tasks for the rest of the year */}
					{Object.keys(itemsYear).length > 0 &&
						Object.keys(itemsYear)
							.sort((a, b) => new Date(a) - new Date(b))
							.map((group) => (
								<div key={group} className='space-y-2'>
									<div className='flex space-x-2'>
										<div className='flex-grow mt-1.5 pt-0.5 border-t font-bold text-sm'>
											{new Date(new Date().getFullYear(), group, 1).toLocaleDateString('en-us', { month: 'long' })}
										</div>
									</div>
									<ProjectList projects={itemsYear[group].projects} showArea showComplete showWhen />
									<TaskList tasks={itemsYear[group].tasks} showProject showWhen />
								</div>
							))}

					{/* Tasks anything more than a year from now */}
					{Object.keys(itemsFuture).length > 0 &&
						Object.keys(itemsFuture)
							.sort((a, b) => new Date(a) - new Date(b))
							.map((group) => (
								<div key={group} className='space-y-2'>
									<div className='flex space-x-2'>
										<div className='flex-grow mt-1.5 pt-0.5 border-t font-bold text-sm'>
											{new Date(group, 1, 1).toLocaleDateString('en-us', { year: 'numeric' })}
										</div>
									</div>
									<ProjectList projects={itemsFuture[group].projects} showArea showComplete showWhen />
									<TaskList tasks={itemsFuture[group].tasks} showProject showWhen />
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
