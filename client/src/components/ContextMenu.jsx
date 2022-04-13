import { useContext, useState } from 'react'
import { Popover } from '@mantine/core'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { TasksContext } from '../App'
import { HotKeys } from '.'

const ContextMenu = ({ children, taskId, target }) => {
	const [state, dispatch] = useContext(TasksContext)

	const [open, setOpen] = useState(false)

	return (
		<Popover
			classNames={{ body: 'w-60 border-gray-300', popover: 'bg-gray-100', inner: 'p-1', root: 'w-full' }}
			target={
				<div
					onContextMenu={(e) => {
						e.preventDefault()
						dispatch({ type: 'set', payload: { contexted: taskId } })
						setOpen(!open)
					}}>
					{target}
				</div>
			}
			radius='md'
			shadow='xl'
			opened={open}
			onClose={() => {
				dispatch({ type: 'set', payload: { contexted: -1 } })
				setOpen(false)
			}}>
			<div className='flex flex-col select-none text-sm'>{children}</div>
		</Popover>
	)
}

const Divider = () => <hr className='my-1 border-gray-300' />

const Item = ({ label = '', hotKeys = [], disabled, onClick = () => {} }) => (
	<div
		className={`group flex items-center space-x-2 p-1 px-2 rounded ${disabled && 'text-gray-400'} ${
			!disabled && 'hover:bg-blue-500 hover:text-gray-50'
		}`}
		onClick={onClick}>
		<div className='flex-grow'>{label}</div>
		{hotKeys.length > 0 && (
			<div className='flex-none'>
				<HotKeys className='text-gray-400 group-hover:text-gray-50' keys={hotKeys} simple />
			</div>
		)}
	</div>
)

const SubmenuItem = ({ label = '', onClick = () => {} }) => (
	<div className='flex items-center space-x-2 p-1 px-2 rounded hover:bg-blue-500 hover:text-gray-50' onClick={onClick}>
		<div className='flex-grow'>{label}</div>
		<div className='flex-none'>
			<FA icon='chevron-right' />
		</div>
	</div>
)

const Submenu = ({ children, title, label }) => {
	const [open, setOpen] = useState(false)

	return (
		<Popover
			classNames={{ body: 'w-60 border-gray-300', popover: 'bg-gray-100', inner: 'p-1' }}
			target={
				<div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
					<SubmenuItem label={label} />
				</div>
			}
			radius='md'
			shadow='xl'
			opened={open}
			onClose={() => setOpen(false)}>
			<div className='flex flex-col select-none text-sm' onMouseEnter={() => setOpen(true)}>
				{title && <Item label={title} disabled />}
				{children}
			</div>
		</Popover>
	)
}

ContextMenu.Divider = Divider
ContextMenu.Item = Item
ContextMenu.Submenu = Submenu
export default ContextMenu
