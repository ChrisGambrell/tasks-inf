import { Kbd } from '@mantine/core'

const HotKeys = ({ className, keys = [], simple }) => (
	<div className={className}>
		{keys.map((key, i) => {
			switch (key.toLowerCase()) {
				case 'meta':
					key = '⌘'
					break
				case 'alt':
					key = '⌥'
					break

				case 'shift':
					key = simple ? '⇧' : 'Shift'
					break
				default:
					key = key
			}

			return (
				<span key={i}>
					{simple ? key : <Kbd>{key}</Kbd>}
					{i !== keys.length - 1 ? (simple ? ' ' : ' + ') : ''}
				</span>
			)
		})}
	</div>
)

export default HotKeys
