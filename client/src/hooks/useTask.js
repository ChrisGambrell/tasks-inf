import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useTask = (taskId, enabled) => {
	const queryClient = useQueryClient()

	return useQuery(['tasks', taskId], () => axios.get(BASE_URL + `/tasks/${taskId}`).then((res) => res.data), {
		enabled,
		onSuccess: (task) => {
			if (!queryClient.getQueryData('tasks')) queryClient.setQueryData('tasks', [task])
		},
	})
}

export default useTask
