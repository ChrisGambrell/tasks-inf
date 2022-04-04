import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faEllipsis, faFile } from '@fortawesome/free-solid-svg-icons'
import { projects, toolbarButtons } from '.'

const ContentView = () => {
	return (
		<div className='flex flex-col justify-between w-3/4 shadow-lg'>
			<div className='flex justify-center overflow-y-scroll'>
				<div className='mt-6 max-w-prose px-4'>
					{/* Header */}
					<div className='flex flex-col space-y-2'>
						<div className='flex items-center'>
							<FontAwesomeIcon className='w-6 h-6 mr-3 text-blue-600' icon={faCircle} />
							<h2 className='text-3xl font-semibold'>{projects[1].title}</h2>
							<FontAwesomeIcon className='ml-1 px-2 py-0.5 rounded text-gray-400 active:bg-gray-200' icon={faEllipsis} />
						</div>
						<div className='text-sm text-gray-700'>{projects[1].description}</div>
					</div>

					{/* Content */}
					{projects[1].headers.map((header) => (
						<div key={header.title}>
							{/* Header */}
							<div
								key={header.title}
								className='flex justify-between items-center mt-8 pb-0.5 border-b border-gray-200 text-blue-600 font-semibold select-none'>
								<div>{header.title}</div>
								<FontAwesomeIcon
									className='ml-1 w-5 h-5 px-1 py-0.5 rounded text-blue-600 active:bg-gray-200'
									icon={faEllipsis}
								/>
							</div>

							{/* Tasks */}
							{header.tasks.map((task) => (
								<div key={task.title} className='flex items-center mt-1.5'>
									<input type='checkbox' />
									<div className='ml-2 mr-1 text-gray-800'>{task.title}</div>
									{task.notes && <FontAwesomeIcon className='w-3 h-3 text-gray-400' icon={faFile} />}
								</div>
							))}
						</div>
					))}
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
