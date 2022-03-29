import { useNavigate } from 'react-router-dom'
import { Navbar, Title, createStyles } from '@mantine/core'
import { Archive, Calendar, Inbox, Infinity, Notebook, Stack2, Star, Trash } from 'tabler-icons-react'

const useStyles = createStyles((theme, _params, getRef) => {
	const icon = getRef('icon')

	return {
		navbar: {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
		},

		title: {
			textTransform: 'uppercase',
			letterSpacing: -0.25,
		},

		link: {
			...theme.fn.focusStyles(),
			display: 'flex',
			alignItems: 'center',
			textDecoration: 'none',
			fontSize: theme.fontSizes.sm,
			color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
			padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
			borderRadius: theme.radius.sm,
			fontWeight: 500,

			'&:hover': {
				backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
				color: theme.colorScheme === 'dark' ? theme.white : theme.black,

				[`& .${icon}`]: {
					color: theme.colorScheme === 'dark' ? theme.white : theme.black,
				},
			},
		},

		linkIcon: {
			ref: icon,
			color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
			marginRight: theme.spacing.sm,
		},

		linkActive: {
			'&, &:hover': {
				backgroundColor:
					theme.colorScheme === 'dark'
						? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
						: theme.colors[theme.primaryColor][0],
				color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
				[`& .${icon}`]: {
					color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
				},
			},
		},

		footer: {
			borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
			paddingTop: theme.spacing.md,
		},
	}
})

const SideMenu = () => {
	const { classes } = useStyles()

	return (
		<Navbar width={{ sm: 300 }} p='md' className={classes.navbar}>
			<Navbar.Section>
				<Title order={1}>
					Tasks <Infinity />
				</Title>
			</Navbar.Section>

			<Navbar.Section grow mt='xl'>
				<SideMenuItem icon={Inbox} label='Inbox' to='/' />
				<SideMenuItem icon={Star} label='Today' to='/today' />
				<SideMenuItem icon={Calendar} label='Upcoming' to='TODO' />
				<SideMenuItem icon={Stack2} label='Anytime' to='TODO' />
				<SideMenuItem icon={Archive} label='Someday' to='TODO' />
				<SideMenuItem icon={Notebook} label='Logbook' to='TODO' />
				<SideMenuItem icon={Trash} label='Trash' to='TODO' />
				<SideMenuItem icon={Infinity} label='Meet Tasks' to='/' />
			</Navbar.Section>
		</Navbar>
	)
}

const SideMenuItem = ({ label, icon: Icon, to }) => {
	const navigate = useNavigate()
	const { classes, cx } = useStyles()

	return (
		<a
			className={cx(classes.link, { [classes.linkActive]: to === window.location.pathname })}
			key={label}
			onClick={(e) => {
				e.preventDefault()
				navigate(to)
			}}>
			<Icon className={classes.linkIcon} />
			<span>{label}</span>
		</a>
	)
}

export default SideMenu
