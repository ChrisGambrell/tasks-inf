import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useCreateArea = () => {
	const queryClient = useQueryClient()

	return useMutation((data) => axios.post(BASE_URL + '/areas/', data).then((res) => res.data), {
		onSuccess: (area) => {
			queryClient.setQueryData(['areas', area.id], area)

			if (queryClient.getQueryData('areas')) queryClient.setQueryData('areas', (old) => [...old, area])
			else queryClient.setQueryData('areas', [area])
		},
	})
}

export default useCreateArea
