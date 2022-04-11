import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { showNotification } from '@mantine/notifications'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import App from './App'
import './index.css'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			onError: (error) => error.response?.data?.errors?.map((e) => showNotification({ message: e, color: 'red' })),
		},
		mutations: {
			onError: (error) => error.response?.data?.errors?.map((e) => showNotification({ message: e, color: 'red' })),
		},
	},
})

library.add(fas)

ReactDOM.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
			{/* <ReactQueryDevtools /> */}
		</QueryClientProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
