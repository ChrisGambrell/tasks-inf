import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useHeaders = () => {
	const queryClient = useQueryClient()

	return useQuery('headers', () => axios.get(BASE_URL + '/headers/').then((res) => res.data), {
		onSuccess: (headers = []) => {
			headers.map((header) => queryClient.setQueryData(['headers', header.id], header))
		},
	})
}

export default useHeaders
