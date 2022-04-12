import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../../app/utils'

const useEditTask = () => {
	const queryClient = useQueryClient()

	return useMutation(({ taskId, data }) => axios.patch(BASE_URL + `/tasks/${taskId}`, data).then((res) => res.data), {
		onSuccess: (task) => {
			queryClient.setQueryData(['tasks', task.id], task)

			if (queryClient.getQueryData('tasks')) queryClient.setQueryData('tasks', (old) => old.map((t) => (t.id === task.id ? task : t)))
			else queryClient.setQueryData('tasks', [task])
		},
	})
}

export default useEditTask
