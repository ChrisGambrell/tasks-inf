import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion, faInbox } from '@fortawesome/free-solid-svg-icons'

const Placeholder = ({ title = '', icon = faCircleQuestion, color = 'text-gray-400' }) => (
	<div className='flex flex-col justify-between w-3/4 shadow-lg'>
		<div className='flex justify-center overflow-y-scroll h-full'>
			<div className='flex flex-col mt-6 w-3/4 px-4'>
				{/* Header */}
				<div className='flex flex-col space-y-2'>
					<div className='flex items-center'>
						<FontAwesomeIcon className={`w-6 h-6 mr-3 ${color}`} icon={icon} />
						<h2 className='text-3xl font-semibold'>{title}</h2>
					</div>
				</div>
				<div className='flex-grow flex flex-col justify-center drop-shadow-xl text-8xl text-gray-300'>
					<FontAwesomeIcon icon={icon} />
				</div>
			</div>
		</div>
	</div>
)

export default Placeholder
