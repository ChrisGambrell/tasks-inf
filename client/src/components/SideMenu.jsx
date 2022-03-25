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
	return (
		<>
			<h1 style={{ marginLeft: 25 }}>Tasks &infin;</h1>
			<Menu defaultSelectedKeys={['8']} mode='inline'>
				<Menu.Item key='1' onClick={() => console.log('TODO')}>
					<InboxOutlined /> Index
				</Menu.Item>
				<Menu.Item key='2' onClick={() => console.log('TODO')}>
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
				<Menu.Item key='8' onClick={() => console.log('TODO')}>
					Meet Tasks &infin;
				</Menu.Item>
			</Menu>
		</>
	)
}

export default SideMenu
