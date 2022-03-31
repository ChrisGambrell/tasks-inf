import { Group } from '@mantine/core'

const TaskDetail = ({ icon, title, onClick = () => {} }) => {
	return (
		<>
			<span style={{ marginRight: 5 }}>{icon}</span> {title}
		</>
	)
}

export default TaskDetail
