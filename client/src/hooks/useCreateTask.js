import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useCreateTask = () => {
	const queryClient = useQueryClient()

	return useMutation((data) => axios.post(BASE_URL + '/tasks/', data).then((res) => res.data), {
		onSuccess: (task) => {
			queryClient.setQueryData(['tasks', task.id], task)

			if (queryClient.getQueryData('tasks')) queryClient.setQueryData('tasks', (old) => [...old, task])
			else queryClient.setQueryData('tasks', [task])
		},
	})
}

export default useCreateTask
