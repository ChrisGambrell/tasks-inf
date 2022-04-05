import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faCircle, faEllipsis, faFile, faStar } from '@fortawesome/free-solid-svg-icons'
import { View, headers, projects, tasks } from '../components'

const DummyContent = () => {
	const project = projects.find((project) => project.id === 2)

	return (
		<View>
			<View.Header title={project.title} description={project.description} icon={faCircle} color='text-blue-600' />
			<View.Content>
				{headers
					.filter((header) => header.projectId === project.id)
					.map((header) => (
						<div key={header.title} className='mb-8'>
							{/* Header */}
							<div
								key={header.title}
								className='flex justify-between items-center pb-0.5 border-b border-gray-200 text-blue-600 font-semibold select-none'>
								<div>{header.title}</div>
								<FontAwesomeIcon
									className='ml-1 w-5 h-5 px-1 py-0.5 rounded text-blue-600 active:bg-gray-200'
									icon={faEllipsis}
								/>
							</div>

							{/* Tasks */}
							{tasks
								.filter((task) => task.headerId === header.id)
								.map((task) => (
									<div key={task.title} className='flex items-center -mx-6 mt-1.5'>
										<FontAwesomeIcon
											className='opacity-0 hover:opacity-100 w-3 h-3 p-1 -m-1 text-gray-400'
											icon={faCalendarDays}
										/>
										<input className='ml-3 mr-1' type='checkbox' />
										{task.when?.toLocaleDateString() === new Date().toLocaleDateString() && (
											<FontAwesomeIcon className='ml-1 w-3 h-3 text-yellow-400' icon={faStar} />
										)}
										<div className='ml-1 mr-1 text-gray-800'>{task.title}</div>
										{task.notes && <FontAwesomeIcon className='w-3 h-3 text-gray-400' icon={faFile} />}
									</div>
								))}
						</div>
					))}
			</View.Content>
		</View>
	)
}

export default DummyContent
