import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faCircle, faEllipsis, faFile, faStar } from '@fortawesome/free-solid-svg-icons'
import { headers, projects, tasks, toolbarButtons } from '../components'

const ContentHeader = ({ title, description, icon, color = 'text-gray-400' }) => (
	<div className='flex flex-col space-y-2 mb-8'>
		<div className='flex items-center'>
			{icon && <FontAwesomeIcon className={`w-6 h-6 mr-3 ${color}`} icon={icon} />}
			<h2 className='text-3xl font-semibold'>{title}</h2>
			<FontAwesomeIcon className='ml-1 px-2 py-0.5 rounded text-gray-400 active:bg-gray-200' icon={faEllipsis} />
		</div>
		{description && <div className='text-sm text-gray-700'>{description}</div>}
	</div>
)

const ContentBody = ({ project }) => (
	<div>
		{headers
			.filter((header) => header.projectId === project.id)
			.map((header) => (
				<div key={header.title} className='mb-8'>
					{/* Header */}
					<div
						key={header.title}
						className='flex justify-between items-center pb-0.5 border-b border-gray-200 text-blue-600 font-semibold select-none'>
						<div>{header.title}</div>
						<FontAwesomeIcon className='ml-1 w-5 h-5 px-1 py-0.5 rounded text-blue-600 active:bg-gray-200' icon={faEllipsis} />
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
	</div>
)

const ContentView = () => {
	const project = projects.find((project) => project.id === 2)

	return (
		<div className='flex flex-col justify-between w-3/4 shadow-lg'>
			<div className='flex justify-center overflow-y-scroll'>
				<div className='mt-6 w-3/4 px-4'>
					{/* Header */}
					<ContentHeader title={project.title} description={project.description} icon={faCircle} color='text-blue-600' />

					{/* Content */}
					<ContentBody project={project} />
				</div>
			</div>
			<div className='flex justify-center items-center h-10 px-2 border-t text-gray-500'>
				{toolbarButtons.map((button, i) => (
					<button
						key={i}
						className='flex items-center m-1 py-2 px-10 rounded text-sm border border-white hover:border-gray-200 active:bg-gray-200 disabled:border-white disabled:text-gray-300 disabled:bg-white'
						disabled={button.disabled}>
						<FontAwesomeIcon icon={button.icon} />
					</button>
				))}
			</div>
		</div>
	)
}

export default ContentView
