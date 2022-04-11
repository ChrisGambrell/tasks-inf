import { openSpotlight } from '@mantine/spotlight'
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
import { Dropdown, HotKeys, Tooltip } from '.'
import { DateSelect } from './Task'

export const toolbarButtons = [
	{
		icon: faPlus,
		disabled: false,
		tooltip: (
			<div className='flex flex-col p-2'>
				<div className='flex justify-between'>
					<div className='font-semibold'>New To-Do</div>
					<div>
						<HotKeys keys={['alt', 'N']} />
					</div>
				</div>
				<div className='flex-wrap'>You can also just press your spacebar.</div>
			</div>
		),
		onClick: () => console.log('TODO'),
	},
	{
		icon: faCaretSquareRight,
		disabled: false,
		tooltip: (
			<div className='flex flex-col p-2'>
				<div className='flex justify-between'>
					<div className='font-semibold'>New Heading</div>
					<div>
						<HotKeys keys={['alt', 'shift', 'N']} />
					</div>
				</div>
				<div className='flex-wrap'>Divide your project into categories or milestones.</div>
			</div>
		),
		onClick: () => console.log('TODO'),
		show: '/project',
	},
	{
		icon: faCalendarDays,
		disabled: true,
		tooltip: (
			<div className='flex flex-col p-2'>
				<div className='flex justify-between'>
					<div className='font-semibold'>When</div>
					<div>
						<HotKeys keys={['alt', 's']} />
					</div>
				</div>
				<div className='flex-wrap'>Decide when to start. Today or later?</div>
			</div>
		),
		onClick: () => console.log('TODO'),
	},
	{
		icon: faArrowRight,
		disabled: true,
		tooltip: (
			<div className='flex flex-col p-2'>
				<div className='flex justify-between'>
					<div className='font-semibold'>Move</div>
					<div>
						<HotKeys keys={['alt', 'shift', 'M']} />
					</div>
				</div>
				<div className='flex-wrap'>Move selected items to another list.</div>
			</div>
		),
		onClick: () => console.log('TODO'),
	},
	{
		icon: faMagnifyingGlass,
		disabled: false,
		tooltip: (
			<div className='flex flex-col p-2'>
				<div className='flex justify-between'>
					<div className='font-semibold'>Quick Find</div>
					<div>
						<HotKeys keys={['alt', 'F']} />
					</div>
				</div>
				<div className='flex-wrap'>Quickly switch lists, find to-dos, or search for tags.</div>
			</div>
		),
		onClick: openSpotlight,
	},
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
					<div key={i}>
						{button.tooltip ? (
							<Tooltip
								className='w-64'
								target={
									<button
										className='flex items-center m-1 py-2 px-10 rounded text-sm border border-white hover:border-gray-200 active:bg-gray-200 disabled:border-white disabled:text-gray-300 disabled:bg-white'
										disabled={button.disabled}
										onClick={button.onClick}>
										<FontAwesomeIcon icon={button.icon} />
									</button>
								}>
								{button.tooltip}
							</Tooltip>
						) : (
							<button
								className='flex items-center m-1 py-2 px-10 rounded text-sm border border-white hover:border-gray-200 active:bg-gray-200 disabled:border-white disabled:text-gray-300 disabled:bg-white'
								disabled={button.disabled}
								onClick={button.onClick}>
								<FontAwesomeIcon icon={button.icon} />
							</button>
						)}
					</div>
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
						<Dropdown.Item label='Complete Project' icon={faCircleCheck} onClick={() => console.log('TODO')} />
						{/* TODO add date to send to DateSelect */}
						<DateSelect
							title='When'
							target={<Dropdown.Item label='When' icon={faCalendarDays} onClick={() => console.log('TODO')} />}
						/>
						<Dropdown.Item label='Add Tags' icon={faTag} onClick={() => console.log('TODO')} />
						<DateSelect
							title='Deadline'
							hideQuickDates
							target={<Dropdown.Item label='Add Deadline' icon={faFlag} onClick={() => console.log('TODO')} />}
						/>

						<Dropdown.Divider />

						<Dropdown.Item label='Move' icon={faArrowRight} onClick={() => console.log('TODO')} />
						<Dropdown.Item label='Repeat' icon={faArrowRotateRight} onClick={() => console.log('TODO')} />
						<Dropdown.Item label='Duplicate Project' icon={faCopy} onClick={() => console.log('TODO')} />
						<Dropdown.Item label='Delete Project' icon={faTrash} onClick={() => console.log('TODO')} />
						<Dropdown.Item label='Share' icon={faShareFromSquare} onClick={() => console.log('TODO')} />
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
