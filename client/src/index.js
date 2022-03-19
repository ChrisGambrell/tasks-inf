import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { message } from 'antd'
import App from './App'
import 'antd/dist/antd.min.css'
import './index.css'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			onError: (error) =>
				error.response?.data?.errors?.map((e) => message.error(e)),
		},
		mutations: {
			onError: (error) =>
				error.response?.data?.errors?.map((e) => message.error(e)),
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
