import { useState } from 'react'
import { Popover } from '@mantine/core'
import { Calendar } from '@mantine/dates'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive, faMoon, faPlus, faStar } from '@fortawesome/free-solid-svg-icons'

const WhenSelect = ({ target }) => {
	const [open, setOpen] = useState(false)

	return (
		<Popover
			classNames={{ popover: 'bg-gray-800 text-gray-50', inner: 'p-1' }}
			target={<div onClick={() => setOpen(!open)}>{target}</div>}
			position='bottom'
			placement='center'
			radius='md'
			opened={open}
			onClose={() => setOpen(false)}>
			<div className='select-none text-sm font-semibold'>
				<div className='flex justify-center text-gray-400'>When</div>
				<div>
					<div className='flex items-center p-1 space-x-1 rounded hover:bg-blue-500'>
						<FontAwesomeIcon className='text-yellow-400' icon={faStar} />
						<div>Today</div>
					</div>
					<div className='flex items-center p-1 space-x-1 rounded hover:bg-blue-500'>
						<FontAwesomeIcon className='text-blue-200' icon={faMoon} />
						<div>This Evening</div>
					</div>
				</div>
				<div>
					<Calendar
						classNames={{
							calendarHeaderControl: 'font-semibold text-gray-50 hover:bg-blue-500',
							calendarHeaderLevel: 'font-semibold text-gray-50 hover:bg-blue-500',
							yearPickerControl: 'font-semibold text-gray-500 hover:bg-blue-500',
							yearPickerControlActive: 'font-semibold text-gray-50 hover:bg-blue-500',
							monthPickerControl: 'font-semibold text-gray-500 hover:bg-blue-500',
							monthPickerControlActive: 'font-semibold text-gray-50 hover:bg-blue-500',
							day: 'font-semibold !text-gray-50 hover:bg-blue-500',
						}}
						dayStyle={(date) =>
							date.toLocaleDateString() === new Date().toLocaleDateString()
								? { border: '1px solid white', borderRadius: 7 }
								: null
						}
						firstDayOfWeek='sunday'
						hideOutsideDates
					/>
				</div>
				<div>
					<div className='flex items-center p-1 space-x-1 rounded hover:bg-blue-500'>
						<FontAwesomeIcon className='text-yellow-600' icon={faArchive} />
						<div>Someday</div>
					</div>
					<div className='flex items-center p-1 space-x-1 rounded text-gray-400 hover:bg-blue-500'>
						<FontAwesomeIcon icon={faPlus} />
						<div>Add Reminder</div>
					</div>
				</div>
				<div>
					<div className='flex justify-center mt-1 p-1 rounded bg-gray-600 active:bg-gray-500'>Clear</div>
				</div>
			</div>
		</Popover>
	)
}

export default WhenSelect
