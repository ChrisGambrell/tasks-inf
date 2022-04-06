import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Dropdown = ({ children }) => <div className='w-36 select-none text-sm'>{children}</div>

const Divider = () => <hr className='my-2 border-gray-500' />

const Item = ({ label = '', icon, color }) => (
	<div className='flex items-center space-x-2 p-1 rounded hover:bg-blue-500'>
		<div>{icon && <FontAwesomeIcon className={color ? color : 'text-blue-400'} icon={icon} />}</div>
		<div>{label}</div>
	</div>
)

Dropdown.Divider = Divider
Dropdown.Item = Item
export default Dropdown
