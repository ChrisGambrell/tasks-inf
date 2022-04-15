import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useEditProject = () => {
	const queryClient = useQueryClient()

	return useMutation(({ projectId, data }) => axios.patch(BASE_URL + `/projects/${projectId}`, data).then((res) => res.data), {
		onSuccess: (project) => {
			queryClient.setQueryData(['projects', project.id], project)

			if (queryClient.getQueryData('projects'))
				queryClient.setQueryData('projects', (old) => old.map((t) => (t.id === project.id ? project : t)))
			else queryClient.setQueryData(['projects'], [project])
		},
	})
}

export default useEditProject
