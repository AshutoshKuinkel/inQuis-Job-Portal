import {QueryClient, QueryClientProvider} from  '@tanstack/react-query'
import React from 'react'

interface IProps{
  children: React.ReactNode
}

const queryClient = new QueryClient()

const QCProvider:React.FC<IProps> = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default QCProvider
