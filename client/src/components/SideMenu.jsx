import { useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import { Archive, Calendar, Inbox, Infinity, Notebook, Stack2, Star, Trash } from 'tabler-icons-react'

const SideMenu = () => {
	const navigate = useNavigate()

	return (
		<>
			<h1 style={{ marginLeft: 25 }}>
				Tasks <Infinity />
			</h1>
			<Menu selectedKeys={window.location.pathname} mode='inline'>
				<Menu.Item key='1' onClick={() => console.log('TODO')}>
					<Inbox /> Index
				</Menu.Item>
				<Menu.Item key='/today' onClick={() => navigate('/today')}>
					<Star /> Today
				</Menu.Item>
				<Menu.Item key='3' onClick={() => console.log('TODO')}>
					<Calendar /> Upcoming
				</Menu.Item>
				<Menu.Item key='4' onClick={() => console.log('TODO')}>
					<Stack2 /> Anytime
				</Menu.Item>
				<Menu.Item key='5' onClick={() => console.log('TODO')}>
					<Archive /> Someday
				</Menu.Item>
				<Menu.Item key='6' onClick={() => console.log('TODO')}>
					<Notebook /> Logbook
				</Menu.Item>
				<Menu.Item key='7' onClick={() => console.log('TODO')}>
					<Trash /> Trash
				</Menu.Item>
				<Menu.Item key='/' onClick={() => navigate('/')}>
					Meet Tasks <Infinity />
				</Menu.Item>
			</Menu>
		</>
	)
}

export default SideMenu
