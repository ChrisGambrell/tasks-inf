import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { showNotification } from '@mantine/notifications'
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

ReactDOM.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
			<ReactQueryDevtools />
		</QueryClientProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
