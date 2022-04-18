import { useState } from 'react'
import { Popover } from '@mantine/core'
import { Calendar } from '@mantine/dates'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'

const DateSelect = ({ title, value, onChange = () => {}, hideQuickDates = false, target }) => {
	const [open, setOpen] = useState(false)

	const handleOnChange = (date) => {
		setOpen(false)
		onChange(date)
	}

	return (
		<div>
			<Popover
				classNames={{ popover: 'bg-gray-800 text-gray-50', inner: 'p-1', root: 'w-full' }}
				target={<div onClick={() => setOpen(!open)}>{target}</div>}
				radius='md'
				shadow='xl'
				opened={open}
				onClose={() => setOpen(false)}>
				<div className='select-none text-sm font-semibold'>
					<div className='flex justify-center text-gray-400'>{title}</div>
					{!hideQuickDates && (
						<div>
							<div
								className='flex items-center p-1 space-x-1 rounded hover:bg-blue-500'
								onClick={() => handleOnChange(new Date())}>
								<FA className='text-yellow-400' icon='star' />
								<div>Today</div>
							</div>
							<div className='flex items-center p-1 space-x-1 rounded hover:bg-blue-500' onClick={() => console.log('TODO')}>
								<FA className='text-blue-200' icon='moon' />
								<div>This Evening</div>
							</div>
						</div>
					)}
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
							dayStyle={(dateToStyle) =>
								dateToStyle.toLocaleDateString() === value?.toLocaleDateString()
									? {
											backgroundColor: 'rgb(59 130 246 / var(--tw-bg-opacity))',
											border: '1px solid white',
											borderRadius: 7,
									  }
									: dateToStyle.toLocaleDateString() === new Date().toLocaleDateString()
									? { border: '1px solid white', borderRadius: 7 }
									: null
							}
							firstDayOfWeek='sunday'
							hideOutsideDates
							onChange={handleOnChange}
						/>
					</div>
					{!hideQuickDates && (
						<div>
							<div className='flex items-center p-1 space-x-1 rounded hover:bg-blue-500' onClick={() => console.log('TODO')}>
								<FA className='text-yellow-600' icon='archive' />
								<div>Someday</div>
							</div>
							<div
								className='flex items-center p-1 space-x-1 rounded text-gray-400 hover:bg-blue-500'
								onClick={() => console.log('TODO')}>
								<FA icon='plus' />
								<div>Add Reminder</div>
							</div>
							<div
								className='flex justify-center mt-1 p-1 rounded bg-gray-600 active:bg-gray-500'
								onClick={() => handleOnChange(null)}>
								Clear
							</div>
						</div>
					)}
				</div>
			</Popover>
		</div>
	)
}

export default DateSelect
