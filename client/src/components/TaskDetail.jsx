const TaskDetail = ({ icon, title, onClick = () => {} }) => {
	return (
		<div className='TaskDetail' onClick={onClick}>
			<span style={{ marginRight: 5 }}>{icon}</span> {title}
		</div>
	)
}

export default TaskDetail
