import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useAreas = () => {
	const queryClient = useQueryClient()

	return useQuery('areas', () => axios.get(BASE_URL + '/areas/').then((res) => res.data), {
		onSuccess: (areas = []) => {
			areas.map((area) => queryClient.setQueryData(['areas', area.id], area))
		},
	})
}

export default useAreas
