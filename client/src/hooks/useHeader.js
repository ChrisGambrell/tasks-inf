import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useHeader = (headerId, enabled) => {
	const queryClient = useQueryClient()

	return useQuery(['headers', headerId], () => axios.get(BASE_URL + `/headers/${headerId}`).then((res) => res.data), {
		enabled,
		onSuccess: (header) => {
			if (!queryClient.getQueryData('headers')) queryClient.setQueryData('headers', [header])
		},
	})
}

export default useHeader
