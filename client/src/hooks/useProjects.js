import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useProjects = () => {
	const queryClient = useQueryClient()

	return useQuery('projects', () => axios.get(BASE_URL + '/projects/').then((res) => res.data), {
		onSuccess: (projects = []) => {
			projects.map((project) => queryClient.setQueryData(['projects', project.id], project))
		},
	})
}

export default useProjects
