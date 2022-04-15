import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useCreateProject = () => {
	const queryClient = useQueryClient()

	return useMutation((data) => axios.post(BASE_URL + '/projects/', data).then((res) => res.data), {
		onSuccess: (project) => {
			queryClient.setQueryData(['projects', project.id], project)

			if (queryClient.getQueryData('projects')) queryClient.setQueryData('projects', (old) => [...old, project])
			else queryClient.setQueryData('projects', [project])
		},
	})
}

export default useCreateProject
