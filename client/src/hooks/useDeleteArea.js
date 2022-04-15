import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useDeleteArea = () => {
	const queryClient = useQueryClient()

	return useMutation((areaId) => axios.delete(BASE_URL + `/areas/${areaId}`), {
		onSuccess: (_, areaId) => {
			queryClient.setQueryData('areas', (old) => old.filter((t) => t.id !== areaId))
			if (queryClient.getQueryData('projects')) queryClient.setQueryData('projects', (old) => old.filter((t) => t.area_id !== areaId))
			if (queryClient.getQueryData('tasks')) queryClient.setQueryData('tasks', (old) => old.filter((t) => t.area_id !== areaId))
		},
	})
}

export default useDeleteArea
