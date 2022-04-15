// TODO

import { useNavigate } from 'react-router-dom'
import { SpotlightProvider } from '@mantine/spotlight'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { menuItems } from './SideMenu'

const QuickFindItem = ({ action, styles, classNames, hovered, onTrigger, ...others }) => (
	<div className='flex align-center px-1 space-x-1.5 rounded hover:bg-blue-200' onClick={onTrigger}>
		<div className='flex-none'>
			<FA className={action.color} icon={action.icon} />
		</div>
		<div className='flex-grow'>{action.title}</div>
		{window.location.pathname === action.url && (
			<div className='flex-none'>
				<FA className='text-blue-400' icon='check' />
			</div>
		)}
	</div>
)

const QuickFindWrapper = ({ children }) => {
	const navigate = useNavigate()

	return (
		<SpotlightProvider
			classNames={{ spotlight: 'w-80', overlayy: 'backdrop-filter-none opacity-0' }}
			actions={menuItems.reduce(
				(arr, menuItem) => arr.concat(menuItem.map((menuItem) => ({ ...menuItem, onTrigger: () => navigate(menuItem.url) }))),
				[]
			)}
			actionComponent={QuickFindItem}
			searchPlaceholder='Quick Find'
			searchIcon={<FA icon='magnifying-glass' />}
			shortcut='alt + f'
			nothingFoundMessage='Nothing here...'>
			{children}
		</SpotlightProvider>
	)
}

export default QuickFindWrapper
