import { tasks as taskCollection } from '../app/mockData'
import { View } from '../components'
import { menuItems } from '../components/SideMenu'
import { Placeholder } from '.'
import { Task } from './Project'

const Upcoming = () => {
	const menuItem = menuItems
		.filter((sections) => sections.findIndex((menuItem) => menuItem.url === '/today') !== -1)[0]
		.find((menuItem) => menuItem.url === '/upcoming')

	const tasks = taskCollection.filter((task) => task.when && task.when.toLocaleDateString() !== new Date().toLocaleDateString())

	return (
		<View>
			<View.Header title={menuItem.title} icon={menuItem.icon} color={menuItem.color} />
			<View.Content>
				<div className='space-y-2'>
					<div className='flex space-x-2'>
						<div className='flex-none font-bold text-2xl'>8</div>
						<div className='flex-grow mt-1.5 pt-0.5 border-t font-semibold text-sm text-gray-500'>Tomorrow</div>
					</div>
					<div>
						{tasks.map((task) => (
							<Task key={task.title} task={task} specialDisplay />
						))}
					</div>
				</div>
			</View.Content>
		</View>
	)
}

export default Upcoming
