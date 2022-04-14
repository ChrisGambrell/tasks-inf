import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useArea, useProjects, useTasks } from '../hooks'
import { ProjectList, View } from '../components'
import { TaskList } from '../components/Task'
import Placeholder from './Placeholder'

const Area = () => {
	const { areaId } = useParams()
	const { data: area = {} } = useArea(Number(areaId))
	const { data: projectsCollection = [] } = useProjects()

	const projects = projectsCollection.filter((project) => project.area_id === area.id)

	return projects.length > 0 ? (
		<View>
			{/* TODO check actionButtons */}
			<View.Header title={area.title} icon='box' color='text-green-500' actionButton />
			<View.Content>
				<ProjectList projects={projects} />
			</View.Content>
			{/* TODO toolbar buttons should be project instead of header */}
		</View>
	) : (
		<Placeholder title={area.title} icon={area.icon} color='text-blue-600' />
	)
}

export default Area
