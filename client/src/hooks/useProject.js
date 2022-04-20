import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useProjectQuery = (select, projectId, enabled) => {
	const queryClient = useQueryClient()

	return useQuery(['projects', projectId], () => axios.get(BASE_URL + `/projects/${projectId}`).then((res) => res.data), {
		enabled,
		select,
		onSuccess: (project) => {
			if (!queryClient.getQueryData('projects')) queryClient.setQueryData('projects', [project])
		},
	})
}

const useProject = (projectId, enabled) =>
	useProjectQuery(
		(data) => ({
			...data,
			deadline: data.deadline ? new Date(data.deadline) : null,
			when: data.when ? new Date(data.when) : null,
			created_at: new Date(data.created_at),
			updated_at: new Date(data.updated_at),
		}),
		projectId,
		enabled
	)

export default useProject
