import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {NotiContextProvider} from './components/NotificationContext'
import { UserContextProvider } from './components/UserContext'
import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <NotiContextProvider>
        <App />
      </NotiContextProvider>
    </UserContextProvider>
    </QueryClientProvider>
  
)