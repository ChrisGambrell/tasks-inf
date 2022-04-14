import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useArea = (areaId, enabled) => {
	const queryClient = useQueryClient()

	return useQuery(['areas', areaId], () => axios.get(BASE_URL + `/areas/${areaId}`).then((res) => res.data), {
		enabled,
		onSuccess: (area) => {
			if (!queryClient.getQueryData('areas')) queryClient.setQueryData('areas', [area])
		},
	})
}

export default useArea
