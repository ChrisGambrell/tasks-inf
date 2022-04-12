import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useProject = (projectId, enabled) => {
	const queryClient = useQueryClient()

	return useQuery(['projects', projectId], () => axios.get(BASE_URL + `/projects/${projectId}`).then((res) => res.data), {
		enabled,
		onSuccess: (project) => {
			if (!queryClient.getQueryData('projects')) queryClient.setQueryData('projects', [project])
		},
	})
}

export default useProject
