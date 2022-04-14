import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { View } from '../components'

const Placeholder = ({ title = '', icon = 'circle-question', color = 'text-gray-400' }) => (
	<View>
		<View.Header title={title} icon={icon} color={color} />
		<View.Content>
			<div className='flex-grow flex flex-col justify-center items-center drop-shadow-xl  text-gray-300'>
				<FA className='text-8xl' icon={icon} />
				<div className='mt-4 text-xl'>No incomplete or completed To-Dos here</div>
			</div>
		</View.Content>
	</View>
)

export default Placeholder
