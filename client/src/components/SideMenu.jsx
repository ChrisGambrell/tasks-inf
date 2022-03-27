import { useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import {
	CalendarOutlined,
	DeleteOutlined,
	FolderOpenOutlined,
	HourglassOutlined,
	InboxOutlined,
	ReadOutlined,
	StarOutlined,
} from '@ant-design/icons'

const SideMenu = () => {
	const navigate = useNavigate()

	return (
		<>
			<h1 style={{ marginLeft: 25 }}>Tasks &infin;</h1>
			<Menu selectedKeys={window.location.pathname} mode='inline'>
				<Menu.Item key='1' onClick={() => console.log('TODO')}>
					<InboxOutlined /> Index
				</Menu.Item>
				<Menu.Item key='/today' onClick={() => navigate('/today')}>
					<StarOutlined /> Today
				</Menu.Item>
				<Menu.Item key='3' onClick={() => console.log('TODO')}>
					<CalendarOutlined /> Upcoming
				</Menu.Item>
				<Menu.Item key='4' onClick={() => console.log('TODO')}>
					<HourglassOutlined /> Anytime
				</Menu.Item>
				<Menu.Item key='5' onClick={() => console.log('TODO')}>
					<FolderOpenOutlined /> Someday
				</Menu.Item>
				<Menu.Item key='6' onClick={() => console.log('TODO')}>
					<ReadOutlined /> Logbook
				</Menu.Item>
				<Menu.Item key='7' onClick={() => console.log('TODO')}>
					<DeleteOutlined /> Trash
				</Menu.Item>
				<Menu.Item key='/' onClick={() => navigate('/')}>
					Meet Tasks &infin;
				</Menu.Item>
			</Menu>
		</>
	)
}

export default SideMenu
