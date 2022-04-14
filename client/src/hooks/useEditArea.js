import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useEditArea = () => {
	const queryClient = useQueryClient()

	return useMutation(({ areaId, data }) => axios.patch(BASE_URL + `/areas/${areaId}`, data).then((res) => res.data), {
		onSuccess: (area) => {
			queryClient.setQueryData(['areas', area.id], area)

			if (queryClient.getQueryData('areas')) queryClient.setQueryData('areas', (old) => old.map((t) => (t.id === area.id ? area : t)))
			else queryClient.setQueryData(['areas'], [area])
		},
	})
}

export default useEditArea
