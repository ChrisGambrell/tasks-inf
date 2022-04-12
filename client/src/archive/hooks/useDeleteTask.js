import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../../app/utils'

const useDeleteTask = (taskGroupId) => {
	const queryClient = useQueryClient()

	return useMutation((taskId) => axios.delete(BASE_URL + `/tasks/${taskId}`), {
		onSuccess: (_, taskId) => {
			queryClient.setQueryData('tasks', (old) => old.filter((t) => t.id !== taskId))
		},
	})
}

export default useDeleteTask
