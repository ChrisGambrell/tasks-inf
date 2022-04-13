import { useEffect, useState } from 'react'
import { Button, Checkbox, Modal, Select, Textarea, TextInput } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import { openSpotlight } from '@mantine/spotlight'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { useProjects, useCreateTask } from '../hooks'
import { Dropdown, HotKeys, Tooltip } from '.'
import { DateSelect } from './Task'

// TODO fix new task

const View = ({ children }) => {
	const [newTaskOpen, setNewTaskOpen] = useState(false)

	const toolbarButtons = [
		{
			icon: 'plus',
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
			onClick: () => console.log('todo'),
		},
		{
			icon: 'caret-square-right',
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
			icon: 'calendar-days',
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
			icon: 'arrow-right',
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
			icon: 'magnifying-glass',
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

	return (
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
											<FA icon={button.icon} />
										</button>
									}>
									{button.tooltip}
								</Tooltip>
							) : (
								<button
									className='flex items-center m-1 py-2 px-10 rounded text-sm border border-white hover:border-gray-200 active:bg-gray-200 disabled:border-white disabled:text-gray-300 disabled:bg-white'
									disabled={button.disabled}
									onClick={button.onClick}>
									<FA icon={button.icon} />
								</button>
							)}
						</div>
					))}
			</div>
		</div>
	)
}

const Header = ({ title, description, actionButton = false, icon, color = 'text-gray-400' }) => {
	return (
		<div className='flex flex-col space-y-2 mb-8'>
			<div className='flex items-center'>
				{icon && <FA className={`w-6 h-6 mr-3 ${color}`} icon={icon} />}
				<h2 className='text-3xl font-semibold'>{title}</h2>
				{actionButton && (
					<Dropdown>
						<Dropdown.Item label='Complete Project' icon='circle-check' onClick={() => console.log('TODO')} />
						{/* TODO add date to send to DateSelect */}
						{/* TODO send it a taskId */}
						<DateSelect
							title='When'
							target={<Dropdown.Item label='When' icon='calendar-days' onClick={() => console.log('TODO')} />}
						/>
						<Dropdown.Item label='Add Tags' icon='tag' onClick={() => console.log('TODO')} />
						<DateSelect
							title='Deadline'
							hideQuickDates
							target={<Dropdown.Item label='Add Deadline' icon='flag' onClick={() => console.log('TODO')} />}
						/>

						<Dropdown.Divider />

						<Dropdown.Item label='Move' icon='arrow-right' onClick={() => console.log('TODO')} />
						<Dropdown.Item label='Repeat' icon='arrow-rotate-right' onClick={() => console.log('TODO')} />
						<Dropdown.Item label='Duplicate Project' icon='copy' onClick={() => console.log('TODO')} />
						<Dropdown.Item label='Delete Project' icon='trash' onClick={() => console.log('TODO')} />
						<Dropdown.Item label='Share' icon='share-from-square' onClick={() => console.log('TODO')} />
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
