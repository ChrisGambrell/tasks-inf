import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useDeleteProject = () => {
	const queryClient = useQueryClient()

	return useMutation((projectId) => axios.delete(BASE_URL + `/projects/${projectId}`), {
		onSuccess: (_, projectId) => {
			queryClient.setQueryData('projects', (old) => old.filter((t) => t.id !== projectId))
			if (queryClient.getQueryData('headers'))
				queryClient.setQueryData('headers', (old) => old.filter((t) => t.project_id !== projectId))
			if (queryClient.getQueryData('tasks')) queryClient.setQueryData('tasks', (old) => old.filter((t) => t.project_id !== projectId))
		},
	})
}

export default useDeleteProject
