import React, { useContext, useState } from 'react'

export const AppContext = React.createContext()

export function AppProvider({ children }) {
  const [appData, setAppData] = useState({
    resourceHeaderDetails: {
      title: "",
      description: ""
    }
  })
  const updateAppData = (key, value) => {
    setAppData({...appData, [key]: value})
  }
  const contextData = {
    appData: appData,
    updateAppData: updateAppData
  }
  return (
    <AppContext.Provider value={contextData}>
      {children}
    </AppContext.Provider>
  )
}
