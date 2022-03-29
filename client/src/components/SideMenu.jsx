import { useNavigate } from 'react-router-dom'
import { Group, Navbar, Text, ThemeIcon, Title, UnstyledButton } from '@mantine/core'
import { Archive, Calendar, Inbox, Infinity, Notebook, Stack2, Star, Trash } from 'tabler-icons-react'

const SideMenu = () => {
	return (
		<Navbar p='xs' width={{ base: 200 }}>
			<Navbar.Section>
				<Title order={1}>
					Tasks <Infinity />
				</Title>
			</Navbar.Section>
			<Navbar.Section grow mt='md'>
				<SideMenuItem icon={<Inbox />} color='blue' label='Inbox' to='/' />
				<SideMenuItem icon={<Star />} color='yellow' label='Today' to='/today' />
				<SideMenuItem icon={<Calendar />} color='red' label='Upcoming' to='TODO' />
				<SideMenuItem icon={<Stack2 />} color='teal' label='Anytime' to='TODO' />
				<SideMenuItem icon={<Archive />} color='gray' label='Someday' to='TODO' />
				<SideMenuItem icon={<Notebook />} color='green' label='Logbook' to='TODO' />
				<SideMenuItem icon={<Trash />} color='gray' label='Trash' to='TODO' />
				<SideMenuItem icon={<Infinity />} color='white' label='Meet Tasks' to='/' />
			</Navbar.Section>
		</Navbar>
	)
}

const SideMenuItem = ({ icon, color, label, to }) => {
	const navigate = useNavigate()

	return (
		<UnstyledButton
			sx={(theme) => ({
				display: 'block',
				width: '100%',
				padding: 5,
				borderRadius: theme.radius.md,
				color: theme.black,
				...(window.location.pathname === to && { backgroundColor: theme.colors.gray[0] }),
				'&:hover': { backgroundColor: theme.colors.gray[0] },
			})}
			onClick={() => navigate(to)}>
			<Group>
				<ThemeIcon color={color} variant='light'>
					{icon}
				</ThemeIcon>
				<Text>{label}</Text>
			</Group>
		</UnstyledButton>
	)
}

export default SideMenu
