// TODO

import { useNavigate } from 'react-router-dom'
import { SpotlightProvider } from '@mantine/spotlight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { menuItems } from './SideMenu'

const SpotlightItem = ({ action, styles, classNames, hovered, onTrigger, ...others }) => (
	<div className='flex align-center px-1 space-x-1.5 rounded hover:bg-blue-200' onClick={onTrigger}>
		<div className='flex-none'>
			<FontAwesomeIcon className={action.color} icon={action.icon} />
		</div>
		<div className='flex-grow'>{action.title}</div>
		{window.location.pathname === action.url && (
			<div className='flex-none'>
				<FontAwesomeIcon className='text-blue-400' icon={faCheck} />
			</div>
		)}
	</div>
)

const SpotlightWrapper = ({ children }) => {
	const navigate = useNavigate()

	return (
		<SpotlightProvider
			classNames={{ spotlight: 'w-80' }}
			actions={menuItems.reduce(
				(arr, menuItem) => arr.concat(menuItem.map((menuItem) => ({ ...menuItem, onTrigger: () => navigate(menuItem.url) }))),
				[]
			)}
			actionComponent={SpotlightItem}
			searchPlaceholder='Quick Find'
			searchIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
			shortcut='mod + /'
			nothingFoundMessage='Nothing here...'>
			{children}
		</SpotlightProvider>
	)
}

export default SpotlightWrapper
