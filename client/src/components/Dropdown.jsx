import { useState } from 'react'
import { Popover } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

const Dropdown = ({ color = 'text-gray-400', children }) => {
	const [open, setOpen] = useState(false)

	return (
		<Popover
			classNames={{ popover: 'bg-gray-800 text-gray-50', inner: 'p-1' }}
			target={
				<button
					className={`ml-1 px-2 py-0.5 rounded ${color} active:bg-gray-200 ${open && 'bg-gray-200'}`}
					onClick={() => setOpen(!open)}>
					<FontAwesomeIcon icon={faEllipsis} />
				</button>
			}
			position='bottom'
			placement='center'
			radius='md'
			opened={open}
			onClose={() => setOpen(false)}>
			<div className='w-36 select-none text-sm'>{children}</div>
		</Popover>
	)
}

const Divider = () => <hr className='my-2 border-gray-500' />

const Item = ({ label = '', icon, color = 'text-blue-400' }) => (
	<div className='flex items-center space-x-2 p-1 rounded hover:bg-blue-500'>
		<div>{icon && <FontAwesomeIcon className={color} icon={icon} />}</div>
		<div>{label}</div>
	</div>
)

Dropdown.Divider = Divider
Dropdown.Item = Item
export default Dropdown
