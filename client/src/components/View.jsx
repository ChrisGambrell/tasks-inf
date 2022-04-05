import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { toolbarButtons } from '../components'

const View = ({ children }) => (
	<div className='flex flex-col justify-between w-3/4 shadow-lg'>
		<div className='flex justify-center overflow-y-scroll'>
			<div className='mt-6 w-3/4 px-4'>{children}</div>
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

const Header = ({ title, description, icon, color = 'text-gray-400' }) => (
	<div className='flex flex-col space-y-2 mb-8'>
		<div className='flex items-center'>
			{icon && <FontAwesomeIcon className={`w-6 h-6 mr-3 ${color}`} icon={icon} />}
			<h2 className='text-3xl font-semibold'>{title}</h2>
			<FontAwesomeIcon className='ml-1 px-2 py-0.5 rounded text-gray-400 active:bg-gray-200' icon={faEllipsis} />
		</div>
		{description && <div className='text-sm text-gray-700'>{description}</div>}
	</div>
)

const Content = ({ children }) => <div>{children}</div>

View.Header = Header
View.Content = Content

export default View
