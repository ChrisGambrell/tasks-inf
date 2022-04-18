import { useState } from 'react'
import { Popover } from '@mantine/core'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'

const Dropdown = ({ color = 'text-gray-400', children, target }) => {
	const [open, setOpen] = useState(false)

	return (
		<Popover
			classNames={{ popover: 'bg-gray-800 text-gray-50', inner: 'p-1' }}
			target={
				target ? (
					<div onClick={() => setOpen(!open)}>{target}</div>
				) : (
					<button
						className={`ml-1 px-2 py-0.5 rounded ${color} active:bg-gray-200 ${open && 'bg-gray-200'}`}
						onClick={() => setOpen(!open)}>
						<FA className='w-5 h-5' icon='ellipsis' />
					</button>
				)
			}
			position='bottom'
			placement='center'
			radius='md'
			shadow='xl'
			opened={open}
			onClose={() => setOpen(false)}>
			<div className='w-44 select-none text-sm' onClick={() => setOpen(false)}>
				{children}
			</div>
		</Popover>
	)
}

const Divider = () => <hr className='my-0.5 border-gray-500' />

const Item = ({ label = '', icon, color = 'text-blue-400', onClick = () => {} }) => (
	<div className='flex items-center space-x-2 p-1 rounded hover:bg-blue-500' onClick={onClick}>
		<div>{icon && <FA className={color} icon={icon} />}</div>
		<div>{label}</div>
	</div>
)

Dropdown.Divider = Divider
Dropdown.Item = Item
export default Dropdown
