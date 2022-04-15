import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useCreateHeader = () => {
	const queryClient = useQueryClient()

	return useMutation((data) => axios.post(BASE_URL + '/headers/', data).then((res) => res.data), {
		onSuccess: (header) => {
			queryClient.setQueryData(['headers', header.id], header)

			if (queryClient.getQueryData('headers')) queryClient.setQueryData('headers', (old) => [...old, header])
			else queryClient.setQueryData('headers', [header])
		},
	})
}

export default useCreateHeader
