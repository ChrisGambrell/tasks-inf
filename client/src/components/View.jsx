import { useState } from 'react'
import { Popover } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faArrowRight,
	faArrowRotateRight,
	faCalendarDays,
	faCaretSquareRight,
	faCircleCheck,
	faCopy,
	faEllipsis,
	faFlag,
	faMagnifyingGlass,
	faPlus,
	faShareFromSquare,
	faTag,
	faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from '.'

export const toolbarButtons = [
	{ icon: faPlus, disabled: false },
	{ icon: faCaretSquareRight, disabled: false, show: '/project' },
	{ icon: faCalendarDays, disabled: true },
	{ icon: faArrowRight, disabled: true },
	{ icon: faMagnifyingGlass, disabled: false },
]

const actionMenuItems = [
	[
		{ label: 'Complete Project', icon: faCircleCheck },
		{ label: 'When', icon: faCalendarDays },
		{ label: 'Add Tags', icon: faTag },
		{ label: 'Add Deadline', icon: faFlag },
	],
	[
		{ label: 'Move', icon: faArrowRight },
		{ label: 'Repeat', icon: faArrowRotateRight },
		{ label: 'Duplicate Project', icon: faCopy },
		{ label: 'Delete Project', icon: faTrash },
		{ label: 'Share', icon: faShareFromSquare },
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
						disabled={button.disabled}>
						<FontAwesomeIcon icon={button.icon} />
					</button>
				))}
		</div>
	</div>
)

const Header = ({ title, description, actionButton = false, icon, color = 'text-gray-400' }) => {
	const [menuOpen, setMenuOpen] = useState(true)

	return (
		<div className='flex flex-col space-y-2 mb-8'>
			<div className='flex items-center'>
				{icon && <FontAwesomeIcon className={`w-6 h-6 mr-3 ${color}`} icon={icon} />}
				<h2 className='text-3xl font-semibold'>{title}</h2>
				{actionButton && (
					<Popover
						classNames={{ popover: 'bg-gray-800 text-gray-50', inner: 'p-1' }}
						target={
							<button
								className={`ml-1 px-2 py-0.5 rounded text-gray-400 active:bg-gray-200 ${menuOpen && 'bg-gray-200'}`}
								onClick={() => setMenuOpen(!menuOpen)}>
								<FontAwesomeIcon icon={faEllipsis} />
							</button>
						}
						position='bottom'
						placement='center'
						radius='md'
						opened={menuOpen}
						onClose={() => setMenuOpen(false)}>
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
					</Popover>
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
