import { useContext } from "react"

import { AppContext } from "../contexts/AppContext"

const useResourceHeader = () => {
  const { appData: { resourceHeaderDetails }, updateAppData } = useContext(AppContext)
  const setResourceHeaderDetails = (details) => {
    updateAppData("resourceHeaderDetails", details)
  }
  return {
    resourceHeaderDetails,
    setResourceHeaderDetails
  }
}

export default useResourceHeader