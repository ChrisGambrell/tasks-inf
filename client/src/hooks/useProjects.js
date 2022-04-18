import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useProjectsQuery = (select) => {
	const queryClient = useQueryClient()

	return useQuery('projects', () => axios.get(BASE_URL + '/projects/').then((res) => res.data), {
		select,
		onSuccess: (projects = []) => {
			projects.map((project) => queryClient.setQueryData(['projects', project.id], project))
		},
	})
}

const useProjects = () =>
	useProjectsQuery((data) =>
		data
			.map((project) => ({
				...project,
				when: project.when ? new Date(project.when) : null,
				created_at: new Date(data.created_at),
				updated_at: new Date(data.updated_at),
			}))
			.sort((a, b) => a.when - b.when)
	)

export default useProjects
