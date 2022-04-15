import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useDeleteProject = () => {
	const queryClient = useQueryClient()

	return useMutation((projectId) => axios.delete(BASE_URL + `/projects/${projectId}`), {
		onSuccess: (_, projectId) => {
			queryClient.setQueryData('projects', (old) => old.filter((t) => t.id !== projectId))
		},
	})
}

export default useDeleteProject
