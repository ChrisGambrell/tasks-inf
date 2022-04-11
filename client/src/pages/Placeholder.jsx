// TODO

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { View } from '../components'

const Placeholder = ({ title = '', icon = 'circle-question', color = 'text-gray-400' }) => (
	<View>
		<View.Header title={title} icon={icon} color={color} />
		<View.Content>
			<div className='flex-grow flex justify-center items-center drop-shadow-xl text-8xl text-gray-300'>
				<FA icon={icon} />
				{/* TODO maybe show 'empty' message? */}
			</div>
		</View.Content>
	</View>
)

export default Placeholder
