import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSliders } from '@fortawesome/free-solid-svg-icons'
import { menuItems, projects, areas, Menu } from '.'

const SideMenu = () => {
	return (
		<div className='flex flex-col justify-between w-1/4 pt-8 bg-gray-100 border-r'>
			<div className='px-4 space-y-4 select-none overflow-y-scroll'>
				{/* Main menu items */}
				{menuItems.map((section, i) => (
					<Menu.Section key={i}>
						{section.map((menuItem) => (
							<Menu.Item key={menuItem.title} menuItem={menuItem} />
						))}
					</Menu.Section>
				))}

				{/* Projects */}
				<Menu.Section>
					{projects
						.filter((project) => project.areaId === null)
						.map((project) => (
							<Menu.Item key={project.title} menuItem={project} type='project' />
						))}
				</Menu.Section>

				{/* Areas */}
				<Menu.Section>
					{areas.map((area) => (
						<Menu.Dropdown key={area.title} label={area.title}>
							{projects
								.filter((project) => project.areaId === area.id)
								.map((project) => (
									<Menu.Item key={project.title} menuItem={project} type='project' />
								))}
						</Menu.Dropdown>
					))}
				</Menu.Section>
			</div>
			{/* TODO */}
			<div className='flex justify-between h-10 px-2 border-t text-gray-500'>
				<button className='flex items-center m-1 py-1 px-2 rounded text-sm border border-gray-100 hover:border-gray-300 active:bg-gray-300'>
					<FontAwesomeIcon className='mr-2 w-3 h-3' icon={faPlus} />
					New List
				</button>
				<button className='flex-none m-1 py-1 px-2 rounded border border-gray-100 hover:border-gray-300 active:bg-gray-300'>
					<FontAwesomeIcon icon={faSliders} />
				</button>
			</div>
		</div>
	)
}

export default SideMenu
