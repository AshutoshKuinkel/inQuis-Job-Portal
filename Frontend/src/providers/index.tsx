import React from 'react'
import QCProvider from './query-client.provider'
import ContextProvider from './context.provider'

const Providers:React.FC<{children:React.ReactNode}> = ({children}) => {
  return (
    <QCProvider>
      <ContextProvider>
        {children}
      </ContextProvider>
    </QCProvider>
  )
}

export default Providers
