import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { View } from '../components'

const Placeholder = (options) => (
	<View>
		<View.Header {...options} />
		<View.Content>
			<div className='flex-grow flex flex-col justify-center items-center drop-shadow-xl  text-gray-300'>
				<FA className='text-8xl' icon={options.icon || 'circle-question'} />
				<div className='mt-4 text-xl'>No incomplete or completed To-Dos here</div>
			</div>
		</View.Content>
	</View>
)

export default Placeholder
