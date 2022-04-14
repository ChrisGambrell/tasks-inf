import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'

const Menu = () => <></>

const Dropdown = ({ label = '', children }) => {
	const [open, setOpen] = useState(false)

	return (
		<div className='flex flex-col'>
			<div className='group flex items-center p-1 rounded-md'>
				<div className='flex-grow flex items-center space-x-2' onClick={() => console.log('link')}>
					<FA className='flex-none w-5 h-5 text-gray-400' icon={open ? 'box-open' : 'box'} />
					<div className='flex-grow truncate font-semibold'>{label}</div>
				</div>
				<FA
					className={`flex-none w-3 h-3 opacity-0 group-hover:opacity-100 text-gray-400 ${open && 'rotate-90'}`}
					icon='chevron-right'
					onClick={() => setOpen(!open)}
				/>
			</div>
			{open && <div className='mt-2 ml-3 pl-3 border-l-2 border-gray-400'>{children}</div>}
		</div>
	)
}

const Item = ({ menuItem, type = null }) => {
	const navigate = useNavigate()
	const url = menuItem.url ? menuItem.url : `/${type && type}s/${menuItem.id}`

	return (
		<div
			className={`flex items-center p-1 rounded-md ${
				window.location.pathname === url && 'bg-gray-200'
			} hover:bg-gray-200 active:bg-gray-300`}
			onClick={() => navigate(url)}>
			<FA
				className={`flex-none h-5 w-5 mr-2 ${menuItem.color ? menuItem.color : 'text-gray-400'}`}
				icon={menuItem.icon ? menuItem.icon : type === 'project' ? 'circle-notch' : 'circle-question'}
			/>
			<div className='flex-grow truncate'>{menuItem.title}</div>
			{menuItem.notification > 0 && (
				<div className='flex-none pr-1 text-sm text-gray-400'>{menuItem.notification > 99 ? '99+' : menuItem.notification}</div>
			)}
		</div>
	)
}

const Section = ({ children }) => <div>{children}</div>

Menu.Dropdown = Dropdown
Menu.Item = Item
Menu.Section = Section
export default Menu
