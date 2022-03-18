import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../../app/utils'

const useTasks = () => {
    const queryClient = useQueryClient()

    return useQuery(
        'tasks',
        () => axios.get(BASE_URL + '/tasks/').then((res) => res.data),
        {
            onSuccess: (tasks = []) => {
                tasks.map((task) =>
                    queryClient.setQueryData(['tasks', task.id], task)
                )
            },
        }
    )
}

export default useTasks
