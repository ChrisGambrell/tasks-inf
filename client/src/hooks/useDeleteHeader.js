import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useDeleteHeader = () => {
	const queryClient = useQueryClient()

	return useMutation((headerId) => axios.delete(BASE_URL + `/headers/${headerId}`), {
		onSuccess: (_, headerId) => {
			queryClient.setQueryData('headers', (old) => old.filter((t) => t.id !== headerId))
			if (queryClient.getQueryData('tasks'))
				queryClient.setQueryData('tasks', (old) => old.map((t) => (t.header_id === headerId ? { ...t, header_id: null } : t)))
		},
	})
}

export default useDeleteHeader
