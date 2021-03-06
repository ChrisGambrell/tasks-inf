import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../app/utils'

const useTasksQuery = (select) => {
	const queryClient = useQueryClient()

	return useQuery('tasks', () => axios.get(BASE_URL + '/tasks/').then((res) => res.data), {
		select,
		onSuccess: (tasks = []) => {
			tasks.map((task) => queryClient.setQueryData(['tasks', task.id], task))
		},
	})
}

const useAll = () =>
	useTasksQuery((data) =>
		data
			.map((task) => ({
				...task,
				when: task.when ? new Date(task.when) : null,
				completed_when: task.completed_when ? new Date(task.completed_when) : null,
				deadline: task.deadline ? new Date(task.deadline) : null,
				created_at: new Date(task.created_at),
				updated_at: new Date(task.updated_at),
			}))
			.sort((a, b) => a.when - b.when)
	)
const useComplete = () =>
	useTasksQuery((data) =>
		data
			.filter((task) => task.completed)
			.map((task) => ({
				...task,
				when: task.when ? new Date(task.when) : null,
				completed_when: task.completed_when ? new Date(task.completed_when) : null,
				deadline: task.deadline ? new Date(task.deadline) : null,
				created_at: new Date(task.created_at),
				updated_at: new Date(task.updated_at),
			}))
			.sort((a, b) => a.when - b.when)
	)
const useIncomplete = () =>
	useTasksQuery((data) =>
		data
			.filter((task) => !task.completed)
			.map((task) => ({
				...task,
				when: task.when ? new Date(task.when) : null,
				completed_when: task.completed_when ? new Date(task.completed_when) : null,
				deadline: task.deadline ? new Date(task.deadline) : null,
				created_at: new Date(task.created_at),
				updated_at: new Date(task.updated_at),
			}))
			.sort((a, b) => a.when - b.when)
	)

useTasksQuery.all = useAll
useTasksQuery.complete = useComplete
useTasksQuery.incomplete = useIncomplete
export default useTasksQuery
