import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useEditHeader = () => {
	const queryClient = useQueryClient()

	return useMutation(({ headerId, data }) => axios.patch(BASE_URL + `/headers/${headerId}`, data).then((res) => res.data), {
		onSuccess: (header) => {
			queryClient.setQueryData(['headers', header.id], header)

			if (queryClient.getQueryData('headers'))
				queryClient.setQueryData('headers', (old) => old.map((t) => (t.id === header.id ? header : t)))
			else queryClient.setQueryData(['headers'], [header])
		},
	})
}

export default useEditHeader
