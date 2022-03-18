import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import App from './App'
import './index.css'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			onError: (error) =>
				window.alert(error.response?.data?.errors || error),
		},
		mutations: {
			onError: (error) =>
				window.alert(error.response?.data?.errors || error),
		},
	},
})

ReactDOM.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
			<ReactQueryDevtools />
		</QueryClientProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
