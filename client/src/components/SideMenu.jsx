import { Menu } from 'antd'

const SideMenu = () => {
	return (
		<>
			<h1 style={{ marginLeft: 25 }}>Tasks &infin;</h1>
			<Menu defaultSelectedKeys={['1']} mode='inline'>
				<Menu.Item key='1'>Tasks</Menu.Item>
			</Menu>
		</>
	)
}

export default SideMenu
