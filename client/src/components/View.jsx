import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faArrowRight,
	faArrowRotateRight,
	faCalendarDays,
	faCaretSquareRight,
	faCircleCheck,
	faCopy,
	faFlag,
	faMagnifyingGlass,
	faPlus,
	faShareFromSquare,
	faTag,
	faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from '.'

export const toolbarButtons = [
	{ icon: faPlus, disabled: false, onClick: () => console.log('TODO') },
	{ icon: faCaretSquareRight, disabled: false, onClick: () => console.log('TODO'), show: '/project' },
	{ icon: faCalendarDays, disabled: true, onClick: () => console.log('TODO') },
	{ icon: faArrowRight, disabled: true, onClick: () => console.log('TODO') },
	{ icon: faMagnifyingGlass, disabled: false, onClick: () => console.log('TODO') },
]

const actionMenuItems = [
	[
		{ label: 'Complete Project', icon: faCircleCheck, onClick: () => console.log('TODO') },
		{ label: 'When', icon: faCalendarDays, onClick: () => console.log('TODO') },
		{ label: 'Add Tags', icon: faTag, onClick: () => console.log('TODO') },
		{ label: 'Add Deadline', icon: faFlag, onClick: () => console.log('TODO') },
	],
	[
		{ label: 'Move', icon: faArrowRight, onClick: () => console.log('TODO') },
		{ label: 'Repeat', icon: faArrowRotateRight, onClick: () => console.log('TODO') },
		{ label: 'Duplicate Project', icon: faCopy, onClick: () => console.log('TODO') },
		{ label: 'Delete Project', icon: faTrash, onClick: () => console.log('TODO') },
		{ label: 'Share', icon: faShareFromSquare, onClick: () => console.log('TODO') },
	],
]

const View = ({ children }) => (
	<div className='flex flex-col justify-between w-3/4 shadow-lg'>
		<div className='flex justify-center overflow-y-scroll h-full'>
			<div className='flex flex-col mt-6 w-3/4 px-4'>{children}</div>
		</div>
		<div className='flex justify-center items-center h-10 px-2 border-t text-gray-500'>
			{/* TODO */}
			{toolbarButtons
				.filter((button) => window.location.pathname.includes(button.show ? button.show : ''))
				.map((button, i) => (
					<button
						key={i}
						className='flex items-center m-1 py-2 px-10 rounded text-sm border border-white hover:border-gray-200 active:bg-gray-200 disabled:border-white disabled:text-gray-300 disabled:bg-white'
						disabled={button.disabled}
						onClick={button.onClick}>
						<FontAwesomeIcon icon={button.icon} />
					</button>
				))}
		</div>
	</div>
)

const Header = ({ title, description, actionButton = false, icon, color = 'text-gray-400' }) => {
	return (
		<div className='flex flex-col space-y-2 mb-8'>
			<div className='flex items-center'>
				{icon && <FontAwesomeIcon className={`w-6 h-6 mr-3 ${color}`} icon={icon} />}
				<h2 className='text-3xl font-semibold'>{title}</h2>
				{actionButton && (
					<Dropdown>
						{actionMenuItems.map((section, i) => (
							<div key={i}>
								{section.map((actionMenuItem) => (
									<Dropdown.Item key={actionMenuItem.label} {...actionMenuItem} />
								))}
								{i !== actionMenuItems.length - 1 && <Dropdown.Divider />}
							</div>
						))}
					</Dropdown>
				)}
			</div>
			{description && <div className='text-sm text-gray-700'>{description}</div>}
			{actionButton && actionButton}
		</div>
	)
}

const Content = ({ children }) => <>{children}</>

View.Header = Header
View.Content = Content
export default View
