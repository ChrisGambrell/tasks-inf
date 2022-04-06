// TODO

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { View } from '../components'

const Placeholder = ({ title = '', icon = faCircleQuestion, color = 'text-gray-400' }) => (
	<View>
		<View.Header title={title} icon={icon} color={color} />
		<View.Content>
			<div className='flex-grow flex justify-center items-center drop-shadow-xl text-8xl text-gray-300'>
				<FontAwesomeIcon icon={icon} />
			</div>
		</View.Content>
	</View>
)

export default Placeholder
