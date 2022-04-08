import { Tooltip as MantineTooltip } from '@mantine/core'

const Tooltip = ({ target, children, className }) => (
	<MantineTooltip
		classNames={{ body: `drop-shadow-lg bg-gray-50 text-gray-800 ${className}` }}
		label={children}
		radius='md'
		openDelay={750}
		wrapLines>
		{target}
	</MantineTooltip>
)

export default Tooltip
