import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useTaskQuery = (select, taskId, enabled) => {
	const queryClient = useQueryClient()

	return useQuery(['tasks', taskId], () => axios.get(BASE_URL + `/tasks/${taskId}`).then((res) => res.data), {
		enabled,
		select,
		onSuccess: (task) => {
			if (!queryClient.getQueryData('tasks')) queryClient.setQueryData('tasks', [task])
		},
	})
}

const useTask = (taskId, enabled) =>
	useTaskQuery(
		(data) => ({
			...data,
			when: data.when ? new Date(data.when) : null,
			completed_when: data.completed_when ? new Date(data.completed_when) : null,
			deadline: data.deadline ? new Date(data.deadline) : null,
			created_at: new Date(data.created_at),
			updated_at: new Date(data.updated_at),
		}),
		taskId,
		enabled
	)

export default useTask
