import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faBoxOpen, faChevronRight, faCircleNotch, faCircleQuestion, faPlus, faSliders } from '@fortawesome/free-solid-svg-icons'
import { menuItems, projects, areas } from '.'

const MenuSection = ({ children }) => <div>{children}</div>

const MenuDropdown = ({ label = '', children }) => {
	const [open, setOpen] = useState(false)

	return (
		<details className='group flex p-1'>
			<summary className='flex items-center list-none' onClick={() => setOpen(!open)}>
				<FontAwesomeIcon className='flex-none h-5 w-5 mr-2 text-gray-400' icon={open ? faBoxOpen : faBox} />
				<div className='flex-grow truncate font-semibold'>{label}</div>
				<FontAwesomeIcon
					className='flex-none invisible group-hover:visible h-3 w-3 text-gray-400 rotate-0 group-open:rotate-90'
					icon={faChevronRight}
				/>
			</summary>
			<div className='mt-2'>
				<div className='ml-2 pl-3 border-l-2 border-gray-400'>{children}</div>
			</div>
		</details>
	)
}

const MenuItem = ({ menuItem, type = null }) => {
	const navigate = useNavigate()

	return (
		<div
			className={`flex items-center p-1 rounded-md ${
				window.location.pathname === menuItem.url && 'bg-gray-200'
			} hover:bg-gray-200 active:bg-gray-300`}
			onClick={() => (menuItem.url ? navigate(menuItem.url) : {})}>
			<FontAwesomeIcon
				className={`flex-none h-5 w-5 mr-2 ${menuItem.color ? menuItem.color : 'text-gray-400'}`}
				icon={menuItem.icon ? menuItem.icon : type === 'project' ? faCircleNotch : faCircleQuestion}
			/>
			<div className='flex-grow truncate'>{menuItem.title}</div>
			{menuItem.notification > 0 && <div className='flex-none pr-1 text-sm text-gray-400'>{menuItem.notification}</div>}
		</div>
	)
}

const Toolbar = () => (
	<div className='flex justify-between h-10 px-2 border-t text-gray-500'>
		<button className='flex items-center m-1 py-1 px-2 rounded text-sm border border-gray-100 hover:border-gray-300 active:bg-gray-300'>
			<FontAwesomeIcon className='mr-2 w-3 h-3' icon={faPlus} />
			New List
		</button>
		<button className='flex-none m-1 py-1 px-2 rounded border border-gray-100 hover:border-gray-300 active:bg-gray-300'>
			<FontAwesomeIcon icon={faSliders} />
		</button>
	</div>
)

const SideMenu = () => {
	return (
		<div className='flex flex-col justify-between w-1/4 pt-8 bg-gray-100 border-r'>
			<div className='px-4 space-y-4 select-none overflow-y-scroll'>
				{/* Main menu items */}
				{menuItems.map((section, i) => (
					<MenuSection key={i}>
						{section.map((menuItem) => (
							<MenuItem key={menuItem.title} menuItem={menuItem} />
						))}
					</MenuSection>
				))}

				{/* Projects */}
				<MenuSection>
					{projects
						.filter((project) => project.areaId === null)
						.map((project) => (
							<MenuItem key={project.title} menuItem={project} type='project' />
						))}
				</MenuSection>

				{/* Areas */}
				<MenuSection>
					{areas.map((area) => (
						<MenuDropdown key={area.title} label={area.title}>
							{projects
								.filter((project) => project.areaId === area.id)
								.map((project) => (
									<MenuItem key={project.title} menuItem={project} type='project' />
								))}
						</MenuDropdown>
					))}
				</MenuSection>
			</div>
			<Toolbar />
		</div>
	)
}

export default SideMenu
